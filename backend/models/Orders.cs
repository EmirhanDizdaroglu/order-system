using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrderSystem.Models
{
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "enum('pending', 'approved')")]
        public string Status { get; set; } = "pending";

        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
