using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


//veri tabanı bağlatısı
builder.Services.AddDbContext<ApplicationDbContext>(Options=>
Options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
new MySqlServerVersion(new Version(8, 0, 23))));

//CORS problem solved (builder buildden önce eklenmesi gerekiyormuş)
builder.Services.AddCors(options=>
{
    options.AddPolicy("AllowAllOrigins",
        builder=>
        {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

//Controller
builder.Services.AddControllers();

var app=builder.Build();



//HTTP management
if(app.Environment.IsDevelopment()){
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowAllOrigins");
//app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();


