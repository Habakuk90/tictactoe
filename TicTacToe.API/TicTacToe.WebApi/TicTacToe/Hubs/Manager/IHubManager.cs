using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Manager
{
    public interface IHubManager<THub, T> where THub : Hub<T> where T : class, IAppHub
    {
        /// <summary>
        /// Updates user in DB.
        /// </summary>
        /// <param name="user">
        /// <see cref="User"/> which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// Status <see cref="Constants.Status"/> of user.
        /// </param>
        Task UpdateUser(User user);

        Task UpdateUser(IList<User> users);

        Task RemoveUser(string connectionId);

        Task<User> GetUser(string name = "", string connectionId = "");
    }
}
