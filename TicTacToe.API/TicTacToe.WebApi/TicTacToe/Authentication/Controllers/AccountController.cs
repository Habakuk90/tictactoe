using TicTacToe.WebApi.TicTacToe.Authentication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace TicTacToe.WebApi.TicTacToe.Authentication.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Set SignInManager and UserManager through Dependency Injection
        /// </summary>
        /// <param name="signInManager"></param>
        /// <param name="userManager"></param>
        public AccountController(SignInManager<IdentityUser> signInManager,
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
        public async Task<object> RegisterUser([FromBody]RegisterModel registerModel)
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

            //[TODO] better error message for user to know what happened
            throw new ApplicationException("UNKNOWN_ERROR");
        }

        /// <summary>
        /// Login User with SignInManager
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<object> LoginUser([FromBody]LoginModel user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.UserName, user.Password, false, false);

            if (result.Succeeded)
            {
                var appUser = _userManager.Users.SingleOrDefault(r => r.UserName == user.UserName);
                return await GenerateJwtToken(user.UserName, appUser);
            }

            //[TODO] better error message for user to know what happened
            throw new ApplicationException("INVALID_LOGIN_ATTEMPT"); 
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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:ExpireDays"]));

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
