namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    using System.Linq;
    using System.Threading.Tasks;

    /// <summary>
    /// Represents the GameHub Client Methods
    /// </summary>
    public interface IGameClient
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task SwitchTurn();

        Task TileChange(string tileId);

        Task OpenModal(string userName, string ModalStatus);

        Task ChallengeAccepted(string groupName, bool? isFirst = false);

        Task ChallengeDeclined(string userName);

        Task GameOver(string winningTileId, string winningLine);
    }
}
