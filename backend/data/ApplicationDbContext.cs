using Microsoft.EntityFrameworkCore;


public class ApplicationDbContext : DbContext{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    :base(options){}
    //veri tabanı tablosu için datasetler
    public DbSet<Product> Products {get;set; }
    public DbSet<Order> Orders {get;set; }
    public DbSet<OrderItem> OrderItems {get;set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        //Product-OrderItem ilişkisinde Cascade ve SetNull işlemleri yapıyoruz.
        modelBuilder.Entity<OrderItem>()
            .HasOne(oi=>oi.Product)
            .WithMany()
            .HasForeignKey(oi=>oi.ProductId)
            .OnDelete(DeleteBehavior.SetNull); //When the product deleted the product id will be null

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o=>o.Items)
            .HasForeignKey(oi=>oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);//when de order deleted the orderitems record will be delete.
    }
}
