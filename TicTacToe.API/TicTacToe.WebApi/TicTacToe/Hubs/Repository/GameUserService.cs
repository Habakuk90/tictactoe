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
            return _context.AppUser.FirstOrDefault(x
             => x.ConnectionIds.Any(y => y.Contains(connectionId)));
        }

        public ICollection<string> GetConnections(string userName)
        {
            ICollection<string> connections =
                _context.AppUser.FirstOrDefault(x => x.Name == userName).ConnectionIds;

            return connections != null ? connections : null;
        }

        public GameUserModel GetUserByName(string userName)
        {
            return _context.AppUser.FirstOrDefault(x => x.Name == userName);

            //return _context.AppUser.FirstOrDefault(x => x.Name == userName) 
            //    ?? new GameUserModel { ConnectionIds = new List<string>() };
        }

        public IQueryable<GameUserModel> GetOnlineUsers()
        {
            return _context.AppUser.Where(x=> x.Status == Constants.Status.Online);
        }

        public void AddNewUser(string userName, string connectionId)
        {
            GameUserModel userModel = new GameUserModel
            {
                Name = userName,
                ConnectionIds = new List<string> { connectionId }
            };

            userModel.Status = Constants.Status.Online;
            _context.AppUser.Add(userModel);
            _context.SaveChanges();
        }

        public void UpdateUser(GameUserModel userModel)
        {
            userModel.ConnectionIds = userModel.ConnectionIds.Where(x => !string.IsNullOrWhiteSpace(x)).Distinct().ToList();
            userModel.Status = Constants.Status.Online;
            _context.AppUser.Update(userModel);
            _context.SaveChanges();
        }

        public void UpdateUser(ICollection<GameUserModel> userModelList)
        {
            foreach (var userModel in userModelList)
            {
                userModel.ConnectionIds.Distinct();
                userModel.Status = Constants.Status.Ingame;
                _context.AppUser.Update(userModel);
            }
            _context.SaveChanges();

        }

        public void RemoveUser(GameUserModel currentUser, string currentConnectionId)
        {
            if (currentUser == null) return;
            currentUser.ConnectionIds.Remove(currentConnectionId);
            currentUser.Status = Constants.Status.Offline;

            _context.SaveChanges();

        }
    }
}
