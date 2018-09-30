using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public class GameUserService : IGameUserService
    {
        private AppDbContext _context;

        public GameUserService(AppDbContext context)
        {
            _context = context;
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

        public IEnumerable<string> GetConnectionIds(string userName)
        {
            List<string> connectionIds =
                _context.AppUser.FirstOrDefault(x => x.Name == userName).ConnectionIds;

            return connectionIds;
        }

        public GameUserModel GetUserByName(string userName)
        {
            GameUserModel userModel = _context.AppUser.FirstOrDefault(x => x.Name == userName);

            // meh, [TODO]
            if (userModel == null) return new GameUserModel { Name = "NotFound", Status = Constants.Status.Offline };

            return userModel;
        }

        public IQueryable<GameUserModel> GetOnlineUsers()
        {
            return _context.AppUser.Where(x => x.Status == Constants.Status.Online);
        }

        public void AddNewUser(string userName, string connectionId)
        {
            GameUserModel userModel = _context.AppUser.Where(x => x.Name == userName).FirstOrDefault();

            if (userModel != null)
            {
                _context.AppUser.Attach(userModel);
                userModel.ConnectionIds.Add(connectionId);
            }
            else
            {
                userModel = new GameUserModel
                {
                    Name = userName
                };
                userModel.ConnectionIds.Add(connectionId);
                _context.AppUser.Add(userModel);

            }
            userModel.Status = Constants.Status.Online;
            userModel.ConnectionIds = userModel.ConnectionIds.Distinct().ToList();
            _context.SaveChanges();
        }

        public void UpdateUser(GameUserModel userModel, string status)
        {
            userModel.Status = status;
            _context.AppUser.Update(userModel);
            _context.SaveChanges();
        }

        public void UpdateUser(ICollection<GameUserModel> userModelList, string status)
        {
            foreach (GameUserModel userModel in userModelList)
            {
                userModel.ConnectionIds.Distinct();
                userModel.Status = status;
                _context.AppUser.Update(userModel);
            }
            _context.SaveChanges();
        }

        public void RemoveUser(GameUserModel currentUser, string currentConnectionId)
        {
            if (currentUser == null || currentUser.ConnectionIds == null) return;
            currentUser.ConnectionIds.RemoveAll(conn => conn == currentConnectionId);
            currentUser.Status = Constants.Status.Offline;

            _context.SaveChanges();
        }

        public void RemoveUser(string userName)
        {
            GameUserModel currentUser = this.GetUserByName(userName);
            if (currentUser == null) return;

            _context.AppUser.Remove(currentUser);
            _context.SaveChanges();
        }
    }
}
