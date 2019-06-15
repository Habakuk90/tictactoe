using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Interfaces
{
    public interface IHomeClient : IAppClient
    {
        Task OpenModal(string userName, string gameName, string modalStatus);

        Task StartGame(string groupName, string gameName);

        Task StartGame(string groupName);
    }
}
