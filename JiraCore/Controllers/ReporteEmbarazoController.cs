using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using JiraCore.Models;

namespace JiraCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteEmbarazoController : ControllerBase
    {
        // Inyectamos toda la base de datos (como configuraste en Program.cs)
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<ReporteEmbarazo> _reportesCollection;
        private readonly IWebHostEnvironment _env;

        public ReporteEmbarazoController(IMongoDatabase database, IWebHostEnvironment env)
        {
            _database = database;
            _env = env;

            // AQUÍ está el truco: Obtenemos la colección específica de la base de datos inyectada
            // "ReportesEmbarazo" es el nombre que tendrá la colección en MongoDB
            _reportesCollection = _database.GetCollection<ReporteEmbarazo>("ReportesEmbarazo");
        }

        [HttpPost]
        public async Task<IActionResult> CrearReporte([FromForm] ReporteEmbarazoDto dto)
        {
            string rutaArchivo = null;

            // 1. Guardar el archivo físicamente (wwwroot/uploads/embarazo)
            if (dto.Documento != null && dto.Documento.Length > 0)
            {
                string uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "embarazo");
                
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                rutaArchivo = Guid.NewGuid().ToString() + Path.GetExtension(dto.Documento.FileName);
                string filePath = Path.Combine(uploadsFolder, rutaArchivo);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Documento.CopyToAsync(stream);
                }
            }

            // 2. Crear el objeto para MongoDB
            var documentoMongo = new ReporteEmbarazo
            {
                SolicitanteEnNombreDe = dto.SolicitanteEnNombreDe,
                Resumen = dto.Resumen,
                Cedula = dto.Cedula,
                Nombre = dto.Nombre,
                Cargo = dto.Cargo,
                CampaniaArea = dto.CampaniaArea,
                NumeroContacto = dto.NumeroContacto,
                CorreoCorporativo = dto.CorreoCorporativo,
                FechaReporte = dto.FechaReporte,
                FechaIngreso = dto.FechaIngreso,
                RutaArchivo = rutaArchivo,
                FechaCreacion = DateTime.UtcNow
            };

            // 3. Insertar en la colección
            await _reportesCollection.InsertOneAsync(documentoMongo);

            return Ok(new { message = "Reporte guardado en MongoDB", id = documentoMongo.Id });
        }
    }
}