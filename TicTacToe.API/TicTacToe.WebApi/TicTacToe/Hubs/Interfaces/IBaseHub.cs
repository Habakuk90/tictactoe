using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Interfaces
{
    public interface IBaseHub
    {
        Task UpdateUserList(IEnumerable<string> onlineUsers);
    }
}
