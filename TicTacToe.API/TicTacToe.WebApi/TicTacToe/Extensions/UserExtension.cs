using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Extensions
{
    public static class UserExtension
    {
        public static bool UserExists(this BaseUser user, string userName)
        {
            return false;
        }
    }
}
