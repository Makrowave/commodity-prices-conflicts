using Commodity.API.Database;
using Commodity.API.Database.Models;
using Isopoh.Cryptography.Argon2;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace Commodity.API.Services;

public class UserService(CommodityDbContext dbContext)
{
    public async Task<bool> Register(string username, string password)
    {
        if (await dbContext.Users.AnyAsync(u => u.Email == username))
            return false;
        
        var salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        var config = new Argon2Config
        {
            Version = Argon2Version.Nineteen,
            TimeCost = 4,
            MemoryCost = 65536,
            Lanes = 8,
            Password = System.Text.Encoding.UTF8.GetBytes(password),
            Salt = salt,
            HashLength = 32
        };

        var argon2 = new Argon2(config);
        var hash = argon2.Hash();

        var user = new User
        {
            Email = username,
            PasswordSalt = Convert.ToBase64String(salt),
            PasswordHash = Convert.ToBase64String(hash.Buffer),
            Name = username
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync();
        return true;
    }
}