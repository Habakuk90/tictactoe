using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public class AppUserManager<T> : EntityManager<BaseUser> where T : class, IBaseHub
    {
        private readonly AppDbContext _context;
        private readonly IHubClients<T> _clients;

        public AppUserManager(AppDbContext context, IHubClients<T> clients) : base(context)
        {
            this._context = context;
            this._clients = clients;
        }

        public override async void Dispose()
        {
            IEnumerable<string> userOnline = this.GetAllUsers()
                .Select(x => x.Name);

            await this._clients.All.UpdateUserList(userOnline);
            base.Dispose();
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
            return this._context.AppUser.Where(x => x.Name == userName).First() 
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