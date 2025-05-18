using Commodity.API.Services;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddSingleton<ConflictService>();

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

app.Run();