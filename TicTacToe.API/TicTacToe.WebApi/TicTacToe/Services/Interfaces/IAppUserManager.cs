using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Interfaces;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Services.Interfaces
{
    public interface IAppUserManager<THub, T> : IEntityManager<User> where THub : Hub<T> where T : class, IAppHub
    {
        Task<User> GetUserByName(string userName);

        Task<User> GetUserByConnection(string connectionId);

        Task<bool> UserNameExists(string name);
    }
}
