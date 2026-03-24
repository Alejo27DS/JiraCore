using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace JiraCore.Models
{
    public class Colaborador
    {
        // Le decimos a Mongo que el "_id" es su identificador único
        [BsonId]
        public ObjectId Id { get; set; }

        public string cedula { get; set; } = "";
        public string nombre_completo { get; set; } = "";
        public string cargo_actual { get; set; } = "";
        public string campana_actual { get; set; } = "";
        public string fecha_ingreso { get; set; } = "";
        public string estado { get; set; } = "";
    }
}