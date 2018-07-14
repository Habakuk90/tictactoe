using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public class GameUserRepository : IGameUserRepository
    {
        private AppDbContext _context;
        public GameUserModel currentUser { get; set; }

        public GameUserRepository(AppDbContext context)
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

        public void AddNewUser(GameUserModel userModel)
        {
            userModel.Status = Constants.Status.Online;
            _context.AppUser.Add(userModel);
            _context.SaveChanges();
        }

        public void UpdateUser(GameUserModel userModel)
        {
            userModel.ConnectionIds.RemoveAll(x => string.IsNullOrWhiteSpace(x));
            userModel.Status = Constants.Status.Online;
            _context.AppUser.Update(userModel);
            _context.SaveChanges();
        }

        public void RemoveUser(GameUserModel currenUser, string currentConnectionId)
        {
            if (currentUser == null) return;
            currentUser.ConnectionIds.Remove(currentConnectionId);
            currentUser.Status = Constants.Status.Offline;

            _context.SaveChanges();

        }
    }
}
