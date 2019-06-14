using System.Collections.Generic;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;
using TicTacToe.WebApi.TicTacToe.Services.Interfaces;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Services.Interfaces
{
    public interface IUserService<T> : IBaseService<User>
    {
        //Task<User> GetUser(string name = "", string connectionId = "");
        Task<User> GetUserByName(string userName);

        Task<User> GetUserByConnection(string connectionId);
        
        Task<IEnumerable<User>> GetAllUsers();
    }
}