using Microsoft.AspNetCore.Mvc;
using JiraCore.Models;

namespace JiraCore.Controllers
{
    public class AccountController : Controller
    {
        // GET: Mostrar el formulario de Login
        public IActionResult Login()
        {
            // Si ya está logueado, enviarlo al Home
            if (HttpContext.Session.GetString("UserEmail") != null)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        // POST: Procesar el formulario
        [HttpPost]
        public IActionResult Login(Account model)
        {
            if (ModelState.IsValid)
            {
                // --- LÓGICA DE AUTENTICACIÓN (SIMULADA) ---
                // En un sistema real, aquí consultarías a tu Base de Datos
                string emailValido = "admin@bpm.com";
                string passwordValido = "123456";

                if (model.Email == emailValido && model.Password == passwordValido)
                {
                    // 1. Guardamos el email en la Sesión
                    HttpContext.Session.SetString("UserEmail", model.Email);
                    HttpContext.Session.SetString("UserName", "Administrador");

                    // 2. Redirigimos al Dashboard
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    // Credenciales incorrectas
                    ModelState.AddModelError(string.Empty, "Email o contraseña incorrectos.");
                    return View(model);
                }
                // ----------------------------------------
            }

            // Si hay errores de validación (ej: campos vacíos)
            return View(model);
        }

        public IActionResult Logout()
        {
            // Limpiar la sesión
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
