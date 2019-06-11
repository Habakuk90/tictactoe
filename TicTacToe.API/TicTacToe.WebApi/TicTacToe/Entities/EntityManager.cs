using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public class EntityManager<T> where T : BaseEntity
    {
        public readonly IAppDbContextFactory<AppDbContext> _factory;

        public EntityManager(IAppDbContextFactory<AppDbContext> factory)
        {
            this._factory = factory;
        }

        public virtual async Task AddOrUpdate(T item)
        {
            using (var context = this._factory.CreateDbContext())
            {
                try
                {
                    if (this.ItemExists(item).Result)
                    {
                       context.Set<T>().Update(item);
                    }
                    else
                    {
                        context.Set<T>().Add(item);
                    }

                    await context.SaveChangesAsync();
                }
                catch (Exception exception)
                {
                    throw exception;
                }
            }
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
            using (var context = this._factory.CreateDbContext())
            {
                try
                {
                    context.Set<T>().Remove(item);
                    await context.SaveChangesAsync();
                }
                catch (Exception exception)
                {
                    throw exception;
                }
            }
        }

        private async Task<bool> ItemExists(T item)
        {
            bool itemExists = false;

            using(var context = this._factory.CreateDbContext())
            {
                itemExists = await context.Set<T>().AnyAsync(i => i.ID == item.ID);
            }

            return itemExists;
        }
    }
}
