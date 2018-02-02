using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe_Core.TicTacToe.Models
{
    public class UserModel : IdentityUser
    {
        public string ConnectionId { get; set; }
    }
}
