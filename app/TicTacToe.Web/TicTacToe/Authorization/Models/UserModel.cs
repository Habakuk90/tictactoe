using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.TicTacToe.Authorization.Models
{
    public class UserModel : IdentityUser
    {
    }

    public class LoginModel
    {
        public UserModel User { get; set; }
        public string Password { get; set; }
    }
}
