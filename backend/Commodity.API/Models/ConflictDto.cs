using System.Text.Json.Serialization;

namespace Commodity.API.Models;

public class ConflictDto
{
    [JsonPropertyName("id")]
    public required int Id { get; set; }
    
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    
    [JsonPropertyName("start")]
    public required DateTimeOffset StartDate { get; set; }
    
    [JsonPropertyName("end")]
    public DateTimeOffset? EndDate { get; set; }

    [JsonPropertyName("events")]
    public IReadOnlyList<EventDto> Events { get; set; } = [];

    public static ConflictDto FromConflictGrouping(IGrouping<string, Conflict> grouping)
    {
        var first = grouping.First();
        return new ConflictDto
        {
            Id = int.Parse(grouping.Key),
            Name = $"{first.SideA} vs {first.SideB}",
            StartDate = DateTimeOffset.Parse(first.StartDate),
            EndDate = string.IsNullOrEmpty(first.EpEndDate)
                ? null
                : DateTimeOffset.Parse(first.EpEndDate),
            Events = grouping.Skip(1)
                .Where(c => !string.IsNullOrEmpty(c.StartDate2))
                .Select(c => new EventDto
                {
                    Name = $"{c.SideA} vs {c.SideB}",
                    Date = DateTimeOffset.Parse(c.StartDate2),
                })
                .ToList()
        };
    }
}