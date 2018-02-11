using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.Web.TicTacToe.Authorization.Models;

namespace TicTacToe.Web.TicTacToe.Authorization.Repository
{
    public class UserManagement : IUserManagement, IDisposable
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="signInManager"></param>
        /// <param name="userManager"></param>
        public UserManagement(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<IdentityResult> RegisterUser(UserModel user)
        {
            var result = await _userManager.CreateAsync(user.Identity, user.Password);
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task<SignInResult> LoginUser(UserModel user)
        {
            SignInResult result = new SignInResult();

            if (user != null && user.Identity != null && user.Identity.UserName != null)
            {
                IdentityUser signedUser = await _userManager.FindByNameAsync(user.Identity.UserName);
                result = await _signInManager.PasswordSignInAsync(signedUser.UserName, user.Password, true, lockoutOnFailure: true);
                return result;
            }
            return result;
        }

        

        public void Dispose()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        public async void LogoutUser()
        {
            await _signInManager.SignOutAsync();
            //logger implementieren irgendwann
        }
    }
}
