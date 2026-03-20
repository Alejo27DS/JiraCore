using JiraCore.Models;
using Microsoft.AspNetCore.Mvc;

namespace JiraCore.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class SolicitudController : Controller
    {
        // Lista estática para simular Base de Datos (Se borra al reiniciar el servidor)
        private static List<Solicitud> solicitudes = new List<Solicitud>();
        private static int contador = 1;

        // POST: api/solicitudes/crear
        [HttpPost("crear")]
        public IActionResult CrearSolicitud([FromForm] string tipo, [FromForm] string datos, [FromForm] IFormFile? archivo)
        {
            var nuevaSolicitud = new Solicitud
            {
                Id = contador++,
                Tipo = tipo,
                Datos = datos, // Aquí llega el JSON del formulario
                NombreEmpleado = "Usuario Simulado", // En un sistema real, esto viene del Login (JWT)
                Estado = "Pendiente",
                Fecha = DateTime.Now
            };

            // Aquí podrías guardar el archivo en disco si quieres
            // if (archivo != null) { ... }

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
