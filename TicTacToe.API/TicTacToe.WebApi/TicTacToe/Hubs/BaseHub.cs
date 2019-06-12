namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    using System;
    using System.Threading.Tasks;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Logging;

    /// <summary>
    /// Represents an abstract BaseHub with all User relevant connection Methods
    /// </summary>
    /// <typeparam name="T">
    /// Hub class.
    /// </typeparam>
    public abstract class BaseHub<T> : Hub<T> where T : class, IBaseHub
    {
        private readonly IUserService _service;

        public readonly ILogger _logger;

        /// <summary>
        /// Base hub ctor
        /// </summary>
        /// <param name="service">
        /// Service for User based methods.
        /// </param>
        protected BaseHub(IUserService service)
        {
            this._service = service;
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

            //if (currentUser.GroupName == groupName)
            //{
            //    this._baseService.LeaveGroupAsync(currentUser, groupName);
            //}

            //this._baseService.JoinGroupAsync(currentUser, groupName);

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
