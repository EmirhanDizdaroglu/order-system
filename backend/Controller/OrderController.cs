using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Models;

namespace OrderSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public OrdersController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // POST: api/orders/complete
        [HttpPost("complete")]
        public async Task<IActionResult> CompleteOrder([FromBody] Orders order)
        {
            if (order == null || order.Items == null || !order.Items.Any())
            {
                return BadRequest("Invalid order data.");
            }

            try
            {
                // Siparişin durumunu "pending" olarak ayarla
                order.Status = "pending";

                // Siparişi veritabanına ekle
                await _dbContext.Orders.AddAsync(order);
                await _dbContext.SaveChangesAsync();

                foreach (var item in order.Items)
                {
                    item.OrderId = order.Id;
                    _dbContext.OrderItems.Add(item);
                }

                await _dbContext.SaveChangesAsync();

                // RabbitMQ'ya siparişi gönder
                SendMessageToRabbitMQ(order);

                return Ok(new { message = "Order completed and sent to queue.", order });
            }
            catch (DbUpdateException dbEx)
            {
                // Veritabanı güncelleme hatası yakalama
                return StatusCode(500, new { message = "Database error occurred.", error = dbEx.Message });
            }
            catch (Exception ex)
            {
                // Diğer genel hatalar için
                return StatusCode(500, new { message = "An error occurred while processing the order.", error = ex.Message });
            }
        }

        // RabbitMQ'ya mesaj gönderen metot
        private void SendMessageToRabbitMQ(Orders order)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            try
            {
                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    // Kuyruğu oluştururken `durable: true` olarak ayarladık
                    channel.QueueDeclare(queue: "orderQueue", durable: true, exclusive: false, autoDelete: false, arguments: null);

                    var message = JsonConvert.SerializeObject(order);
                    var body = Encoding.UTF8.GetBytes(message);

                    channel.BasicPublish(exchange: "", routingKey: "orderQueue", basicProperties: null, body: body);
                    System.Console.WriteLine($" [x] Sent {message}");
                }
            }
            catch (Exception ex)
            {
                System.Console.WriteLine($" [x] Failed to send message to RabbitMQ: {ex.Message}");
                throw;  // Hata oluştuğunda yeniden fırlat, böylece üst metot tarafından yakalanabilir.
            }
        }

        // GET: api/orders
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _dbContext.Orders
                .Include(o => o.Items)
                .ToListAsync();
            return Ok(orders);
        }
    }
}
