using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    public class EntityManager<T> where T : Entity
    {
        public readonly AppDbContext _context;

        public EntityManager(AppDbContext context)
        {
            this._context = context;
        }

        public virtual async Task AddOrUpdate(T item)
        {
            try
            {
                if (await this.ItemExists(item))
                {
                    _context.Set<T>().Update(item);
                }
                else
                {
                    _context.Set<T>().Add(item);
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }

        public virtual async Task AddOrUpdate(IList<T> items)
        {
            foreach (var item in items)
            {
                //TODOANDI if given list, there will be an sql context generated for each entry.
                await this.AddOrUpdate(item);
            }
        }

        public virtual async Task Remove(T item)
        {
            try
            {
                _context.Set<T>().Remove(item);
                await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {
                throw exception;
            }
        }

        private async Task<bool> ItemExists(T item)
        {
            bool itemExists = false;

            itemExists = await _context.Set<T>().AnyAsync(i => i.ID == item.ID);

            return itemExists;
        }
    }
}
