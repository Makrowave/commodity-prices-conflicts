using Commodity.API.CommodityWSService;
using Commodity.API.Models;

namespace Commodity.API.Services;

public class CommodityService
{
    private readonly CommoditySOAPInterface _commoditySoapInterface = new CommoditySOAPInterfaceClient();

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