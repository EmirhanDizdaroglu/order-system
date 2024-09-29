using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    [Key] //Primary Key
    public int Id { get; set; }

    [Required] //Not null
    [MaxLength(50)]//VARCHAR(50)
    public string Name  { get; set; } =null!;
    
    public string? Description { get; set; } 

    [MaxLength(50)] //VARCHAR(50)
    public string? Category { get; set; } 

    [Required]//NOT NULL
    [Column(TypeName ="decimal(10,2)")]//DECIMAL(10,2)
    public decimal Price { get; set; }

    [Required] //BOOLEAN NOT NULL
    [Column("is_active")]
    public bool IsActive { get; set; } = true; //varsayılan olarak true

    [Column("created_at")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]//Current timestamp
    public DateTime? CreatedAt {get;set; } =DateTime.UtcNow;

    [MaxLength(255)]
    public string? Image{get;set; }
}
