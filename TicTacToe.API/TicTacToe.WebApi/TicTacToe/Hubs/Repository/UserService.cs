using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    /// <summary>
    /// Access to 
    /// </summary>
    public class GameUserService : IUserService
    {
        #region private properties

        private AppDbContext _context;
        private IHubContext<GameHub, IGameHub> _gameHub;

        #endregion

        public GameUserService(
            AppDbContext context,
            IHubContext<GameHub, IGameHub> gameHub)
        {
            this._context = context;
            this._gameHub = gameHub;
        }

        public GameUserModel GetUserByConnection(string connectionId)
        {
            // instead of first => by group name || first
            GameUserModel userModel = _context.AppUser.Where(x =>
                x.ConnectionIds.Contains(connectionId)).FirstOrDefault();

            if (userModel == null)
            {
                throw new Exception("no user found");
            }
            
            userModel.CurrentConnectionId = connectionId;
            return userModel;

        }
        
        public GameUserModel GetUserByName(string userName)
        {
            GameUserModel userModel = _context.AppUser
                .FirstOrDefault(x => x.Name == userName);

            if (userModel == null)
            {
                throw new Exception("user not found");
            }

            return userModel;
        }

        public bool UserExists(string userName)
        {
            return _context.AppUser.Any(x => x.Name == userName);
        }

        public void AddNewUser(GameUserModel user)
        {
            _context.AppUser.Add(user);
            user.Status = Constants.Status.ONLINE;
            user.ConnectionIds.Add(user.CurrentConnectionId);
            this.ApplyUserChange();
        }

        public void UpdateUser(GameUserModel user, string status)
        {
            user.Status = status;
            user.ConnectionIds.Add(user.CurrentConnectionId);
            user.ConnectionIds.Distinct();
            _context.AppUser.Update(user);
            this.ApplyUserChange();
        }

        public void UpdateUser(ICollection<GameUserModel> userModelList, string status)
        {
            foreach (GameUserModel userModel in userModelList)
            {
                this.UpdateUser(userModel, status);
            }
        }

        public void RemoveUser(GameUserModel currentUser, string currentConnectionId)
        {
            if (currentUser == null || currentUser.ConnectionIds == null) return;
            // FIXME: Multiple Connections for one user should be possible
            currentUser.ConnectionIds.RemoveAll(conn => conn == currentConnectionId);
            currentUser.Status = Constants.Status.OFFLINE;

            this.ApplyUserChange();
        }

        /// <summary>
        /// Invoke Update current Online Users to all
        /// </summary>
        /// <clientMethod>UpdateUserList</clientMethod>
        public async void UpdateUserList()
        {
            IEnumerable<string> userOnline = this.GetOnlineUsers()
                .Select(x => x.Name);

            await this._gameHub.Clients.All.UpdateUserList(userOnline);
        }

        #region private methods 

        private IEnumerable<GameUserModel> GetOnlineUsers()
        {
            return _context.AppUser.Where(x => x.Status == Constants.Status.ONLINE);
        }

        private void ApplyUserChange()
        {
            this._context.SaveChanges();
            this.UpdateUserList();
        }
        #endregion
    }
}
