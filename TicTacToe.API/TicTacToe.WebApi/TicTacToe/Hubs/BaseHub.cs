namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    using System;
    using System.Threading.Tasks;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Models;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Services.Interfaces;
    using Microsoft.AspNetCore.SignalR;

    public abstract class BaseHub<T> : Hub<T> where T : class, IBaseHub
    {
        private readonly IBaseService _baseService;

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
        public void JoinGroup(string groupName)
        {
            GameUserModel currentUser = this._baseService
                .GetUserByConnection(Context.ConnectionId);

            if (currentUser.GroupName == groupName)
            {
                this._baseService.LeaveGroupAsync(currentUser, groupName);
            }

            this._baseService.JoinGroupAsync(currentUser, groupName);
            this._baseService.UpdateUserList();
        }


        public void LeaveGroup(string groupName)
        {
            GameUserModel currentUser = this._baseService
                .GetUserByConnection(Context.ConnectionId);

            this._baseService.LeaveGroupAsync(currentUser, groupName);
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
