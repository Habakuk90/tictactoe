using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class UserService : BaseService, IUserService
    {
        #region private properties

        // somehow it is needed to specify the hub, future build it generic if possible 
        // now HomeHub and UserService have to be open at all times to accept all user changes
        // OR MAYBE not => test pls;
        private readonly IAppUserManager<HomeHub, IHomeHub> _manager;
        public BaseUser _currentUser;


        #endregion

        public UserService(
            IAppUserManager<HomeHub, IHomeHub> manager)
        {
            this._manager = manager;
            // TODOANDI: fix workaround
            //this._manager = new AppUserManager<IBaseHub>(factory, hub.Clients);
        }

        public virtual async Task<BaseUser> GetUser(string name = "", string connectionId = "")
        {
            BaseUser user = new BaseUser
            {
                Name = name,
                CurrentConnectionId = connectionId
            };

            if (!string.IsNullOrEmpty(connectionId))
            {
                user = await this._manager.GetUserByConnection(connectionId);
            }

            if (user == null && !string.IsNullOrEmpty(user.Name))
            {
                user = await this._manager.GetUserByName(user.Name);
            }

            return user;
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
        public async Task RemoveUser(string connectionId)
        {
            BaseUser user = this._manager.GetUserByConnection(connectionId).Result;

            if (user == null)
            {
                throw new Exception($"Couldn\'t Remove User with ConnectionId: {connectionId}");
            }

            if (user.IsAnonymous)
            {
                //this._logger.LogInformation($"Removed {user.Name} from DB, since he is Anonymous");
                await this._manager.Remove(user);
                return;
            }

            user.ConnectionIds.RemoveAll(x => x.Contains(user.CurrentConnectionId));

            if (!user.ConnectionIds.Any())
            {
                user.Status = Constants.Status.OFFLINE;
            }

            await _manager.AddOrUpdate(user);
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
        public async Task UpdateUser(BaseUser user)
        {
            var connectionId = user.CurrentConnectionId;
            BaseUser dbUser = await this.GetUser(name: user.Name);

            if (!dbUser.ID.Equals(Guid.Empty))
            {
                user = dbUser;
                dbUser.IsAnonymous = false;
            }

            user.ConnectionIds.Add(connectionId);
            user.ConnectionIds = user.ConnectionIds.Distinct().ToList();
            user.CurrentConnectionId = connectionId;
            await _manager.AddOrUpdate(user);
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
        public virtual async Task UpdateUser(ICollection<BaseUser> users, string status)
        {
            foreach (BaseUser user in users)
            {
                await this.UpdateUser(user);
            }
        }
    }
}
