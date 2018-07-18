using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public interface IGameUserService 
    {
        GameUserModel GetUserByConnection(string connectionId);

        IEnumerable<string> GetConnectionIds(string userName);

        GameUserModel GetUserByName(string userName);

        IQueryable<GameUserModel> GetOnlineUsers();

        void AddNewUser(string userName, string connectionIdl);

        void UpdateUser(GameUserModel userModel);

        void UpdateUser(ICollection<GameUserModel> userModel);

        void RemoveUser(GameUserModel userModel, string currentConnectionId);

        void RemoveUser(string userName);
    }
}
