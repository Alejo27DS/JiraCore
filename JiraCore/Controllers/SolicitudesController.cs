using JiraCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Text.Json;

namespace JiraCore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitudesController : ControllerBase
    {
        private readonly IMongoCollection<Solicitud> _solicitudesCollection;

        public SolicitudesController(IMongoDatabase database)
        {
            _solicitudesCollection = database.GetCollection<Solicitud>("Solicitudes");
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearSolicitud([FromForm] string tipo, [FromForm] string datos, [FromForm] IFormFile? archivo)
        {
            try
            {
                string nombreExtraido = "Desconocido";
                string cargoExtraido = "Sin asignar";

                if (!string.IsNullOrEmpty(datos))
                {
                    try
                    {
                        using (JsonDocument doc = JsonDocument.Parse(datos))
                        {
                            if (doc.RootElement.TryGetProperty("nombre", out var nombre)) nombreExtraido = nombre.GetString() ?? "Desconocido";
                            if (doc.RootElement.TryGetProperty("cargo", out var cargo)) cargoExtraido = cargo.GetString() ?? "Sin asignar";
                        }
                    }
                    catch { }
                }

                string estado = "Pendiente";

                var nuevaSolicitud = new Solicitud
                {
                    Tipo = tipo,
                    Datos = datos,
                    NombreEmpleado = nombreExtraido,
                    Cargo = cargoExtraido,
                    Estado = estado,
                    Fecha = DateTime.Now
                };

                await _solicitudesCollection.InsertOneAsync(nuevaSolicitud);

                return Ok(new { mensaje = "Solicitud enviada a RRHH", id = nuevaSolicitud.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("pendientes")]
        public async Task<IActionResult> GetPendientes()
        {
            var filter = Builders<Solicitud>.Filter.Eq(s => s.Estado, "Pendiente");
            var sort = Builders<Solicitud>.Sort.Descending(s => s.Fecha);
            var pendientes = await _solicitudesCollection.Find(filter).Sort(sort).ToListAsync();
            return Ok(pendientes);
        }

        [HttpGet("aprobadas")]
        public async Task<IActionResult> GetAprobadas()
        {
            var filter = Builders<Solicitud>.Filter.Eq(s => s.Estado, "Aprobado");
            var aprobadas = await _solicitudesCollection.Find(filter).ToListAsync();
            return Ok(aprobadas);
        }

        [HttpGet("talento-humano")]
        public async Task<IActionResult> GetBandejaHumano()
        {
            var filter = Builders<Solicitud>.Filter.Ne("isDeleted", true);
            var solicitudes = await _solicitudesCollection.Find(filter).SortByDescending(s => s.Fecha).ToListAsync();

            var resultado = new
            {
                solicitudes = solicitudes.Select(s => new {
                    s.Id,
                    s.Tipo,
                    s.Fecha,
                    Usuario = s.NombreEmpleado,
                    Cargo = s.Cargo,
                    Estado = s.Estado,
                    FechaEnvio = s.Fecha,
                    s.Comentarios
                }).ToList(),

                kpis = new
                {
                    total = solicitudes.Count,
                    pendientes = solicitudes.Count(s => s.Estado == "Pendiente"),
                    enProceso = solicitudes.Count(s => s.Estado == "EnProceso"),
                    gestionadas = solicitudes.Count(s => s.Estado == "Gestionada")
                }
            };

            return Ok(resultado);
        }

        [HttpGet("tecnologia")]
        public async Task<IActionResult> GetBandejaTecnologia()
        {
            var filterTipo = Builders<Solicitud>.Filter.In(s => s.Tipo, new[] { "Ingreso", "Retiro" });
            var filterEstado = Builders<Solicitud>.Filter.Eq(s => s.Estado, "EnviadoTecnologia");
            var filterDeleted = Builders<Solicitud>.Filter.Ne("isDeleted", true);

            var filter = Builders<Solicitud>.Filter.And(filterTipo, filterEstado, filterDeleted);

            var solicitudes = await _solicitudesCollection.Find(filter).SortByDescending(s => s.Fecha).ToListAsync();

            var resultado = new
            {
                solicitudes = solicitudes.Select(s => new {
                    s.Id,
                    s.Tipo,
                    s.Fecha,
                    Usuario = s.NombreEmpleado,
                    Cargo = s.Cargo,
                    Estado = s.Estado,
                    FechaEnvio = s.Fecha,
                    s.Comentarios
                }).ToList(),

                kpis = new
                {
                    total = solicitudes.Count,
                    pendientes = solicitudes.Count(s => s.Estado == "EnviadoTecnologia"),
                    enProceso = solicitudes.Count(s => s.Estado == "EnProcesoTecnologia"),
                    gestionadas = solicitudes.Count(s => s.Estado == "GestionadaTecnologia")
                }
            };

            return Ok(resultado);
        }

        [HttpPost("actualizar-estado")]
        public async Task<IActionResult> ActualizarEstado([FromBody] EstadoRequest data)
        {
            try
            {
                if (data == null || string.IsNullOrEmpty(data.id))
                    return BadRequest("Datos inválidos para actualizar estado.");

                var filter = Builders<Solicitud>.Filter.Eq(s => s.Id, data.id);
                var update = Builders<Solicitud>.Update.Set(s => s.Estado, data.estado);

                var result = await _solicitudesCollection.UpdateOneAsync(filter, update);

                if (result.ModifiedCount > 0)
                    return Ok(new { mensaje = $"Estado actualizado a {data.estado}" });

                return NotFound("Solicitud no encontrada");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost("eliminar")]
        public async Task<IActionResult> EliminarSolicitud([FromBody] EstadoRequest data)
        {
            try
            {
                if (string.IsNullOrEmpty(data.id))
                    return BadRequest("El ID es necesario para eliminar.");

                var filter = Builders<Solicitud>.Filter.Eq(s => s.Id, data.id);
                var update = Builders<Solicitud>.Update.Set(s => s.IsDeleted, true);

                var result = await _solicitudesCollection.UpdateOneAsync(filter, update);

                if (result.ModifiedCount > 0)
                    return Ok(new { mensaje = "Solicitud eliminada correctamente" });

                return NotFound("Solicitud no encontrada");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        // --- MÉTODO AGREGAR COMENTARIO ---
        [HttpPost("agregar-comentario")]
        public async Task<IActionResult> AgregarComentario([FromBody] ComentarioRequest data)
        {
            try
            {
                if (string.IsNullOrEmpty(data.id) || string.IsNullOrEmpty(data.mensaje))
                    return BadRequest("ID y Mensaje son requeridos");

                // --- BORRA ESTO ---
                // var objectId = new ObjectId(data.id);

                // --- CAMBIA ESTO ---
                var filter = Builders<Solicitud>.Filter.Eq(s => s.Id, data.id);
                // --------------------

                var nuevoComentario = new ComentarioItem
                {
                    Autor = data.autor,
                    Mensaje = data.mensaje,
                    Fecha = DateTime.Now
                };

                var update = Builders<Solicitud>.Update.Push(s => s.Comentarios, nuevoComentario);

                var result = await _solicitudesCollection.UpdateOneAsync(filter, update);

                if (result.ModifiedCount > 0)
                    return Ok(new { mensaje = "Comentario agregado" });

                return NotFound("Solicitud no encontrada");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    } // <--- Cierra SolicitudesController

    // ================== CLASES AUXILIARES (RENOMBRADAS) ==================

    public class EstadoRequest
    {
        public string id { get; set; }
        public string estado { get; set; }
    }

    // CAMBIO: Renombrado de Comentario a ComentarioItem para evitar conflicto
    public class ComentarioItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("autor")]
        public string Autor { get; set; } = string.Empty;

        [BsonElement("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        [BsonElement("fecha")]
        public DateTime Fecha { get; set; } = DateTime.Now;
    }

    public class ComentarioRequest
    {
        public string id { get; set; }
        public string autor { get; set; }
        public string mensaje { get; set; }
    }
}