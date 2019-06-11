using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class AppUserManager<T> : EntityManager<BaseUser> where T : class, IBaseHub
    {
        private readonly IHubClients<T> _clients;

        public AppUserManager(IAppDbContextFactory<AppDbContext> factory, IHubClients<T> clients) : base(factory)
        {
            this._clients = clients;
        }

        public override async Task AddOrUpdate(BaseUser item)
        {
            await base.AddOrUpdate(item);

            // todoandi consider updating userobjects to frontend
            IEnumerable<BaseUser> userOnline = await this.GetAllUsers();

            await this._clients.All.UpdateUserList(userOnline.Select(user => user.Name));
        }

        /// <summary>
        /// Gets user by name from DB.
        /// </summary>
        /// <param name="userName">
        /// username which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="BaseUser"/> in DB with given userName.
        public async Task<BaseUser> GetUserByName(string userName)
        {
            BaseUser user;

            using (var context = this._factory.CreateDbContext())
            {
                user = await context.AppUser.Where(x => x.Name == userName)
                    .FirstOrDefaultAsync();

            }
            return user ?? new BaseUser { ID = Guid.Empty, Name = userName };
        }

        /// <summary>
        /// Gets user by connection from DB.
        /// </summary>
        /// <param name="connectionId">
        /// connection ID which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="BaseUser"/> in DB with given connectionID or NULL if no user was found.
        /// </returns>
        public async Task<BaseUser> GetUserByConnection(string connectionId)
        {
            BaseUser user;

            using (var context = this._factory.CreateDbContext())
            {
                // instead of first => by group name || first
                user = await context.AppUser.Where(x =>
                    x.ConnectionIds.Contains(connectionId)).FirstOrDefaultAsync();

                if (user != null)
                {
                    user.CurrentConnectionId = connectionId;
                }
            }
            return user ?? new BaseUser { ID = Guid.Empty, CurrentConnectionId = connectionId };
        }

        public async Task<bool> UserNameExists(string name)
        {
            bool exists = false;

            using (var context = this._factory.CreateDbContext())
            {
                exists = await context.AppUser.AnyAsync(x => x.Name == name);
            }
            return exists;
        }

        private async Task<IEnumerable<BaseUser>> GetAllUsers()
        {
            IEnumerable<BaseUser> allUser;

            using (var context = this._factory.CreateDbContext())
            {
                allUser = await context.AppUser.ToListAsync<BaseUser>();
            }

            return allUser;
        }
    }
}