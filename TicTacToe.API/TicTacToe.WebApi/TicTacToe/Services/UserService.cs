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
    public class UserService : IUserService
    {
        #region private properties

        // somehow it is needed to specify the hub, future build it generic if possible 
        // now HomeHub and UserService have to be open at all times to accept all user changes
        // OR MAYBE not => test pls;
        private readonly IAppUserManager<HomeHub, IHomeHub> _manager;

        #endregion

        public UserService(IAppUserManager<HomeHub, IHomeHub> manager)
        {
            this._manager = manager;
        }

        public virtual async Task<User> GetUser(string name = "", string connectionId = "")
        {
            User user = null;

            if (!string.IsNullOrEmpty(name))
            {
                user = await this._manager.GetUserByName(name);
            }

            if (user == null && !string.IsNullOrEmpty(connectionId))
            {
                user = await this._manager.GetUserByConnection(connectionId);
            }

            return user;
        }

        /// <summary>
        /// Removes all connection ID's and sets <see cref="User"/> as offline
        /// </summary>
        /// <param name="user">
        /// User which should be removed.
        /// </param>
        /// <param name="currentConnectionId">
        /// current connection Id of user which should be removed.
        /// </param>
        public async Task RemoveUser(string connectionId)
        {
            User user = await this._manager.GetUserByConnection(connectionId);

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
        /// <see cref="User"/> which should be updated in DB.
        /// </param>
        /// <param name="status">
        /// Status <see cref="Constants.Status"/> of user.
        /// </param>
        public async Task UpdateUser(User user)
        {
            var status = user.Status;
            var connectionId = user.CurrentConnectionId;
            User dbUser = await this.GetUser(name: user.Name);

            if (dbUser != null)
            {
                user = dbUser;
                user.IsAnonymous = false;
            }

            user.ConnectionIds.Add(connectionId);
            user.ConnectionIds = user.ConnectionIds.Distinct().ToList();
            user.CurrentConnectionId = connectionId;
            user.Status = status;

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
        public virtual async Task UpdateUser(ICollection<User> users, string status)
        {
            foreach (User user in users)
            {
                await this.UpdateUser(user);
            }
        }
    }
}

public static class Extensions
{
    //Consider Using this
    public static void CopyPropertiesTo<T, TU>(this T source, TU dest)
    {
        var sourceProps = typeof(T).GetProperties().Where(x => x.CanRead).ToList();
        var destProps = typeof(TU).GetProperties()
                .Where(x => x.CanWrite)
                .ToList();

        foreach (var sourceProp in sourceProps)
        {
            if (destProps.Any(x => x.Name == sourceProp.Name))
            {
                var p = destProps.First(x => x.Name == sourceProp.Name);
                if (p.CanWrite)
                { // check if the property can be set or no.
                    p.SetValue(dest, sourceProp.GetValue(source, null), null);
                }
            }

        }

    }
}
