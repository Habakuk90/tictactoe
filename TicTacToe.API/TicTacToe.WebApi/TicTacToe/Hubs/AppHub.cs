namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    using System;
    using System.Threading.Tasks;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Services.Interfaces;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// Represents an abstract BaseHub with all User relevant connection Methods
    /// </summary>
    /// <typeparam name="T">
    /// Hub class.
    /// </typeparam>
    public abstract class AppHub<T> : Hub<T> where T : class, IAppHub
    {
        private readonly IUserService _userService;
        private readonly IGroupService _groupService;
        public readonly ILogger _logger;

        /// <summary>
        /// Base hub ctor
        /// </summary>
        /// <param name="userService">
        /// Service for User based methods.
        /// </param>
        protected AppHub(IUserService userService, IGroupService groupService)
        {
            this._userService = userService;
            this._groupService = groupService;
        }

        /// <summary>
        /// Join Group hub method.
        /// </summary>
        /// <param name="groupName">
        /// given name for group from frontend
        /// </param>
        /// <returns>
        /// Same groupname
        /// </returns>
        public async Task<string> JoinGroup(string groupName)
        {
            // TODOANDI: add or update group, if last member => remove;

            //this._groupService.

            
            return groupName;
        }

        /// <summary>
        /// Leave Group Hub method.
        /// </summary>
        /// <param name="groupName">
        /// Given name for group from frontend.
        /// </param>
        public async Task LeaveGroup(string groupName)
        {
            // TODOANDI: update or remove group, if last member => remove;
            //this._baseService.LeaveGroupAsync(currentUser, groupName);
        }

        /// <summary>
        /// Marks Current user as online, if new user, add to DB
        /// </summary>
        /// <param name="userName">
        /// userName of current User.
        /// </param>
        public abstract Task AddCurrentUser(string userName, bool isAnonymous = true);

        /// <summary>
        /// Defines what happens when frontend user connects.
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Defines what happens when frontend user disconnects
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
