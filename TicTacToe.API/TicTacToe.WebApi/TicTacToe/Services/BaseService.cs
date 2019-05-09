using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public abstract class BaseService<THub, T> : IBaseService where THub : Hub<T> where T : class, IBaseHub
    {
        #region private properties

        private readonly AppDbContext _context;
        private readonly IHubContext<THub, T> _baseHub;

        #endregion

        public BaseService(AppDbContext context, IHubContext<THub, T> baseHub)
        {
            this._context = context;
            this._baseHub = baseHub;
        }

        #region public virtual methods 

        /// <summary>
        /// Adds new User to DB.
        /// </summary>
        /// <param name="user">
        /// <see cref="GameUserModel"/> to be added into DB.
        /// </param>
        public virtual void AddNewUser(GameUserModel user)
        {
            _context.AppUser.Add(user);
            user.Status = Constants.Status.ONLINE;
            user.ConnectionIds.Add(user.CurrentConnectionId);
            this.ApplyUserChange();
        }

        /// <summary>
        /// Gets user by connection from DB.
        /// </summary>
        /// <param name="connectionId">
        /// connection ID which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="GameUserModel"/> in DB with given connectionID.
        /// </returns>
        public virtual GameUserModel GetUserByConnection(string connectionId)
        {
            // instead of first => by group name || first
            GameUserModel userModel = _context.AppUser.Where(x =>
                x.ConnectionIds.Contains(connectionId)).FirstOrDefault();

            if (userModel == null)
            {
                throw new Exception("no user found");
            }

            userModel.CurrentConnectionId = connectionId;
            return userModel;
        }

        /// <summary>
        /// Gets user by name from DB.
        /// </summary>
        /// <param name="userName">
        /// username which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="GameUserModel"/> in DB with given userName.
        public virtual GameUserModel GetUserByName(string userName)
        {
            GameUserModel userModel = _context.AppUser
                .FirstOrDefault(x => x.Name == userName);

            if (userModel == null)
            {
                throw new Exception("user not found");
            }

            return userModel;
        }

        /// <summary>
        /// Removes all connection ID's and sets <see cref="GameUserModel"/> as offline
        /// </summary>
        /// <param name="user">
        /// User which should be removed.
        /// </param>
        /// <param name="currentConnectionId">
        /// current connection Id of user which should be removed.
        /// </param>
        public virtual void RemoveUser(GameUserModel user, string currentConnectionId)
        {
            if (user == null || user.ConnectionIds == null) return;
            // FIXME: Multiple Connections for one user should be possible
            user.ConnectionIds.RemoveAll(conn => conn == currentConnectionId);
            user.Status = Constants.Status.OFFLINE;

            this.ApplyUserChange();
        }

        /// <summary>
        /// Updates user in DB.
        /// </summary>
        /// <param name="user">
        /// <see cref="GameUserModel"/> which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// Status <see cref="Constants.Status"/> of user.
        /// </param>
        public virtual void UpdateUser(GameUserModel user, string status)
        {
            user.Status = status;
            user.ConnectionIds.Add(user.CurrentConnectionId);
            user.ConnectionIds = user.ConnectionIds.Distinct().ToList();
            _context.AppUser.Update(user);
            this.ApplyUserChange();
        }

        /// <summary>
        /// Updates list of user in DB.
        /// </summary>
        /// <param name="users">
        /// Collection of user which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// <see cref="Constants.Status"/> of users.
        /// </param>
        public virtual void UpdateUser(ICollection<GameUserModel> users, string status)
        {
            foreach (GameUserModel userModel in users)
            {
                this.UpdateUser(userModel, status);
            }
        }

        /// <summary>
        /// Checks if User exists in DB.
        /// </summary>
        /// <param name="userName">
        /// Given name of user to check.
        /// </param>
        /// <returns>
        /// Whether user exists in DB or not.
        /// </returns>
        public virtual bool UserExists(string userName)
        {
            return _context.AppUser.Any(x => x.Name == userName);
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
        public virtual async Task JoinGroupAsync(GameUserModel user, string groupName)
        {
            user.GroupName = groupName;
            await this._baseHub.Groups
                .AddToGroupAsync(user.CurrentConnectionId, groupName);
            _context.SaveChanges();
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
        public virtual async Task LeaveGroupAsync(GameUserModel user, string groupName)
        {
            user.GroupName = groupName;
            if (!string.IsNullOrWhiteSpace(user.GroupName))
            {
                await _baseHub.Groups
                    .RemoveFromGroupAsync(user.CurrentConnectionId, groupName);

                user.GroupName = string.Empty;
            }

            _context.Attach(user);
            _context.SaveChanges();
        }

        /// <summary>
        /// Updates the UserList for all Clients.
        /// </summary>
        public virtual async void UpdateUserList()
        {
            IEnumerable<string> userOnline = this.GetOnlineUsers()
                .Select(x => x.Name);

            await this._baseHub.Clients.All.UpdateUserList(userOnline);
        }

        #endregion

        #region private methods 

        /// <summary>
        /// Gets all Online users in app.
        /// </summary>
        /// <returns>
        /// List of <see cref="GameUserModel"/> with status "online".
        /// </returns>
        private IEnumerable<GameUserModel> GetOnlineUsers()
        {
            return _context.AppUser.Where(x => x.Status == Constants.Status.ONLINE);
        }

        /// <summary>
        /// Applys user changes to DB and for all Clients.
        /// </summary>
        private void ApplyUserChange()
        {
            this._context.SaveChanges();
            this.UpdateUserList();
        }

        #endregion
    }
}
