using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using TicTacToe.Web.TicTacToe.Authorization.Models;
using TicTacToe.Web.TicTacToe.Authorization.Repository;

namespace TicTacToe.Web.TicTacToe.Game.Models
{
    public class GameUserModel
    {
        public string Name { get; set; }

        public string CurrentConnectionId { get; set; }

        public ConnectionMapping<string> Connections { get; set; }

        //For TryGetValue method in Dictionary
        public override bool Equals(object obj)
        {
            if (obj == null || !(obj is GameUserModel)) return false;

            return ((GameUserModel)obj).Name == this.Name;
        }

        public override int GetHashCode()
        {
            return (this.Name).GetHashCode();
        }
    }
}
