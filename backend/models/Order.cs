using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Order
{
    [Key] //Primary key
    public int Id { get; set; }

    [Required]
    [Column(TypeName ="enum('pending', 'approved')")]//Enumaration ile ürünün gönderilip onaylanması kontrolü

    public string Status { get; set; } ="pending";//varsayılan

    //siparişler
    public List<OrderItem> Items { get; set; }=new List<OrderItem>();
}
