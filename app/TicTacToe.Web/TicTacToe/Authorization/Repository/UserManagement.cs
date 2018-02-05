using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.TicTacToe.Authorization.Models;

namespace TicTacToe.TicTacToe.Authorization.Repository
{
    public class UserManagement : IUserManagement, IDisposable
    {
        private readonly SignInManager<UserModel> _signInManager;
        private readonly UserManager<UserModel> _userManager;

        public UserManagement(SignInManager<UserModel> signInManager, UserManager<UserModel> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<IdentityResult> RegisterUser(LoginModel user)
        {
            var result = await _userManager.CreateAsync(user.User, user.Password);
            return result;
        }

        public async Task<SignInResult> LoginUser(LoginModel user)
        {

            var result = await _signInManager.PasswordSignInAsync(user.User, user.Password,true, lockoutOnFailure: true);
            return result;
        }

        public void Dispose()
        {

        }
    }
}
