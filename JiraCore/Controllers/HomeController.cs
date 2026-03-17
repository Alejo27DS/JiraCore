using Microsoft.AspNetCore.Mvc;

namespace JiraCore.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        // Inyectamos el accessor para poder leer la sesión
        public HomeController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        // Método privado para verificar si está logueado
        private bool EstaLogueado()
        {
            var user = _httpContextAccessor.HttpContext.Session.GetString("UserEmail");
            return user != null;
        }

        // Sobrescribimos OnActionExecuting para ejecutar esto antes de cada acción
        public override void OnActionExecuting(Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            // Si NO está logueado y NO está intentando ir al Login, redirigir
            if (!EstaLogueado() && context.ActionDescriptor.RouteValues["action"]?.ToString() != "Login")
            {
                context.Result = new RedirectToActionResult("Login", "Account", null);
            }
        }

        public IActionResult Index()
        {
            ViewData["Title"] = "Panel Principal";
            return View();
        }

        public IActionResult Employees()
        {
            ViewData["Title"] = "Gestión de Empleados";
            return View();
        }

        public IActionResult Requests()
        {
            ViewData["Title"] = "Flujo de Solicitudes";
            return View();
        }

        public IActionResult Retirement()
        {
            ViewData["Title"] = "Proceso Jubilación";
            return View();
        }

        public IActionResult SST()
        {
            ViewData["Title"] = "Citas Psicología SST";
            return View();
        }

        public IActionResult Payroll()
        {
            ViewData["Title"] = "Nómina y Liquidaciones";
            return View();
        }

        public IActionResult Notifications()
        {
            ViewData["Title"] = "Notificaciones y Alertas";
            return View();
        }

        public IActionResult Admin()
        {
            ViewData["Title"] = "Panel Administración";
            return View();
        }

        public IActionResult Reports()
        {
            ViewData["Title"] = "Informes y Analítica";
            return View();
        }
    }
}
