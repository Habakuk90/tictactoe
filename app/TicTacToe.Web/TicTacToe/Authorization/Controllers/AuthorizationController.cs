using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.Web.TicTacToe.Authorization.Models;
using TicTacToe.Web.TicTacToe.Authorization.Repository;

namespace TicTacToe.Web.TicTacToe.Authorization.Controllers
{
    public class AuthorizationController : Controller
    {
        private IUserManagement userManagement;
        public AuthorizationController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            this.userManagement = new UserManagement(signInManager, userManager);
        }

        [Route("/Login")]
        public IActionResult Login(string returnUrl = null)
        {

            return View("~/TicTacToe/Authorization/Views/Login.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> Login(string userName,string email, string password)
        {
            
                UserModel loginData = new UserModel
                {
                    Identity = new IdentityUser { UserName = userName, SecurityStamp = Guid.NewGuid().ToString(), Email = email },
                    Password = password,
                    
                };

                var result = await userManagement.LoginUser(loginData);

                if (result.Succeeded)
                {
                    return LocalRedirect("/");
                }
            
            return LocalRedirect("/Register");
        }

        /// <summary>
        /// Register Route GET
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [Route("/Register")]
        public IActionResult Register(string returnUrl = null)
        {

            return View("~/TicTacToe/Authorization/Views/Register.cshtml");
        }

        /// <summary>
        /// Register Route POST
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Register(string userName, string password)
        {
            var registerData = new UserModel
            {
                Identity = new IdentityUser { UserName = userName },
                Password = password
            };
            var result = await userManagement.RegisterUser(registerData);
            if (result.Succeeded)
            {
                return LocalRedirect("/");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return LocalRedirect("/Register");

        }
    }
}
