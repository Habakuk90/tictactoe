using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.Web.TicTacToe.Authorization.Models;

namespace TicTacToe.Web.TicTacToe.Authorization.Repository
{
    interface IUserManagement
    {
        /// <summary>
        /// Loggs in User
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Task<SignInResult></returns>
        Task<SignInResult> LoginUser(LoginModel user);
        /// <summary>
        /// Register User
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Task<SignInResult></returns>
        Task<IdentityResult> RegisterUser(RegisterModel user);
        /// <summary>
        /// Logout User
        /// </summary>
        void LogoutUser();
    }
}
