using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Authentication.Models;

namespace TicTacToe.WebApi.TicTacToe.Authentication.Repository
{
    public class UserManagement : IUserManagement, IDisposable
    {

        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Set SignInManager and UserManager through Dependency Injection
        /// </summary>
        /// <param name="signInManager"></param>
        /// <param name="userManager"></param>
        public UserManagement(SignInManager<IdentityUser> signInManager,
                              UserManager<IdentityUser> userManager,
                              IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        /// <summary>
        /// Register User with UserManager
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<object> RegisterUser(RegisterModel registerModel)
        {
            var user = new IdentityUser
            {
                UserName = registerModel.UserName,
            };
            var result = await _userManager.CreateAsync(user, registerModel.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return await GenerateJwtToken(user.UserName, user);
            }

            throw new ApplicationException("UNKNOWN_ERROR");

            //var result = await _userManager.CreateAsync(user.Identity, user.Password);
            //return result;
        }

        /// <summary>
        /// Login User with SignInManager
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<object> LoginUser(LoginModel user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.UserName, user.Password, false, false);

            if (result.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(r => r.UserName == user.UserName);
                return await GenerateJwtToken(user.UserName, appUser);
            }

            throw new ApplicationException("INVALID_LOGIN_ATTEMPT");

            // old stuff
            //SignInResult result = new SignInResult();

            //if (user != null && user.Identity != null && user.Identity.UserName != null)
            //{
            //    IdentityUser signedUser = await _userManager.FindByNameAsync(user.Identity.UserName);
            //    result = await _signInManager.PasswordSignInAsync(signedUser.UserName, user.Password, true, lockoutOnFailure: true);
            //    return result;
            //}
            //return result;
        }



        public void Dispose()
        {

        }

        /// <summary>
        /// Logs Out User with SignInManager
        /// </summary>
        public async void LogoutUser()
        {
            await _signInManager.SignOutAsync();
            //logger implementieren irgendwann
        }



        private async Task<object> GenerateJwtToken(string email, IdentityUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["JwtIssuer"],
                _configuration["JwtIssuer"],
                //claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
