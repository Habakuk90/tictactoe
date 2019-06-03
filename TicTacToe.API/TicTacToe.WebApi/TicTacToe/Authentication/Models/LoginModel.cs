using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Authentication.Models
{
    /// <summary>
    /// Represents the Login form Model.
    /// </summary>
    public class LoginModel 
    {
        /// <summary>
        /// Represents the Username.
        /// </summary>
        [Required]
        public string UserName { get; set; }

        /// <summary>
        /// Represents the Password.
        /// </summary>
        [Required]
        public string Password { get; set; }

    }
}
