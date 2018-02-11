using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.Web.TicTacToe.Authorization.Models
{
    public class UserModel 
    {
        public IdentityUser Identity { get; set; }

        [NotMapped]
        public string Password { get; set; }
        public string ConnectionId { get; set; }
    }
}
