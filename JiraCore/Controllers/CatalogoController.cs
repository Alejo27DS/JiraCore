using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes; // <--- IMPORTANTE: Importar esto
using JiraCore.Models;

namespace JiraCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogoController : ControllerBase
    {
        private readonly IMongoDatabase _database;

        public CatalogoController(IMongoDatabase database)
        {
            _database = database;
        }

        // Endpoint para Cargos
        [HttpGet("cargos")]
        public async Task<IActionResult> ObtenerCargos()
        {
            var collection = _database.GetCollection<CargoItem>("catalogo_cargos");

            // CAMBIO TEMPORAL: Quito el filtro de activo para ver si trae datos
            // Si esto funciona, significa que tus datos en BD tienen 'activo' en false o null
            var listaCargos = await collection.Find(_ => true).ToListAsync();

            return Ok(listaCargos);
        }

        // Endpoint para Áreas
        [HttpGet("areas")]
        public async Task<IActionResult> ObtenerAreas()
        {
            var collection = _database.GetCollection<AreaItem>("catalogo_areas");

            // CAMBIO TEMPORAL: Quito el filtro de activo
            var listaAreas = await collection.Find(_ => true).ToListAsync();

            return Ok(listaAreas);
        }
    }

    // --- MODELO CORREGIDO CON ATRIBUTOS EXPLÍCITOS ---

    public class CargoItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        // Esto le dice a C#: "El campo en Mongo se llama 'nombre_cargo', guárdalo en 'NombreCargo'"
        [BsonElement("nombre_cargo")]
        public string NombreCargo { get; set; }

        [BsonElement("activo")]
        public bool Activo { get; set; }
    }

    public class AreaItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("nombre_area")]
        public string NombreArea { get; set; }

        [BsonElement("activo")]
        public bool Activo { get; set; }
    }
}