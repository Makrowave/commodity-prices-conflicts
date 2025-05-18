using System.Text.Json.Serialization;

namespace Commodity.API.Models;

public class Conflict
{
    [JsonPropertyName("conflict_id")]
    public string ConflictId { get; set; } = null!;
    
    [JsonPropertyName("location")]
    public string Location { get; set; } = null!;
    
    [JsonPropertyName("side_a")]
    public string SideA { get; set; } = null!;
    
    [JsonPropertyName("side_a_id")] 
    public string SideAId { get; set; } = null!;
    
    [JsonPropertyName("side_a_2nd")]
    public string SideASecondary { get; set; } = null!;
    
    [JsonPropertyName("side_b")]
    public string SideB { get; set; } = null!;
    
    [JsonPropertyName("side_b_id")]
    public string SideBId { get; set; } = null!;
    
    [JsonPropertyName("side_b_2nd")]
    public string SideBSecondary { get; set; } = null!;
    
    [JsonPropertyName("incompatibility")]
    public string Incompatibility { get; set; } = null!;
    
    [JsonPropertyName("territory_name")]
    public string TerritoryName { get; set; } = null!;
    
    [JsonPropertyName("year")]
    public string Year { get; set; } = null!;
    
    [JsonPropertyName("intensity_level")]
    public string IntensityLevel { get; set; } = null!;
    
    [JsonPropertyName("cumulative_intensity")]
    public string CumulativeIntensity { get; set; } = null!;
    
    [JsonPropertyName("type_of_conflict")]
    public string ConflictType { get; set; } = null!;
    
    [JsonPropertyName("start_date")]
    public string StartDate { get; set; } = null!;
    
    [JsonPropertyName("start_prec")]
    public string StartPrecision { get; set; } = null!;
    
    [JsonPropertyName("start_date2")]
    public string StartDate2 { get; set; } = null!;
    
    [JsonPropertyName("start_prec2")]
    public string StartPrecision2 { get; set; } = null!;
    
    [JsonPropertyName("ep_end")]
    public string EpEnd { get; set; } = null!;
    
    [JsonPropertyName("ep_end_date")]
    public string EpEndDate { get; set; } = null!;
    
    [JsonPropertyName("ep_end_prec")]
    public string EpEndPrecision { get; set; } = null!;
    
    [JsonPropertyName("gwno_a")]
    public string GwnoA { get; set; } = null!;
    
    [JsonPropertyName("gwno_a_2nd")]
    public string GwnoASecondary { get; set; } = null!;
    
    [JsonPropertyName("gwno_b")]
    public string GwnoB { get; set; } = null!;
    
    [JsonPropertyName("gwno_b_2nd")]
    public string GwnoBSecondary { get; set; } = null!;
    
    [JsonPropertyName("gwno_loc")]
    public string GwnoLocation { get; set; } = null!;
    
    [JsonPropertyName("region")]
    public string Region { get; set; } = null!;
    
    [JsonPropertyName("version")]
    public string Version { get; set; } = null!;
}