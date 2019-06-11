using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public class EntityManager<T> where T : BaseEntity
    {
        public readonly AppDbContext _context;

        public EntityManager(AppDbContext context)
        {
            this._context = context;
        }

        public virtual async Task AddOrUpdate(T item)
        {
            if (this.ItemExists(item))
            {
                this._context.Set<T>().Update(item);
            }
            else
            {
                this._context.Set<T>().Add(item);
            }

            await this._context.SaveChangesAsync();
        }

        public virtual async Task AddOrUpdate(IList<T> items)
        {
            foreach (var item in items)
            {
                await this.AddOrUpdate(item);
            }
        }

        public virtual async Task Remove(T item)
        {
            this._context.Set<T>().Remove(item);
            await this._context.SaveChangesAsync();
        }

        private bool ItemExists(T item)
        {
            return this._context.Set<T>().Any(i => i.ID == item.ID);
        }
    }
}
