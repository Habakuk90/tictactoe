﻿using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Interfaces
{
    public interface IHomeHub : IAppHub
    {
        Task SwitchTurn();

        Task TileChange(string tileId);

        Task OpenModal(string userName, string gameName, string modalStatus);

        Task StartGame(string groupName, string gameName);

        Task StartGame(string groupName);

        Task GameOver(string winningTileId, string winningLine);
    }
}
