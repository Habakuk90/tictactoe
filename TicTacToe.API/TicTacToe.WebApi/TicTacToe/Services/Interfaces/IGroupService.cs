using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services.Interfaces
{
    public interface IGroupService : IBaseService
    {
        Task JoinGroupAsync(GameUserModel userModel, string groupName);

        Task LeaveGroupAsync(GameUserModel userModel, string groupName);
    }
}
