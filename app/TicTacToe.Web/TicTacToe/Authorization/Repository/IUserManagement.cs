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
        Task<SignInResult> LoginUser(LoginModel user);
        Task<IdentityResult> RegisterUser(LoginModel user);
    }
}
