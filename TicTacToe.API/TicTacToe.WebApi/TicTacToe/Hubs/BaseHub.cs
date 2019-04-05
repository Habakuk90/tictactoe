namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    using System;
    using System.Threading.Tasks;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Models;
    using global::TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
    using global::TicTacToe.WebApi.TicTacToe.Services.Interfaces;
    using Microsoft.AspNetCore.SignalR;

    public class BaseHub<T> : Hub<T> where T : class, IBaseHub
    {
        public IGroupService _groupService
        {
            get;
            set;
        }

        public IUserService _userserService
        {
            get;
            set;
        }
        public BaseHub(IUserService userService,
            IGroupService groupService)
        {
            this._userserService = userService;
            this._groupService = groupService;
        }


        /// <summary>
        /// Join Group after a challenge happend
        /// </summary>
        /// <param name="enemyName">User who got challenged</param>
        /// <param name="groupName">represents as currentUserName + enemyUserName</param>
        /// <returns></returns>
        public void JoinGroup(string groupName)
        {
            GameUserModel currentUser = this._userserService
                .GetUserByConnection(Context.ConnectionId);

            if (currentUser.GroupName == groupName)
            {
                this._groupService.LeaveGroupAsync(currentUser, groupName);
            }

            this._groupService.JoinGroupAsync(currentUser, groupName);
            this._userserService.UpdateUserList();
        }


        public void LeaveGroup(string groupName)
        {
            GameUserModel currentUser = this._userserService
                .GetUserByConnection(Context.ConnectionId);

            this._groupService.LeaveGroupAsync(currentUser, groupName);
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
            GameUserModel currentUser = this._userserService
                .GetUserByConnection(Context.ConnectionId);

            this._userserService.RemoveUser(currentUser, Context.ConnectionId);
            await this._groupService.LeaveGroupAsync(currentUser, currentUser.GroupName);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
