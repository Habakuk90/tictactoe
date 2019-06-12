using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class AppUserManager<THub, T> : EntityManager<User>, IAppUserManager<THub, T> where THub : Hub<T> where T : class, IAppHub
    {
        private readonly IHubContext<THub, T> _hub;

        public AppUserManager(AppDbContext context, IHubContext<THub, T> hub) : base(context)
        {
            this._hub = hub;
        }

        public override async Task AddOrUpdate(User item)
        {
            await base.AddOrUpdate(item);

            // todoandi consider updating userobjects to frontend
            IEnumerable<User> userOnline = await this.GetAllUsers();

            await this._hub.Clients.All.UpdateUserList(userOnline);
        }

        /// <summary>
        /// Gets user by name from DB.
        /// </summary>
        /// <param name="userName">
        /// username which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="User"/> in DB with given userName.
        public async Task<User> GetUserByName(string userName)
        {
            User user;

            user = await _context.AppUser.Where(x => x.Name == userName)
                .FirstOrDefaultAsync();

            return user;
        }

        /// <summary>
        /// Gets user by connection from DB.
        /// </summary>
        /// <param name="connectionId">
        /// connection ID which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="User"/> in DB with given connectionID or NULL if no user was found.
        /// </returns>
        public async Task<User> GetUserByConnection(string connectionId)
        {
            User user;

            // instead of first => by group name || first
            user = await _context.AppUser.Where(x =>
                x.ConnectionIds.Contains(connectionId)).FirstOrDefaultAsync();

            if (user != null)
            {
                user.CurrentConnectionId = connectionId;
            }

            return user;
        }

        public async Task<bool> UserNameExists(string name)
        {
            bool exists = false;

            exists = await _context.AppUser.AnyAsync(x => x.Name == name);
            return exists;
        }

        private async Task<IEnumerable<User>> GetAllUsers()
        {
            IEnumerable<User> allUser;

            allUser = await _context.AppUser.ToListAsync<User>();

            return allUser;
        }
    }
}