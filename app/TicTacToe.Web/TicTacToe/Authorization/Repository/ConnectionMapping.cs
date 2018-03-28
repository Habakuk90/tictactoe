using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.Web.TicTacToe.Game.Models;

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
        private readonly Dictionary<GameUserModel, HashSet<string>> _userConnections =
            new Dictionary<GameUserModel, HashSet<string>>();

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
                return _userConnections.Count;
            }
        }

        /// <summary>
        /// Adds Connections dependent on given key, creates Connections if new
        /// User
        /// </summary>
        /// <param name="key">User String</param>
        /// <param name="connectionId"></param>
        public void Add(GameUserModel userModel, string connectionId)
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
        public IEnumerable<string> GetConnections(GameUserModel key)
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
        public void Remove(GameUserModel key, string connectionId)
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


        /// <summary>
        /// 
        /// </summary>
        /// <param name="userModel">RoomName</param>
        /// <param name="groupName"></param>
        public void AddGroup(T userModel, string groupName)
        {
            //lock (groupList)
            //{

            if (groupList.Any(x => x.RoomName == userModel.ToString()))
            {
                groupList
                    .Where(y => y.RoomName == userModel.ToString())
                    .Select(x => x.UserIds.Add(groupName));
            }
            else
            {
                var newGroup = new Group(groupName, userModel.ToString())
                {
                    UserIds = new HashSet<string>()
                };
                newGroup.UserIds.Add(groupName);

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
                if (group.UserIds.Any(x => x == connectionId))
                {
                    groupName = group.RoomName;
                }
            }
            return groupName;
        }

    }
}
