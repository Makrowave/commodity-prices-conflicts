using System.Text.Json.Serialization;
using Commodity.API.CommodityWSService;

namespace Commodity.API.Models;

public class CommodityDto
{
    [JsonPropertyName("date")]
    public DateTimeOffset Date { get; set; }
    
    [JsonExtensionData]
    public Dictionary<string, object> PricingData { get; set; } = null!;

    public static CommodityDto FromCommodityRecord(commodityRecord commodityRecord)
    {
        return new CommodityDto
        {
            Date = new DateTimeOffset(commodityRecord.year, commodityRecord.month, 1, 0, 0, 0, TimeSpan.Zero),
            PricingData = commodityRecord.values
                .ToDictionary(c => c.key, c => (object)c.value)
        };
    }
}