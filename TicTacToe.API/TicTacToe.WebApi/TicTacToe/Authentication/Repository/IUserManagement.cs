using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Authentication.Models;

namespace TicTacToe.WebApi.TicTacToe.Authentication.Repository
{
    interface IUserManagement
    {
        /// <summary>
        /// Loggs in User
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Task<SignInResult></returns>
        Task<object> LoginUser(LoginModel user);
        /// <summary>
        /// Register User
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Task<SignInResult></returns>
        Task<object> RegisterUser(RegisterModel user);
        /// <summary>
        /// Logout User
        /// </summary>
        void LogoutUser();
    }
}
