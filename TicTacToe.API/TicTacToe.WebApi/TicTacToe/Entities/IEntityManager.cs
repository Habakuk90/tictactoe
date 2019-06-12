using System.Collections.Generic;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public interface IEntityManager<T> where T : Entity
    {
        Task AddOrUpdate(T item);

        Task AddOrUpdate(IList<T> items);

        Task Remove(T item);
    }
}
