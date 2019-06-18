using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TicTacToe.WebApi.TicTacToe.Entities
{
    /// <summary>
    /// The Entity Manager performs CRUD operations for the DB.
    /// </summary>
    /// <typeparam name="T">
    /// Base Entity which are stored in DB
    /// </typeparam>
    public class EntityManager<T>: IEntityManager<T> where T : Entity
    {
        public readonly AppDbContext _context;

        /// <summary>
        /// Constructor of the EntityManager
        /// </summary>
        /// <param name="context">
        /// <see cref="DbContext"/> for the crud operations.
        /// </param>
        public EntityManager(AppDbContext context)
        {
            this._context = context;
        }

        public virtual async Task<T> Get(T item)
        {
            var entity = this._context.Set<T>().Find(item);

            return entity;
        }

        /// <summary>
        /// Adds or updates given <see cref="Entity"/>
        /// </summary>
        /// <param name="item">
        /// <see cref="Entity"/> which should be added or updated.
        /// </param>
        /// <returns>
        /// Asynchronous Task.
        /// </returns>
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

        /// <summary>
        /// Adds or updates given <see cref="IList{T}"/> with <see cref="Entity"/>
        /// </summary>
        /// <param name="items">
        /// List of items which should be updated
        /// </param>
        /// <returns>
        /// <see cref="Task"/>
        /// </returns>
        public virtual async Task AddOrUpdate(IList<T> items)
        {
            foreach (var item in items)
            {
                await this.AddOrUpdate(item);
            }
        }

        /// <summary>
        /// Removes the given item from the Database.
        /// </summary>
        /// <param name="item">
        /// <see cref="Entity"/> which should be removed.
        /// </param>
        /// <returns>
        /// <see cref="Tasks"/>
        /// </returns>
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

        /// <summary>
        /// Check if there is an entry in database.
        /// </summary>
        /// <param name="item">
        /// <see cref="Entity"/> which should be checked.
        /// </param>
        /// <returns></returns>
        private async Task<bool> ItemExists(T item)
        {
            bool itemExists = false;

            itemExists = await _context.Set<T>().AnyAsync(i => i.ID == item.ID);

            return itemExists;
        }
    }
}
