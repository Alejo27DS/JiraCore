using Microsoft.AspNetCore.Mvc;

namespace JiraCore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            // Aquí normalmente irías a la BD. Ahora simulamos datos.
            var stats = new
            {
                EmpleadosActivos = 142,
                SolicitudesPendientes = 12,
                Jubilaciones = 5,
                NominaLista = "98%"
            };

            return Ok(stats); // Devuelve JSON
        }

        [HttpGet("activity")]
        public IActionResult GetActivity()
        {
            var activity = new[]
            {
                new { Id = 1024, Desc = "Solicitud #1024", Status = "Pendiente", Color = "orange" },
                new { Id = 3, Desc = "Nómina Q3", Status = "Procesada", Color = "green" }
            };
            return Ok(activity);
        }
    }
}
