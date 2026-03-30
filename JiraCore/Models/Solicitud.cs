using JiraCore.Controllers;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JiraCore.Models
{
    public class Comentario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("autor")]
        public string Autor { get; set; } = string.Empty; // RRHH o Tecnología

        [BsonElement("mensaje")]
        public string Mensaje { get; set; } = string.Empty;

        [BsonElement("fecha")]
        public DateTime Fecha { get; set; } = DateTime.Now;
    }
    public class Solicitud
    {
        // Mongo usa ObjectId por defecto, pero podemos usar string para que Angular lo maneje fácil
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Hacemos nullable o lo dejamos string

        [BsonElement("tipo")]
        public string Tipo { get; set; } = string.Empty;

        [BsonElement("datos")]
        public string Datos { get; set; } = string.Empty; // El JSON con todos los campos

        [BsonElement("nombreEmpleado")]
        public string NombreEmpleado { get; set; } = string.Empty;

        [BsonElement("cargo")]
        public string Cargo { get; set; } = string.Empty;

        [BsonElement("estado")]
        public string Estado { get; set; } = "Pendiente"; // Pendiente, EnProceso, Gestionada, EnviadoTecnologia

        [BsonElement("fecha")]
        public DateTime Fecha { get; set; } = DateTime.Now;

        [BsonElement("isDeleted")]
        public bool IsDeleted { get; set; } = false;


        [BsonElement("comentarios")]
        public List<ComentarioItem> Comentarios { get; set; } = new List<ComentarioItem>();
    }

}