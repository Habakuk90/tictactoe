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
    public class HubManager<THub, T> : IHubManager<THub, T> where THub : Hub<T> where T : class, IAppHub
    {
        private readonly IUserService<T> _userService;
        private readonly IHubContext<THub, T> _clients;
        private readonly IGroupService<T> _groupService;

        public HubManager(ManagerProperties<THub, T> hubM)
        {
            this._userService = hubM.UserService;
            this._groupService = hubM.GroupService;
            this._clients = hubM.Clients;
        }

        public virtual IHubClients<T> GetClients()
        {
            return this._clients.Clients;
        }

        public virtual async Task UpdateUser(User user)
        {
            user = await this.PrepareUser(user);
            await this._userService.AddOrUpdate(user);
            await this.GetClients().All.UpdateUserList(await this._userService.GetAllUsers());
        }

        public virtual async Task UpdateUser(IList<User> users)
        {
            foreach (var user in users)
            {
                var userTemp = user;
                userTemp = await this.PrepareUser(user);
            }

            await this._userService.AddOrUpdate(users);
            await this.UpdateUserList();
        }

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

            user.ConnectionIds.RemoveAll(x => x.Contains(user.CurrentConnectionId) || string.IsNullOrEmpty(x));

            if (!user.ConnectionIds.Any())
            {
                user.Status = Constants.Status.OFFLINE;
            }

            await this._userService.AddOrUpdate(user);
            //TODOANDI: is there a better way than calling this method everywhere?
            await this.UpdateUserList();
        }

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

        private async Task UpdateUserList()
        {
            await this.GetClients().All.UpdateUserList(await this._userService.GetAllUsers());
        }
    }
}
