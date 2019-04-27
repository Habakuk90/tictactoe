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

        void RemoveUser(GameUserModel user, string currentConnectionId);
    }
}
