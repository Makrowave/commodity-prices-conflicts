using System.Text.Json.Serialization;

namespace Commodity.API.Models;

public class EventDto
{
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    
    [JsonPropertyName("date")]
    public required DateTimeOffset Date { get; set; }
}