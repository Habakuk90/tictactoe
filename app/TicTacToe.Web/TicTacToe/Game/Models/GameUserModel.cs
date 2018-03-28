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
    }
}
