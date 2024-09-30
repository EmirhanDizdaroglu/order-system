using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderSystem.Models
{
    public class OrderItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        [ForeignKey("Order")]
        [Column("order_id")]
        public int OrderId { get; set; } // Correct field name
        public Orders Order { get; set; } = null!;

        [ForeignKey("Product")]
        [Column("product_id")]
        public int? ProductId { get; set; } // Correct field name
        public Product? Product { get; set; }
    }
}
