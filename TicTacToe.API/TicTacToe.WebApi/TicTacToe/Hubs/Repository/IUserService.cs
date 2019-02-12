using System.Collections.Generic;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public interface IUserService 
    {
        GameUserModel GetUserByConnection(string connectionId);
        
        GameUserModel GetUserByName(string userName);
        
        void AddNewUser(GameUserModel user);

        void UpdateUser(GameUserModel user, string status);

        void UpdateUser(ICollection<GameUserModel> userList, string status);

        void RemoveUser(GameUserModel user, string currentConnectionId);
        
        void UpdateUserList();

        bool UserExists(string userName);
    }
}
