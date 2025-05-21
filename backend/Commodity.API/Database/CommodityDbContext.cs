using Commodity.API.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Commodity.API.Database;

public class CommodityDbContext(IConfiguration configuration) : DbContext
{
    public virtual DbSet<User> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connString = configuration["MySql:ConnectionString"]!;
        optionsBuilder.UseMySql(connString, ServerVersion.AutoDetect(connString));
        base.OnConfiguring(optionsBuilder);
    }
}