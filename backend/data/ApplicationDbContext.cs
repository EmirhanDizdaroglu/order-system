using Microsoft.EntityFrameworkCore;
using OrderSystem.Models; // Modellerin namespace'i

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    // Veritabanı tabloları
    public DbSet<Product> Products { get; set; }
    public DbSet<Orders> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // İlişkiler ve silme davranışları (DeleteBehavior)
        
        // OrderItem ve Product ilişkisi
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId)
            .OnDelete(DeleteBehavior.SetNull);  // Product silindiğinde ProductId null olur

        // OrderItem ve Order ilişkisi
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);  // Order silindiğinde ilgili OrderItems silinir

        // Orders tablosundaki Status alanı için enum tipini belirtiyoruz
        modelBuilder.Entity<Orders>()
            .Property(o => o.Status)
            .HasConversion<string>();  // Enum'un string olarak saklanmasını sağlıyor
    }
}
