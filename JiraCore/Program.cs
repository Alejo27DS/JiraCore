using Microsoft.AspNetCore.Mvc; // <--- IMPORTANTE: Esto es el que trae la clase OpenApiInfo
using Microsoft.AspNetCore.Routing;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace JiraCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 1. Agregar Servicios
            builder.Services.AddControllers();

            // 2. Configuración de CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("PermitirAngular",
                    policy => policy
                        .WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "JiraCore API", Version = "v1" });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // -----------------------------------------------------
            // app.UseHttpsRedirection(); 
            // -----------------------------------------------------

            app.UseRouting();
            app.UseCors("PermitirAngular");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}