using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class AppGroupManager<THub, T> : EntityManager<Group>, IAppGroupManager<THub, T> where THub : Hub<T> where T : class, IAppHub
    {
        private readonly IHubContext<THub, T> _hub;

        public AppGroupManager(AppDbContext context, IHubContext<THub, T> hub) : base(context)
        {
            this._hub = hub;
        }


        /// <summary>
        /// Join Group for connection and database
        /// </summary>
        /// <param name="user">
        /// User who joins the group.
        /// </param>
        /// <param name="groupName">
        /// The group name
        /// </param>
        public virtual async Task JoinGroupAsync(User user, string groupName)
        {
            //user.GroupName = groupName;
            //TODoandi
            //await this._baseHub.Groups
            //    .AddToGroupAsync(user.CurrentConnectionId, groupName);

            //this.ApplyUserChange();
        }

        /// <summary>
        /// Leave Group for connection and database.
        /// </summary>
        /// <param name="user">
        /// User who leaves the group.
        /// </param>
        /// <param name="groupName">
        /// Group name which will be left.
        /// </param>
        public virtual async Task LeaveGroupAsync(User user, string groupName)
        {
            // TODoandi
            //if (!string.IsNullOrWhiteSpace(user.GroupName))
            //{
            //    await _baseHub.Groups
            //        .RemoveFromGroupAsync(user.CurrentConnectionId, groupName);

            //    user.GroupName = string.Empty;
            //}

            //this.ApplyUserChange(user);
            //_dbContext.Attach(user);
            //_dbContext.SaveChanges();
        }
    }
}
