using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Services
{
    public abstract class BaseService<THub, T> : IBaseService where THub : Hub<T> where T : class, IBaseHub
    {
        #region private properties

        private readonly AppDbContext _context;
        private readonly IHubContext<THub, T> _baseHub;

        #endregion

        public BaseService(AppDbContext context, IHubContext<THub, T> baseHub)
        {
            this._context = context;
            this._baseHub = baseHub;
        }

        #region public virtual methods 

        public virtual void AddNewUser(GameUserModel user)
        {
            _context.AppUser.Add(user);
            user.Status = Constants.Status.ONLINE;
            user.ConnectionIds.Add(user.CurrentConnectionId);
            this.ApplyUserChange();
        }

        public virtual GameUserModel GetUserByConnection(string connectionId)
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

        public virtual GameUserModel GetUserByName(string userName)
        {
            GameUserModel userModel = _context.AppUser
                .FirstOrDefault(x => x.Name == userName);

            if (userModel == null)
            {
                throw new Exception("user not found");
            }

            return userModel;
        }

        public virtual void RemoveUser(GameUserModel user, string currentConnectionId)
        {
            if (user == null || user.ConnectionIds == null) return;
            // FIXME: Multiple Connections for one user should be possible
            user.ConnectionIds.RemoveAll(conn => conn == currentConnectionId);
            user.Status = Constants.Status.OFFLINE;

            this.ApplyUserChange();
        }

        public virtual void UpdateUser(GameUserModel user, string status)
        {
            user.Status = status;
            user.ConnectionIds.Add(user.CurrentConnectionId);
            user.ConnectionIds = user.ConnectionIds.Distinct().ToList();
            _context.AppUser.Update(user);
            this.ApplyUserChange();
        }

        public virtual void UpdateUser(ICollection<GameUserModel> users, string status)
        {
            foreach (GameUserModel userModel in users)
            {
                this.UpdateUser(userModel, status);
            }
        }

        public virtual bool UserExists(string userName)
        {
            return _context.AppUser.Any(x => x.Name == userName);
        }

        public virtual async Task JoinGroupAsync(GameUserModel user, string groupName)
        {
            user.GroupName = groupName;
            await this._baseHub.Groups
                .AddToGroupAsync(user.CurrentConnectionId, groupName);
            _context.SaveChanges();
        }

        public virtual async Task LeaveGroupAsync(GameUserModel user, string groupName)
        {
            user.GroupName = groupName;
            if (!string.IsNullOrWhiteSpace(user.GroupName))
            {
                await _baseHub.Groups
                    .RemoveFromGroupAsync(user.CurrentConnectionId, groupName);

                user.GroupName = string.Empty;
            }

            _context.Attach(user);
            _context.SaveChanges();
        }

        public virtual async void UpdateUserList()
        {
            IEnumerable<string> userOnline = this.GetOnlineUsers()
                .Select(x => x.Name);

            await this._baseHub.Clients.All.UpdateUserList(userOnline);
        }

        #endregion

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
