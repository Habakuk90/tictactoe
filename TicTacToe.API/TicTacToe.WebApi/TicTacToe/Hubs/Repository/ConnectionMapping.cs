using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{

    public class ConnectionMapping<T>
    {
        private readonly Dictionary<string, HashSet<string>> _userConnections =
            new Dictionary<string, HashSet<string>>();

        /// <summary>
        /// Get Count of alive Connections
        /// </summary>
        public int Count
        {
            get
            {
                return _userConnections.Count;
            }
        }

        /// <summary>
        /// Adds Connections dependent on given key, creates Connections if new
        /// User
        /// </summary>
        /// <param name="key">User String</param>
        /// <param name="connectionId"></param>
        public void Add(string userModel, string connectionId)
        {
            lock (_userConnections)
            {
                HashSet<string> connections;
                if (!_userConnections.TryGetValue(userModel, out connections))
                {
                    connections = new HashSet<string>();
                    _userConnections.Add(userModel, connections);
                }

                lock (connections)
                {
                    connections.Add(connectionId);
                }
            }
        }

        /// <summary>
        /// Gets all Connection for given key in Connections
        /// </summary>
        /// <param name="key">User String</param>
        /// <returns></returns>
        public IEnumerable<string> GetConnections(string key)
        {
            HashSet<string> connections;
            if (_userConnections.TryGetValue(key, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public string GetUserByConnection(string conId)
        {
            foreach (var key in _userConnections.Keys)
            {
                var connection = GetConnections(key);
                var userFound = connection.Any(con => con == conId);
                if (userFound)
                {
                    return key;
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// Removes Connection for given key
        /// </summary>
        /// <param name="key">User String</param>
        /// <param name="connectionId"></param>
        public void Remove(string key, string connectionId)
        {
            lock (_userConnections)
            {
                HashSet<string> connections;
                if (!_userConnections.TryGetValue(key, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    connections.Remove(connectionId);

                    if (connections.Count == 0)
                    {
                        _userConnections.Remove(key);
                    }
                }
            }
        }
    }
}
