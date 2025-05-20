using System.Text;
using Commodity.API.Database;
using Commodity.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var key = "SuperSecretKey123456!@#"u8.ToArray();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors();
builder.Services.AddDbContext<CommodityDbContext>();
builder.Services.AddSingleton<ConflictService>();
builder.Services.AddSingleton<CommodityService>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

await app.Services
    .GetRequiredService<CommodityDbContext>()
    .Database
    .MigrateAsync();

await app.Services
    .GetRequiredService<ConflictService>()
    .LoadConflicts();

app.MapGet(
    "/api/conflicts",
    ([FromQuery] DateTimeOffset from, [FromQuery] DateTimeOffset to, [FromServices] ConflictService conflictService) => conflictService.GetConflicts(from, to))
    .RequireAuthorization();

app.MapGet(
    "/api/commodities",
    ([FromQuery] DateTimeOffset from, [FromQuery] DateTimeOffset to, [FromServices] CommodityService commodityService) => commodityService.GetCommoditiesBetween(from, to))
    .RequireAuthorization();

app.Run();