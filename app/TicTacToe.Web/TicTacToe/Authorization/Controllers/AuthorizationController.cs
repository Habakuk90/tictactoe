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
    public class LoginController : Controller
    {
        private IUserManagement userManagement;
        public LoginController(UserManager<UserModel> userManager,
            SignInManager<UserModel> signInManager)
        {
            this.userManagement = new UserManagement(signInManager, userManager);
        }

        [Route("/Login")]
        public IActionResult Login(string returnUrl = null)
        {

            return View("~/TicTacToe/Authoritazion/Views/Login.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel user)
        {
            var result = await userManagement.LoginUser(user);

            if (result.Succeeded)
            {
                return LocalRedirect("/");
            }
            
            return RedirectToRoute("/Login");
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
            var registerData = new LoginModel
            {
                User = new UserModel { UserName = userName},
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
