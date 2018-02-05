using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.TicTacToe.Authorization.Models;

namespace TicTacToe.TicTacToe.Authorization.Repository
{
    interface IUserManagement
    {
        Task<SignInResult> LoginUser(LoginModel user);
        Task<IdentityResult> RegisterUser(LoginModel user);
    }
}
