namespace JiraCore.Models
{
    public class Solicitud
    {
        public int Id { get; set; }
        public string Tipo { get; set; } // Ej: "Ajustes", "Bono"
        public string Datos { get; set; } // Guardaremos el JSON de los campos aquí
        public string NombreEmpleado { get; set; }
        public string Estado { get; set; } // "Pendiente", "Aprobado"
        public DateTime Fecha { get; set; }
    }
}
