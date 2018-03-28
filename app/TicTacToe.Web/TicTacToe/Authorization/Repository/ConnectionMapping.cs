using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.Web.TicTacToe.Authorization.Repository
{

    public class Group
    {
        public Group(string id, string gameName)
        {
            Id = id;
            GameName = gameName;
        }

        public string Id { get; set; }
        public string RoomName { get { return GameName + Id; } }

        public string GameName { get; set; }

        public HashSet<string> UserIds { get; set; }

    }
    public class ConnectionMapping<T>
    {
        private readonly Dictionary<T, HashSet<string>> _connections =
            new Dictionary<T, HashSet<string>>();

        private readonly Dictionary<T, HashSet<string>> _groups =
            new Dictionary<T, HashSet<string>>();

        private readonly List<Group> groupList = new List<Group>();

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
        /// 
        /// </summary>
        /// <param name="key">RoomName</param>
        /// <param name="connectionId"></param>
        public void AddGroup(T key, string connectionId)
        {
            //lock (groupList)
            //{

            if (groupList.Any(x => x.RoomName == key.ToString()))
            {
                groupList
                    .Where(y => y.RoomName == key.ToString())
                    .Select(x => x.UserIds.Add(connectionId));
            }
            else
            {
                var newGroup = new Group(connectionId, key.ToString())
                {
                    UserIds = new HashSet<string>()
                };
                newGroup.UserIds.Add(connectionId);

                groupList.Add(newGroup);
            }
        }
        public void RemoveGroup(T key, string connectionId)
        {
            lock (groupList)
            {
                var groupToRemove = groupList.FirstOrDefault(x => x.RoomName == key.ToString());
                groupList.Remove(groupToRemove);
            }
        }

        public string GetGroupByConId(string connectionId)
        {
            var groupName = string.Empty;

            foreach (var group in groupList)
            {
                if(group.UserIds.Any(x => x == connectionId))
                {
                    groupName = group.RoomName;
                }
            }
            return groupName;
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
                if (userFound)
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
