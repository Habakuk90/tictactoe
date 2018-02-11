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
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<SignInResult> LoginUser(UserModel user);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<IdentityResult> RegisterUser(UserModel user);
        /// <summary>
        /// 
        /// </summary>
        void LogoutUser();
    }
}
