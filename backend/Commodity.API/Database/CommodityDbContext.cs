using Commodity.API.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace Commodity.API.Database;

public class CommodityDbContext : DbContext
{
    public virtual DbSet<User> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySql("server=localhost;database=commodities;user=user;password=password", ServerVersion.AutoDetect("server=localhost;database=commodities;user=user;password=password"));
        base.OnConfiguring(optionsBuilder);
    }
}