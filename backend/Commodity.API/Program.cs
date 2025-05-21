using System.Globalization;
using System.Text;
using Commodity.API.Database;
using Commodity.API.Models;
using Commodity.API.Services;
using ErrorOrAspNetCoreExtensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException());

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
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<UserService>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

using (var scope = app.Services.CreateScope())
{
    await scope.ServiceProvider
        .GetRequiredService<CommodityDbContext>()
        .Database
        .MigrateAsync();
}

await app.Services
    .GetRequiredService<ConflictService>()
    .LoadConflicts();

app.MapGet(
    "/api/conflicts",
    ([FromQuery] DateTimeOffset from, [FromQuery] DateTimeOffset to, [FromQuery] int[] region, [FromServices] ConflictService conflictService) => conflictService.GetConflicts(from, to, region))
    ;

app.MapGet(
    "/api/commodities",
    ([FromQuery] DateTimeOffset from, [FromQuery] DateTimeOffset to, [FromServices] CommodityService commodityService) => commodityService.GetCommoditiesBetween(from, to))
    ;

app.MapPost("/api/login",
    async ([FromBody] LoginDto dto, [FromServices] UserService userService) =>
    {
        var errorOr = await userService.Login(dto);
        return errorOr.ToOk();
    });

app.MapPost("/api/register",
    async ([FromBody] RegisterDto dto, [FromServices] UserService userService) =>
    {
        var errorOr = await userService.Register(dto);
        return errorOr.ToOk();   
    });

app.Run();