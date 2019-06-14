using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Manager
{
    public class ManagerProperties<THub, T> where THub : Hub<T> where T : class, IAppHub
    {
        public IHubContext<THub, T> Clients { get; set; }

        public IUserService<T> UserService { get; set; }

        public IGroupService<T> GroupService { get; set; }
    }
}
