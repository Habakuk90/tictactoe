using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Manager
{
    /// <summary>
    /// Represents a Hubmanager which will handle users and groups inside the app.
    /// </summary>
    /// <typeparam name="THub">
    /// Object which inherit from <see cref="AppHub{T}"
    /// </typeparam>
    /// <typeparam name="T">
    /// Interfaces which inherit from <see cref="IAppClient"/> .
    /// </typeparam>
    public class HubManager<THub, T> : IHubManager<THub, T> where THub : Hub<T> where T : class, IAppClient
    {
        #region private properties

        private readonly IUserService<T> _userService;
        private readonly IHubContext<THub, T> _clients;
        private readonly IGroupService<T> _groupService;

        #endregion

        public HubManager(ManagerProperties<THub, T> hubM)
        {
            this._userService = hubM.UserService;
            this._groupService = hubM.GroupService;
            this._clients = hubM.Clients;
        }

        /// <summary>
        /// Get the <see cref="IHubClients{T}"/> object of the current <see cref="IHubContext{THub, T}"/>
        /// </summary>
        /// <returns>
        /// <see cref="IHubClients{T}"/> object of the current websocket hub connection
        /// </returns>
        public virtual IHubClients<T> GetClients()
        {
            return this._clients.Clients;
        }

        /// <summary>
        /// Add or updates user in Database.
        /// </summary>
        /// <param name="user">
        /// <see cref="User"/> which should be added or updated.
        /// </param>
        /// <returns>
        /// <see cref="Task"/>
        /// </returns>
        public virtual async Task UpdateUser(User user)
        {
            user = await this.PrepareUser(user);
            await this._userService.AddOrUpdate(user);
            await this.GetClients().All.UpdateUserList(await this._userService.GetAllUsers());
        }

        /// <summary>
        /// Adds or updates a <see cref="IList{User}"/> in the database.
        /// </summary>
        /// <param name="users">
        /// List of users which should be updated.
        /// </param>
        /// <returns>
        /// <see cref="Task"/>
        /// </returns>
        public virtual async Task UpdateUser(IList<User> users)
        {
            foreach (var user in users)
            {
                var userTemp = user;
                userTemp = await this.PrepareUser(user);
            }

            // one call for database and one call for clients, improve?
            await this._userService.AddOrUpdate(users);
            await this.UpdateUserList();
        }

        /// <summary>
        /// Removes <see cref="User"/> from Database. If the user is not anonymous then if not the last connectionId of user.
        /// Remove only the connectionId of the user.
        /// </summary>
        /// <param name="connectionId">
        /// Given connectionId of user which should be removed.
        /// </param>
        /// <returns>
        /// <see cref="Task"/>
        /// </returns>
        public virtual async Task RemoveUser(string connectionId)
        {
            User user = await this.GetUser(connectionId: connectionId);

            if (user == null)
            {
                throw new Exception($"Couldn\'t Remove User with ConnectionId: {connectionId}");
            }

            if (user.IsAnonymous)
            {
                //this._logger.LogInformation($"Removed {user.Name} from DB, since he is Anonymous");
                await this._userService.Remove(user);
                await this.UpdateUserList();
                return;
            }

            // this seems buggy please verify
            user.ConnectionIds.RemoveAll(x => x.Contains(user.CurrentConnectionId) || string.IsNullOrEmpty(x));

            if (!user.ConnectionIds.Any())
            {
                user.Status = Constants.Status.OFFLINE;
            }

            await this._userService.AddOrUpdate(user);
            await this.UpdateUserList();
        }

        /// <summary>
        /// Gets the user from DB either by name or connectionId.
        /// If name given user is searched by for name.
        /// </summary>
        /// <param name="name">
        /// Given name of the user which should be searched for.
        /// </param>
        /// <param name="connectionId">
        /// Given connetionId of the user which should be searched for.
        /// </param>
        /// <returns>
        /// <see cref="Task{User}"/> the user or null;
        /// </returns>
        public async Task<User> GetUser(string name = "", string connectionId = "")
        {
            User user = null;

            if (!string.IsNullOrEmpty(name))
            {
                user = await this._userService.GetUserByName(name);
            }

            if (user == null && !string.IsNullOrEmpty(connectionId))
            {
                user = await this._userService.GetUserByConnection(connectionId);
            }

            return user;
        }


        /// <summary>
        /// Updates userlist for all clients.
        /// </summary>
        /// <returns>
        /// <see cref="Task"/>
        /// </returns>
        private async Task UpdateUserList()
        {
            await this.GetClients().All.UpdateUserList(await this._userService.GetAllUsers());
        }

        /// <summary>
        /// Given User joins given or new Group
        /// </summary>
        /// <param name="user">
        /// The User which should be added to the group
        /// </param>
        /// <param name="groupName">
        /// The groupname which should be joined
        /// </param>
        /// <returns>
        /// <see cref="Task"/>
        /// </returns>
        public async Task JoinGroup(User user, string groupName)
        {
            Group group = new Group
            {
                Name = groupName
            };

            Group dbGroup = await this._groupService.GetGroupByName(groupName);

            if (dbGroup != null)
            {
                group = dbGroup;    
            }

            await this._groupService.JoinGroupAsync(user, group);
            await this._clients.Groups.AddToGroupAsync(user.CurrentConnectionId, group.Name);
        }

        /// <summary>
        /// Given user leaves given Group
        /// </summary>
        /// <param name="user">
        /// The User which should leave the group.
        /// </param>
        /// <param name="groupName">
        /// Name of the group which should be left.
        /// </param>
        /// <returns></returns>
        public async Task LeaveGroup(User user, string groupName)
        {
            Group group = await this.PrepareGroup(groupName);
            await this._groupService.LeaveGroupAsync(user, group);
            await this._clients.Groups.RemoveFromGroupAsync(user.CurrentConnectionId, group.Name);

        }

        /// <summary>
        /// Prepare user for add or update.
        /// </summary>
        /// <param name="user">
        /// <see cref="User"/> which should be prepared.
        /// </param>
        /// <returns>
        /// The prepared <see cref="User"/>
        /// </returns>
        private async Task<User> PrepareUser(User user)
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

            return user;
        }

        /// <summary>
        /// Prepare the group which should be joined or left.
        /// </summary>
        /// <param name="groupName">
        /// Name of the Group
        /// </param>
        /// <returns>
        /// <see cref="Task{Group}"/>
        /// </returns>
        private async Task<Group> PrepareGroup(string groupName)
        {
            Group group = new Group
            {
                Name = groupName
            };

            Group dbGroup = await this._groupService.GetGroupByName(groupName);

            if (dbGroup != null)
            {
                group = dbGroup;
            }

            return group;
        }
    }
    public static class UserExtensions
    {
        public static bool IsOnline(this User user)
        {
            return false;
        }
    }
}