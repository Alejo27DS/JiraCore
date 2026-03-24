using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using JiraCore.Models;

namespace JiraCore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColaboradoresController : ControllerBase
    {
        // Inyectamos la base de datos que configuramos en Program.cs
        private readonly IMongoDatabase _database;

        public ColaboradoresController(IMongoDatabase database)
        {
            _database = database;
        }

        // Endpoint GET para traer todos los colaboradores
        [HttpGet]
        public async Task<ActionResult<List<Colaborador>>> GetColaboradores()
        {
            // Conectamos a la colección 'colaboradores' en Mongo
            var collection = _database.GetCollection<Colaborador>("colaboradores");

            // Traemos todos los documentos
            var resultados = await collection.Find(_ => true).ToListAsync();

            return Ok(resultados);
        }
    }
}