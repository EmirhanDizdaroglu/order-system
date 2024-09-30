namespace OrderSystem.Services
{
    using Microsoft.Extensions.Hosting;
    using RabbitMQ.Client;
    using RabbitMQ.Client.Events;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;
    using Newtonsoft.Json;
    using Microsoft.Extensions.DependencyInjection;
    using OrderSystem.Models;
    using System;

    public class RabbitMQConsumerService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private IConnection _connection;
        private IModel _channel;

        public RabbitMQConsumerService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;

            // RabbitMQ bağlantısını başlatıyoruz
            var factory = new ConnectionFactory() { HostName = "localhost" };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            // Kuyruğu tanımlıyoruz
            _channel.QueueDeclare(queue: "orderQueue", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var order = JsonConvert.DeserializeObject<Orders>(message);

                if (order != null)
                {
                    Console.WriteLine($" [x] Received Order ID: {order.Id}, Status: {order.Status}");

                    // Siparişin durumunu güncelleme (örneğin "approved")
                    UpdateOrderStatusToApproved(order.Id);
                }
                else
                {
                    Console.WriteLine($" [x] Invalid message received: {message}");
                }
            };

            // Mesajları RabbitMQ kuyruğundan sürekli dinle
            _channel.BasicConsume(queue: "orderQueue", autoAck: true, consumer: consumer);

            return Task.CompletedTask;
        }

        private void UpdateOrderStatusToApproved(int orderId)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                // Veritabanından siparişi buluyoruz
                var order = dbContext.Orders.Find(orderId);

                if (order != null)
                {
                    // Siparişin durumunu "approved" olarak güncelliyoruz
                    order.Status = "approved";
                    dbContext.Orders.Update(order);
                    dbContext.SaveChanges();

                    Console.WriteLine($" [x] Order {order.Id} status updated to approved.");
                }
                else
                {
                    Console.WriteLine($" [x] Order with ID {orderId} not found.");
                }
            }
        }

        // Servis durdurulduğunda RabbitMQ bağlantısını kapat
        public override Task StopAsync(CancellationToken stoppingToken)
        {
            _channel?.Close();
            _connection?.Close();
            return base.StopAsync(stoppingToken);
        }

        public override void Dispose()
        {
            _channel?.Dispose();
            _connection?.Dispose();
            base.Dispose();
        }
    }
}
