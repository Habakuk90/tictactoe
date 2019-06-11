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

        public AppUserManager(AppDbContext context, IHubClients<T> clients) : base(context)
        {
            this._clients = clients;
        }

        public override async Task AddOrUpdate(BaseUser item)
        {
            await base.AddOrUpdate(item);

            // todoandi consider updating userobjects to frontend
            IEnumerable<string> userOnline = this.GetAllUsers().Result
                .Select(x => x.Name);

            await this._clients.All.UpdateUserList(userOnline);
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
            var user = await this._context.AppUser.Where(x => x.Name == userName)
                .FirstOrDefaultAsync();

            return user ?? new BaseUser{ ID = Guid.Empty, Name = userName };
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
            // instead of first => by group name || first
            BaseUser userModel = await _context.AppUser.Where(x =>
                x.ConnectionIds.Contains(connectionId)).FirstOrDefaultAsync();

            if (userModel == null)
            {
                return null;
            }

            userModel.CurrentConnectionId = connectionId;
            return userModel;
        }

        public async Task<bool> UserNameExists(string name)
        {
            var userExists = await this._context.AppUser.AnyAsync(x => x.Name == name);

            return userExists;
        }

        private async Task<IEnumerable<BaseUser>> GetAllUsers()
        {
            var allUser = await _context.AppUser.ToListAsync<BaseUser>();

            return allUser;
        }
    }
}