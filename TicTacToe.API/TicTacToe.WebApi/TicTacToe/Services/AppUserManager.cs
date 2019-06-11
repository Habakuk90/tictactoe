using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class AppUserManager<T> : EntityManager<BaseUser> where T : class, IBaseHub
    {
        //private readonly AppDbContext _context;
        private readonly IHubClients<T> _clients;

        public AppUserManager(AppDbContext context, IHubClients<T> clients) : base(context)
        {
            //this._context = context;
            this._clients = clients;
        }

        public override async Task AddOrUpdate(BaseUser item)
        {
            // todoandi consider updating userobjects to frontend
            IEnumerable<string> userOnline = this.GetAllUsers()
                .Select(x => x.Name);

            await this._clients.All.UpdateUserList(userOnline);

            await base.AddOrUpdate(item);
        }

        /// <summary>
        /// Gets user by name from DB.
        /// </summary>
        /// <param name="userName">
        /// username which should be searched by in DB.
        /// </param>
        /// <returns>
        /// <see cref="BaseUser"/> in DB with given userName.
        public BaseUser GetUserByName(string userName)
        {
            return this._context.AppUser.Where(x => x.Name == userName).FirstOrDefaultAsync().Result 
                ?? new BaseUser{ ID = Guid.Empty, Name = userName };
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

        public bool UserNameExists(string name)
        {
            return this._context.AppUser.Any(x => x.Name == name);
        }

        private IEnumerable<BaseUser> GetAllUsers()
        {
            return _context.AppUser.ToList();
        }
    }
}