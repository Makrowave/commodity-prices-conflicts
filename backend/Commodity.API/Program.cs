using Commodity.API.Services;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddSingleton<ConflictService>();
builder.Services.AddSingleton<CommodityService>();

var app = builder.Build();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

await app.Services
    .GetRequiredService<ConflictService>()
    .LoadConflicts();

app.MapGet(
    "/api/conflicts",
    ([FromQuery] DateTimeOffset from, [FromQuery] DateTimeOffset to, [FromServices] ConflictService conflictService) => conflictService.GetConflicts(from, to));

app.MapGet(
    "/api/commodities",
    ([FromQuery] DateTimeOffset from, [FromQuery] DateTimeOffset to, [FromServices] CommodityService commodityService) => commodityService.GetCommoditiesBetween(from, to));

app.Run();