using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    [Key] //Primary Key
    public int Id { get; set; }

    [Required] //Not null
    [MaxLength(50)]//VARCHAR(50)
    public string Name  { get; set; } =null!;
    
    public string Description { get; set; } 

    [MaxLength(50)] //VARCHAR(50)
    public string Category { get; set; } 

    [Required]//NOT NULL
    [Column(TypeName ="decimal(10,2)")]//DECIMAL(10,2)
    public decimal Price { get; set; }

    [Required] //BOOLEAN NOT NULL
    public bool IsActive { get; set; } = true; //varsayılan olarak true

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]//Current timestamp
    public DateTime CreatedAt {get;set; } =DateTime.UtcNow;
}
