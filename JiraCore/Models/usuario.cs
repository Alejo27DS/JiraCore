using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JiraCore.Models
{
    public class Usuario
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string email { get; set; } = "";
        public string password { get; set; } = ""; // esto después debe ir encriptado muchachos
        public string nombre_completo { get; set; } = "";
        public string rol { get; set; } = ""; // ADMIN, JEFE_TECNOLOGIA, etc.
        public bool activo { get; set; } = true;
    }
}