namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Models;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Services;
    using global::TicTacToe.WebApi.TicTacToe.Services.Interfaces;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Threading.Tasks;

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

        private BaseUser _currentUser;

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
        public string JoinGroup(string groupName)
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
        public void LeaveGroup(string groupName)
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
        public void AddCurrentUser(string userName, bool isAnonymous = true)
        {
            this._currentUser = new BaseUser
            {
                Name = userName,
                CurrentConnectionId = Context.ConnectionId,
                isAnonymous = isAnonymous,
                Status = Constants.Status.ONLINE
            };

            // TODOANDI: Add or update current user, if anonymous => add flag, to be removed
            this._currentUser = this._service.UpdateUser(this._currentUser);
        }

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
            //BaseUser currentUser = this._baseService
            //    .GetUserByConnection(Context.ConnectionId);

            // wo anders zuweisen bidde todoandi
            this._currentUser.CurrentConnectionId = Context.ConnectionId;
            // leave group and remove user from connection
            this._service.RemoveUser(this._currentUser);
            //await this._baseService.LeaveGroupAsync(this._currentUser, currentUser.GroupName);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
