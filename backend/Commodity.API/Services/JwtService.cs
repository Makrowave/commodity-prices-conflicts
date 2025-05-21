using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Commodity.API.Database.Models;
using Commodity.API.Models;
using Microsoft.IdentityModel.Tokens;

namespace Commodity.API.Services;

public class JwtService(IConfiguration configuration)
{
    public TokenDto GetTokenFor(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Name),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, "User")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        var tokenString = new JwtSecurityTokenHandler()
            .WriteToken(token);

        return new TokenDto(tokenString);
    }
}