using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Manager
{

    /// <summary>
    /// Manager properties for a <see cref="IHubManager{THub, T}"/>.
    /// </summary>    
    /// <typeparam name="THub">
    /// Object which inherit from <see cref="AppHub{T}"
    /// </typeparam>
    /// <typeparam name="T">
    /// Interfaces which inherit from <see cref="IAppHub"/> .
    /// </typeparam>
    public class ManagerProperties<THub, T> where THub : Hub<T> where T : class, IAppHub
    {
        public IHubContext<THub, T> Clients { get; set; }

        public IUserService<T> UserService { get; set; }

        public IGroupService<T> GroupService { get; set; }
    }
}
