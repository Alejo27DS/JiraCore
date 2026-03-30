using MongoDB.Driver;
using JiraCore.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("https://localhost:4200") 
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// --- INICIO CONEXIÓN MONGODB ---

// 1. Leemos la cadena de conexión y el nombre de la BD del archivo appsettings.json
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB");
    var mongoDatabaseName = builder.Configuration["DatabaseName"];

    // 2. Creamos el cliente de MongoDB
    var mongoClient = new MongoClient(mongoConnectionString);

    // 3. Obtenemos la base de datos (bpm_consulting)
    var database = mongoClient.GetDatabase(mongoDatabaseName);

    // 4. Registramos la base de datos en el sistema de Inyección de Dependencias
    // Esto permite que tus Controladores pidan la base de datos con "IMongoDatabase"
    builder.Services.AddSingleton<IMongoDatabase>(database);

    // --- FIN CONEXIÓN MONGODB ---
var app = builder.Build();

app.UseCors("AllowAngularApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
        