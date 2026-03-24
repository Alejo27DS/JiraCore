using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using JiraCore.Models;

namespace JiraCore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMongoDatabase _database;

        public AuthController(IMongoDatabase database)
        {
            _database = database;
        }

        // 1. Definimos una clase simple para recibir los datos del formulario
        public class LoginRequest
        {
            public string email { get; set; } = "";
            public string password { get; set; } = "";
        }

        // 2. El Endpoint POST /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginData)
        {
            // Conectamos a la colección 'usuarios'
            var collection = _database.GetCollection<Usuario>("usuarios");

            // Buscamos el usuario por el email
            var usuario = await collection.Find(u => u.email == loginData.email).FirstOrDefaultAsync();

            // VALIDACIÓN 1: ¿El usuario existe?
            if (usuario == null)
            {
                return Unauthorized(new { message = "Usuario no encontrado" });
            }

            // VALIDACIÓN 2: ¿La contraseña es correcta?
            // NOTA: En un sistema real, aquí se compara la contraseña "Hasheada", no en texto plano.
            if (usuario.password != loginData.password)
            {
                return Unauthorized(new { message = "Contraseña incorrecta" });
            }

            // VALIDACIÓN 3: ¿El usuario está activo?
            if (!usuario.activo)
            {
                return Unauthorized(new { message = "Usuario inactivo" });
            }

            // ¡ÉXITO! Retornamos los datos del usuario (más adelante aquí iría el Token JWT)
            return Ok(new { 
                message = "Login exitoso",
                nombre = usuario.nombre_completo,
                rol = usuario.rol,
                email = usuario.email
            });
        }
    }
}