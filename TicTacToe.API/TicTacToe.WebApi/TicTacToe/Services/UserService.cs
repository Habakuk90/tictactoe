using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class UserService : BaseService<BaseHub<IBaseHub>, IBaseHub>, IUserService
    {
        #region private properties

        private AppDbContext _context;
        private IHubContext<BaseHub<IBaseHub>, IBaseHub> _hub;

        public BaseUser _currentUser;

        #endregion

        public UserService(
            AppDbContext context,
            IHubContext<BaseHub<IBaseHub>, IBaseHub> hub)
            : base(context, hub)
        {
            this._context = context;
            this._hub = hub;
        }

        public virtual BaseUser GetUserByConnection(string connectionId)
        {
            // instead of first => by group name || first
            BaseUser userModel = _context.AppUser.Where(x =>
                x.ConnectionIds.Contains(connectionId)).FirstOrDefault();

            if (userModel == null)
            {
                return null;
            }

            userModel.CurrentConnectionId = connectionId;
            return userModel;
        }

        public virtual BaseUser GetUserByName(string userName)
        {
            BaseUser userModel = _context.AppUser
                .FirstOrDefault(x => x.Name == userName);

            return userModel;
        }

        /// <summary>
        /// Removes all connection ID's and sets <see cref="BaseUser"/> as offline
        /// </summary>
        /// <param name="user">
        /// User which should be removed.
        /// </param>
        /// <param name="currentConnectionId">
        /// current connection Id of user which should be removed.
        /// </param>
        public void RemoveUser(BaseUser user)
        {
            var manager = new
                AppUserManager<IBaseHub>(this._context, this._hub.Clients);

            using (manager)
            {
                if (user.isAnonymous)
                {
                    manager.Remove(user);
                }
                
                // #9: Multiple Connections for one user should be possible
                user.ConnectionIds.Remove(user.CurrentConnectionId);
                if (!user.ConnectionIds.Any())
                {
                    user.Status = Constants.Status.OFFLINE;
                }

                manager.AddOrUpdate(user);
            }
        }

        /// <summary>
        /// Updates user in DB.
        /// </summary>
        /// <param name="user">
        /// <see cref="BaseUser"/> which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// Status <see cref="Constants.Status"/> of user.
        /// </param>

        //public BaseUser UpdateUser(string userName, string connectionId, string status)
        public BaseUser UpdateUser(BaseUser user)
        {
            var manager = new
                AppUserManager<IBaseHub>(this._context, this._hub.Clients);

            using (manager)
            {
                BaseUser dbUser = manager.GetUserByName(user.Name);

                if (!dbUser.ID.Equals(Guid.Empty))
                {
                    user = dbUser;
                    dbUser.isAnonymous = false;
                }

                user.ConnectionIds.Add(user.CurrentConnectionId);
                user.ConnectionIds = user.ConnectionIds.Distinct().ToList();

                base.AddOrUpdate<BaseUser>(user);
            }

            return user;
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
        public virtual void UpdateUser(ICollection<BaseUser> users, string status)
        {
            foreach (BaseUser userModel in users)
            {
                //this.UpdateUser(userModel, status);
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
    }
}
