using TicTacToe.WebApi.TicTacToe.Entities;

namespace TicTacToe.WebApi.TicTacToe.Services.Interfaces
{
    public interface IBaseService<T> : IEntityManager<T> where T : Entity
    {
    }
}
