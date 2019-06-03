namespace TicTacToe.WebApi.TicTacToe.Authentication.Repository
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// JWT Token helper
    /// </summary>
    public static class Tokens
    {
        
        /// <summary>
        /// Generates the JWT Token
        /// </summary>
        /// <param name="email">
        /// email of the user
        /// </param>
        /// <param name="user">
        /// User who requested the JWT Token
        /// </param>
        /// <param name="configuration">
        /// app Configuration
        /// </param>
        /// <returns>
        /// Returns the JWT Token as String
        /// </returns>
        public static string GenerateJwtToken(string email, IdentityUser user, IConfiguration configuration)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            SigningCredentials creds = new SigningCredentials
                (key, SecurityAlgorithms.HmacSha256);

            DateTime expires = DateTime.Now.AddDays
                (Convert.ToDouble(configuration["Jwt:ExpireDays"]));

            JwtSecurityToken token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Issuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
