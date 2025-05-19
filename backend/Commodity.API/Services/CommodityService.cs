using Commodity.API.CommodityWSService;

namespace Commodity.API.Services;

public class CommodityService
{
    private readonly CommoditySOAPInterface _commoditySoapInterface = new CommoditySOAPInterfaceClient();

    public async Task<IEnumerable<commodityRecord>> GetCommoditiesBetween(
        DateTimeOffset from,
        DateTimeOffset to)
    {
        var fromDate = from.Date;
        var toDate = to.Date;
        var results = await _commoditySoapInterface
            .getCommoditiesAsync(new getCommoditiesRequest(fromDate, toDate));

        return results.@return;
    }
}