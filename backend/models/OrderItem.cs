using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class OrderItem
{
    [Key] //Primary Key
    public int Id { get; set; }

    [Required]
    public int Quantity{get; set; }

    //foreign Key - Order
    public int OrderId { get; set; } 
    public Order Order {get; set; }=null!;//sipariş ile ilişki

    //foreign Key -product
    public int? ProductId { get; set; }//ürün silindiğinde nullable olacak
    public Product? Product {get; set; } //ilişkili ürün
}
