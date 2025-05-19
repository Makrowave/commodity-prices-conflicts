using System.Text.Json;
using Commodity.API.Models;

namespace Commodity.API.Services;

public class ConflictService
{
    private List<ConflictDto> _conflicts = [];
    
    public async Task LoadConflicts()
    {
        await using var reader = new FileStream("./conflicts.json", FileMode.Open, FileAccess.Read, FileShare.Read);
        var conflicts = await JsonSerializer.DeserializeAsync<List<Conflict>>(reader)
                     ?? throw new InvalidOperationException();
        
        _conflicts = conflicts
            .Where(c => c.IntensityLevel == "2")
            .GroupBy(c => c.ConflictId)
            .Select(ConflictDto.FromConflictGrouping)
            .OrderBy(c => c.StartDate)
            .ToList();
    }

    public IEnumerable<ConflictDto> GetConflicts(DateTimeOffset from, DateTimeOffset to)
    {
        return _conflicts
            .Where(c => c.StartDate >= from && (c.EndDate is null || c.EndDate <= to));
    }
}