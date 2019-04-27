using System.Collections.Generic;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces
{
    public interface IUserService : IBaseService
    {
        GameUserModel GetUserByName(string userName);
        
        void AddNewUser(GameUserModel user);

        void UpdateUser(GameUserModel user, string status);

        void UpdateUser(ICollection<GameUserModel> userList, string status);

        bool UserExists(string userName);
    }
}
