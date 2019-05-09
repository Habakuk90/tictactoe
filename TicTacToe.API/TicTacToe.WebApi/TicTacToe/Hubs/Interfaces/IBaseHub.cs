using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Interfaces
{
    /// <summary>
    /// Represents Base Hub methods for <see cref="Hub{T}"/>.
    /// </summary>
    public interface IBaseHub
    {
        /// <summary>
        /// Invokes the UpdateUserList method to Clients.
        /// </summary>
        /// <param name="onlineUsers">
        /// List of current online Users.
        /// </param>
        /// <returns></returns>
        Task UpdateUserList(IEnumerable<string> onlineUsers);
    }
}
