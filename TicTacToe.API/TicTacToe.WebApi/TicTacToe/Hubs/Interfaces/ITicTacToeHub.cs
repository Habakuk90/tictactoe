using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Interfaces
{
    public interface ITicTacToeHub : IBaseHub
    {
        Task SwitchTurn();

        Task TileChange(string tileId);

        Task GameOver(string winningTileId, string winningLine);
    }
}
