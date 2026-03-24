using JiraCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JiraCore.Controllers
{
    [ApiController] // <--- IMPORTANTE: Necesario para que Swagger lo encuentre
    [Route("api/[controller]")]
    public class SolicitudController : ControllerBase
    {
        // Usa la lista estática que definimos en el Backend
        private static List<Solicitud> solicitudes = new List<Solicitud>();
        private static int contador = 1;

        // <--- IMPORTANTE: Inyectar HttpClient es necesario para que el código compile
        public SolicitudController() { }

        // POST: api/solicitudes/crear
        [HttpPost("crear")]
        public IActionResult CrearSolicitud([FromForm] string tipo, [FromForm] string datos, [FromForm] IFormFile? archivo)
        {
            var nuevaSolicitud = new Solicitud
            {
                Id = contador++,
                Tipo = tipo,
                Datos = datos,
                NombreEmpleado = "Usuario Simulado", // O usa JWT si lo tienes
                Estado = "Pendiente",
                Fecha = DateTime.Now
            };

            solicitudes.Add(nuevaSolicitud);

            return Ok(new { mensaje = "Solicitud enviada a Admin/RRHH" });
        }

        // GET: api/solicitudes/pendientes
        [HttpGet("pendientes")]
        public IActionResult GetPendientes()
        {
            return Ok(solicitudes.Where(s => s.Estado == "Pendiente").ToList());
        }
    }
}