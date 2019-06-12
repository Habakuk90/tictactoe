using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    /// <summary>
    /// BaseService 
    /// </summary>
    /// <typeparam name="THub">
    /// <see cref="Hub{T}"/> to be implemented in <see cref="IHubContext{THub, T}"/>
    /// </typeparam>
    /// <typeparam name="T">
    /// <see cref="IBaseHub"/> to be implemented in <see cref="IHubContext{THub, T}"/>
    /// </typeparam>
    public abstract class BaseService : IBaseService
    {
        #region private properties

        #endregion

        public BaseService()
        {
        }

        #region public virtual methods 

        /// <summary>
        /// Join Group for connection and database
        /// </summary>
        /// <param name="user">
        /// User who joins the group.
        /// </param>
        /// <param name="groupName">
        /// The group name
        /// </param>
        public virtual async Task JoinGroupAsync(BaseUser user, string groupName)
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
        public virtual async Task LeaveGroupAsync(BaseUser user, string groupName)
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

        ///// <summary>
        ///// Updates the UserList for all Clients.
        ///// </summary>
        //public virtual async void UpdateUserList()
        //{
        //    IEnumerable<string> userOnline = this.GetOnlineUsers()
        //        .Select(x => x.Name);

        //    await this._baseHub.Clients.All.UpdateUserList(userOnline);
        //}

        #endregion

        #region private methods 
        
        /// <summary>
        /// Applys user changes to DB and for all Clients.
        /// </summary>
        //private void ApplyUserChange()
        //{
        //    this._dbContext.SaveChanges();
        //    this.UpdateUserList();
        //}

        /// <summary>
        /// Applys user changes to DB and for all Clients.
        /// </summary>
        /// <param name="user"></param>
        //private void ApplyUserChange(BaseUser user = null)
        //{
        //    this._dbContext.SaveChanges();
        //    //this.UpdateUserList();
        //}

        #endregion
    }
}
