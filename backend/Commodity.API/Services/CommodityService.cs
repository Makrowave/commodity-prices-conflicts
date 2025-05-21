using Commodity.API.CommodityWSService;
using Commodity.API.Models;

namespace Commodity.API.Services;

public class CommodityService(IConfiguration configuration)
{
    private readonly CommoditySOAPInterface _commoditySoapInterface
        = new CommoditySOAPInterfaceClient(CommoditySOAPInterfaceClient.EndpointConfiguration.CommodityWSPort, configuration["Soap:Endpoint"]!);

    public async Task<IEnumerable<CommodityDto>> GetCommoditiesBetween(
        DateTimeOffset from,
        DateTimeOffset to)
    {
        var fromDate = from.Date;
        var toDate = to.Date;
        var results = await _commoditySoapInterface
            .getCommoditiesAsync(new getCommoditiesRequest(fromDate, toDate));

        return results.@return
            .Select(CommodityDto.FromCommodityRecord);
    }
}