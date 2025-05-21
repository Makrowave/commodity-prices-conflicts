namespace Commodity.API.Models;

public record RegisterDto(string Email, string Password, string PasswordConfirm, string Username);