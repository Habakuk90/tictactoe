using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services.Interfaces
{
    public interface IBaseService
    {
        GameUserModel GetUserByConnection(string connectionId);
        void UpdateUserList();

        Task JoinGroupAsync(GameUserModel userModel, string groupName);

        Task LeaveGroupAsync(GameUserModel userModel, string groupName);

        bool UserExists(string userName);

        GameUserModel GetUserByName(string userName);

        void UpdateUser(GameUserModel user, string status);

        void UpdateUser(ICollection<GameUserModel> users, string status);

        void AddNewUser(GameUserModel user);

        void RemoveUser(GameUserModel user, string currentConnectionId);
    }
}
