using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.Web.TicTacToe.Authorization.Repository
{
    public class ConnectionMapping<T>
    {
        private readonly Dictionary<T, HashSet<string>> _connections =
            new Dictionary<T, HashSet<string>>();

        /// <summary>
        /// Get Count of alive Connections
        /// </summary>
        public int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        /// <summary>
        /// Adds Connections dependent on given key, creates Connections if new
        /// User
        /// </summary>
        /// <param name="key">User String</param>
        /// <param name="connectionId"></param>
        public void Add(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    connections = new HashSet<string>();
                    _connections.Add(key, connections);
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
        public IEnumerable<string> GetConnections(T key)
        {
            HashSet<string> connections;
            if (_connections.TryGetValue(key, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public string GetUserByConnection(string conId)
        {
            foreach (var key in _connections.Keys)
            {
                var connection = GetConnections(key);
                var userFound = connection.Any(con => con == conId);
                if(userFound)
                {
                    return key.ToString();
                }
            }
            return string.Empty;
        }

        /// <summary>
        /// Removes Connection for given key
        /// </summary>
        /// <param name="key">User String</param>
        /// <param name="connectionId"></param>
        public void Remove(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    connections.Remove(connectionId);

                    if (connections.Count == 0)
                    {
                        _connections.Remove(key);
                    }
                }
            }
        }
    }
}
