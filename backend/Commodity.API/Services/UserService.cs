using Commodity.API.Database;
using Commodity.API.Database.Models;
using Isopoh.Cryptography.Argon2;
using System.Security.Cryptography;
using System.Text;
using Commodity.API.Models;
using ErrorOr;
using Microsoft.EntityFrameworkCore;

namespace Commodity.API.Services;

public class UserService(
    CommodityDbContext dbContext,
    JwtService jwt)
{
    public async Task<ErrorOr<TokenDto>> Login(LoginDto dto)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return ErrorOr<TokenDto>.From([ Error.Conflict(description: "User does not exist.") ]);

        return Argon2.Verify(user.PasswordHash, dto.Password)
            ? jwt.GetTokenFor(user)
            : ErrorOr<TokenDto>.From([ Error.Validation(description: "Invalid credentials.") ]);
    }

    private async Task<List<Error>> ValidateDto(RegisterDto dto)
    {
        var errors = new List<Error>();
        if (await dbContext.Users.AnyAsync(u => u.Email == dto.Email))
            errors.Add(Error.Conflict(description: "Email already registered."));;

        if (dto.Password != dto.PasswordConfirm)
            errors.Add(Error.Validation(description: "Passwords do not match."));

        if (await dbContext.Users.AnyAsync(u => u.Name == dto.Username))
            errors.Add(Error.Conflict(description: "Username already taken."));
        
        return errors;
    }
    
    public async Task<ErrorOr<TokenDto>> Register(RegisterDto dto)
    {
        var errors = await ValidateDto(dto);
        if (errors.Count > 0)
            return ErrorOr<TokenDto>.From(errors);

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = Argon2.Hash(dto.Password),
            Name = dto.Username
        };

        await using (var transaction = await dbContext.Database.BeginTransactionAsync())
        {
            try
            {
                dbContext.Users.Add(user);
                await dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                return ErrorOr<TokenDto>.From(
                    [
                        Error.Failure(description: $"Failed to commit data to the database. ({e.Message})")
                    ]);
            }
        }
        
        return jwt.GetTokenFor(user);
    }
}