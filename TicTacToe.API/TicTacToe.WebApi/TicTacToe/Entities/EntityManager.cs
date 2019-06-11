using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.EntityFrameworkCore;

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
            //using (var transaction = this._context.Database.BeginTransaction())
            //{
                try
                {
                    if (this.ItemExists(item).Result)
                    {
                        this._context.Set<T>().Update(item);
                    }
                    else
                    {
                        this._context.Set<T>().Add(item);
                    }

                    await this._context.SaveChangesAsync();


                    //transaction.Commit();
                }
                catch (Exception exception)
                {
                //this._context.
                    //transaction.Rollback();
                    throw exception;
                }
            //}
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
            using (var transaction = this._context.Database.BeginTransactionAsync())
            {
                try
                {
                    this._context.Set<T>().Remove(item);
                    await this._context.SaveChangesAsync();
                    transaction.Result.Commit();
                }
                catch (Exception exception)
                {
                    transaction.Result.Rollback();
                    throw exception;
                }
            }
        }

        private async Task<bool> ItemExists(T item)
        {
            var itemExists = await this._context.Set<T>().AnyAsync(i => i.ID == item.ID);

            return itemExists;
        }
    }
}
