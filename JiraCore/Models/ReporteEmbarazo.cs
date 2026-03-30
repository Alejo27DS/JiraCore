using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JiraCore.Models
{
    public class ReporteEmbarazo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Mongo genera este ID automáticamente

        public string SolicitanteEnNombreDe { get; set; }
        public string Resumen { get; set; }
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Cargo { get; set; }
        public string CampaniaArea { get; set; }
        public string NumeroContacto { get; set; }
        public string CorreoCorporativo { get; set; }
        
        // Mongo maneja fechas UTC, pero C# DateTime funciona bien
        public DateTime FechaReporte { get; set; }
        public DateTime FechaIngreso { get; set; }
        
        // Guardamos la ruta donde se guardó el archivo físico (PDF)
        public string RutaArchivo { get; set; }
        
        // Campo de auditoría útil
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    }

    // DTO para recibir el archivo (IFormFile) y mapearlo a la entidad
    public class ReporteEmbarazoDto
    {
        public string SolicitanteEnNombreDe { get; set; }
        public string Resumen { get; set; }
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Cargo { get; set; }
        public string CampaniaArea { get; set; }
        public string NumeroContacto { get; set; }
        public string CorreoCorporativo { get; set; }
        public DateTime FechaReporte { get; set; }
        public DateTime FechaIngreso { get; set; }
        public Microsoft.AspNetCore.Http.IFormFile Documento { get; set; }
    }
}