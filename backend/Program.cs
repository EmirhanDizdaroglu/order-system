using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using OrderSystem.Services; // RabbitMQ Consumer Service
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Veri tabanı bağlantısı (MySQL)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 23))));

// CORS ayarları - Tüm kaynaklara izin veriliyor (güvenlik gereksinimlerine göre değiştirilmesi gerekebilir)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Controller'ları ekliyoruz
builder.Services.AddControllers();

// RabbitMQ Consumer servisini arka planda çalışan Hosted Service olarak ekliyoruz
builder.Services.AddHostedService<RabbitMQConsumerService>();

var app = builder.Build();

// Geliştirme ortamı için hata sayfası
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    // Üretim ortamında hata yönetimi için genel bir hata sayfası yönlendirmesi
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts(); // Üretim ortamında güvenlik için HTTP Strict Transport Security (HSTS) ekliyoruz.
}

// CORS politikasını etkinleştiriyoruz
app.UseCors("AllowAllOrigins");

// HTTPS yönlendirmesi (tercihe bağlı olarak aktif edilebilir, üretim ortamında önerilir)
app.UseHttpsRedirection();

// Statik dosyaların sunulması için middleware ekleyin (örneğin wwwroot)
app.UseStaticFiles();

app.UseRouting();

// Yetkilendirme middleware'i
app.UseAuthorization();

// Controller rotalarını haritalandırıyoruz
app.MapControllers();

app.Run();
