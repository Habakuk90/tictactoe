using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Manager
{
    /// <summary>
    /// Represents a Factory to create <see cref="IHubManager{THub, T}"/>
    /// </summary>
    /// <typeparam name="THub">
    /// Object which inherit from <see cref="AppHub{T}"
    /// </typeparam>
    /// <typeparam name="T">
    /// Interfaces which inherit from <see cref="IAppClient"/> .
    /// </typeparam>
    public class HubManagerFactory<THub, T> where THub : Hub<T> where T : class, IAppClient
    {
        #region private properties

        private readonly IUserService<T> _userService;
        private readonly IGroupService<T> _groupService;
        private readonly IHubContext<THub, T> _context;

        #endregion

        /// <summary>
        /// Constructor of factory.
        /// </summary>
        /// <param name="userService">
        /// <see cref="IUserService{T}"/> as dependency injection
        /// </param>
        /// <param name="groupService">
        /// <see cref="IGroupService{T}{T}"/> as dependency injection
        /// </param>
        /// <param name="context">
        /// <see cref="IHubContext{THub, T}"/> as dependency injection
        /// </param>
        public HubManagerFactory(IUserService<T> userService, IGroupService<T> groupService, IHubContext<THub, T> context)
        {
            this._userService = userService;
            this._groupService = groupService;
            this._context = context;
        }

        /// <summary>
        /// Creates the <see cref="IHubManager{THub, T}"/> object.
        /// </summary>
        /// <returns>
        /// <see cref="HubManager{THub, T}"/> with dependency injected services as 
        /// <see cref="ManagerProperties{THub, T}"/>.
        /// </returns>
        public HubManager<THub, T> Create()
        {
            var props = new ManagerProperties<THub, T>
            {
                Clients = _context,
                UserService = this._userService,
                GroupService = this._groupService
            };

            return new HubManager<THub, T>(props);
        }
    }
}
