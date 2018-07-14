using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public interface IGameUserRepository 
    {
        GameUserModel GetUserByConnection(string connectionId);

        ICollection<string> GetConnections(string userName);

        GameUserModel GetUserByName(string userName);

        void AddNewUser(GameUserModel userModel);

        void UpdateUser(GameUserModel userModel);

        void RemoveUser(GameUserModel userModel, string currentConnectionId);
    }
}
