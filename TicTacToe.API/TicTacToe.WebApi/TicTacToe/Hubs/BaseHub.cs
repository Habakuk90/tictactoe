namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Models;
    using global::TicTacToe.WebApi.TicTacToe.Services.Interfaces;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Threading.Tasks;

    public abstract class BaseHub<T> : Hub<T> where T : class, IBaseHub
    {
        private readonly IBaseService _baseService;

        public readonly ILogger _logger;

        protected BaseHub(IBaseService baseService)
        {
            this._baseService = baseService;
        }

        /// <summary>
        /// Join Group after a challenge happend
        /// </summary>
        /// <param name="enemyName">User who got challenged</param>
        /// <param name="groupName">represents as currentUserName + enemyUserName</param>
        /// <returns></returns>
        public string JoinGroup(string groupName)
        {
            GameUserModel currentUser = this._baseService
                .GetUserByConnection(Context.ConnectionId);

            if (currentUser.GroupName == groupName)
            {
                this._baseService.LeaveGroupAsync(currentUser, groupName);
            }

            this._baseService.JoinGroupAsync(currentUser, groupName);
            this._baseService.UpdateUserList();

            return groupName;
        }


        public void LeaveGroup(string groupName)
        {
            GameUserModel currentUser = this._baseService
                .GetUserByConnection(Context.ConnectionId);

            this._baseService.LeaveGroupAsync(currentUser, groupName);
        }

        /// <summary>
        /// Marks Current user as online, if new user, add to DB
        /// </summary>
        /// <param name="userName">
        /// userName of current User.
        /// </param>
        public void AddCurrentUser(string userName)
        {
            bool userExists = this._baseService.UserExists(userName);
            System.Console.WriteLine("current", userName);
            GameUserModel user =
                userExists ?
                this._baseService.GetUserByName(userName) :
                new GameUserModel { Name = userName };

            user.CurrentConnectionId = Context.ConnectionId;

            if (userExists)
            {
                this._baseService.UpdateUser(
                    this._baseService.GetUserByName(userName),
                    Constants.Status.ONLINE);
            }
            else
            {
                this._baseService.AddNewUser(user);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            GameUserModel currentUser = this._baseService
                .GetUserByConnection(Context.ConnectionId);

            this._baseService.RemoveUser(currentUser, Context.ConnectionId);
            await this._baseService.LeaveGroupAsync(currentUser, currentUser.GroupName);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
