using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Interfaces
{
    /// <summary>
    /// Represents Base Hub methods for <see cref="Hub{T}"/>.
    /// </summary>
    public interface IAppHub
    {
        /// <summary>
        /// Invokes the UpdateUserList method to Clients.
        /// </summary>
        /// <param name="onlineUsers">
        /// List of current online Users.
        /// </param>
        /// <returns></returns>
        Task UpdateUserList(IEnumerable<User> onlineUsers);
    }
}
