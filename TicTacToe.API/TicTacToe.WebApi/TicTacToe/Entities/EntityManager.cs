using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public class EntityManager<T> : IDisposable where T : BaseEntity
    {
        private readonly AppDbContext _dbContext;

        public EntityManager(AppDbContext context)
        {
            this._dbContext = context;
        }

        public virtual void AddOrUpdate(T item)
        {
            if (this.ItemExists(item))
            {
                this._dbContext.Set<T>().Update(item);
            }
            else
            {
                this._dbContext.Set<T>().Add(item);
            }
        }

        public virtual void AddOrUpdate(IList<T> items)
        {
            foreach (var item in items)
            {
                this.AddOrUpdate(item);
            }
        }

        public virtual void Remove(T item)
        {
            this._dbContext.Set<T>().Remove(item);
        }

        public virtual void Dispose()
        {
            this._dbContext.SaveChangesAsync();
            this._dbContext.Dispose();
            this.Dispose();
            GC.SuppressFinalize(this);
        }

        private bool ItemExists(T item)
        {
            return this._dbContext.Set<T>().Any(i => i.ID == item.ID);
        }
    }
}
