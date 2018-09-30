using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Authentication.Models
{
    /// <summary>
    /// Represents the Registration form model
    /// </summary>
    public class RegisterModel
    {
        #region public properties

        /// <summary>
        /// Represents the UserName.
        /// </summary>
        [Required]
        public string UserName { get; set; }

        /// <summary>
        /// Represents the Password.
        /// </summary>
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        /// <summary>
        /// Represents ConfirmPassword.
        /// Compare with Password.
        /// </summary>
        [Required(ErrorMessage = "Confirm Password is required")]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        #endregion
    }
}
