using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public interface IGroupService
    {
        Task JoinGroupAsync(GameUserModel userModel, string groupName);

        Task LeaveGroupAsync(GameUserModel userModel, string groupName);
    }
}
