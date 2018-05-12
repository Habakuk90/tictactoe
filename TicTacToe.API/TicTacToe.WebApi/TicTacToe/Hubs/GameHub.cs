using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Repository;
using TicTacToe.WebApi.TicTacToe.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs
{
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class GameHub : Hub
    {
        private readonly static ConnectionMapping<GameUserModel> _connections =
            new ConnectionMapping<GameUserModel>();

        private readonly static HashSet<GameUserModel> _userOnline = new HashSet<GameUserModel>();

        private readonly static HashSet<GameUserModel> _userModelOnline = new HashSet<GameUserModel>();

        public enum ModalStates { Accepted, Declined };

        //[TODO] map two player against each other on connection to "game"

        /// <summary>
        /// 
        /// </summary>
        /// <param name="room">id:number, name:string, List<GameUserModel></param>
        public void TileClicked(string room, string id1, string id2, string tileId)
        {
            Clients.Group(room).SendAsync("SwitchTurn");
            Clients.Group(room).SendAsync("TileChange", tileId);
        }

        public IEnumerable<GameUserModel> GetAllUser()
        {
            return _userOnline.ToList();
        }

        public string Send(string message)
        {
            return message;
        }

        /// <summary>
        /// Player selected enemy and send Request
        /// </summary>
        /// <param name="selectedPlayer"></param>
        public void ChallengePlayer(GameUserModel selectedPlayer)
        {
            GameUserModel currentUser = SetCurrentUser();

            // Clients.User => quick workaround with all ids
            var selectedPlayerIdList = _connections
                .GetConnections(selectedPlayer).ToList();

            Clients.Clients(selectedPlayerIdList)
                .SendAsync("OpenChallengedModal", currentUser);
            //call self
            Clients.Caller.SendAsync("OpenWaitingModal", selectedPlayer);

        }

        /// <summary>
        /// Invoke Modal to challenger and invoke Response to enemy
        /// </summary>
        /// <param name="enemy">enemy</param>
        /// <param name="response"></param>
        public void ChallengeResponse(GameUserModel enemy, ModalStates response)
        {
            switch (response)
            {
                case (ModalStates.Accepted):
                    SetUpGame(enemy);
                    break;
                case (ModalStates.Declined):
                    //[TODO] Reset Users
                    break;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override Task OnConnectedAsync()
        {
            //var currentUser = SetCurrentUser();
            //if (currentUser != null || currentUser.Name != null)
            //{
            //    _connections.Add(currentUser, Context.ConnectionId);
            //    _userOnline.Add(currentUser);
            //    Clients.All.SendAsync("SetConnectedUser",
            //        currentUser, _userOnline.ToList());
            //}
            //else
            //{
            //    Console.WriteLine("user Empty");
            //}

            return base.OnConnectedAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var currentUser = SetCurrentUser();
            _connections.Remove(currentUser, Context.ConnectionId);
            _userOnline.Remove(currentUser);
            // [TODO] need to send _userOnline?
            Clients.All.SendAsync("SetConnectedUser",
                    currentUser, _userOnline.ToList());
            return base.OnDisconnectedAsync(exception);
        }

        public GameUserModel SetCurrentUser()
        {
            if (Context != null || Context.User != null)
            {
                return new GameUserModel
                {
                    Name = Context.User.Identity.Name,
                    CurrentConnectionId = Context.ConnectionId
                };
            }

            return new GameUserModel();
        }


        /// <summary>
        /// Both player accepted, set up game and room
        /// </summary>
        /// <param name="gameUserList"></param>
        public async void SetUpGame(GameUserModel enemy)
        {

            var currentUser = SetCurrentUser();

            //[TODO] allow more games
            var gameName = "tictactoe";


            var url = "/games";


            //_connections.AddGroup(currentUser, room.RoomName);
            //_connections.AddGroup(enemy, room.RoomName);

            //await Groups.AddAsync(currentUser.CurrentConnectionId, room.RoomName);
            //await Groups.AddAsync(enemy.CurrentConnectionId, room.RoomName);


            //invoke Go to Game to group
            //await Clients.Group(room.RoomName)
            //    .SendAsync("GoToGame", url, room.RoomName,
            //        enemy.CurrentConnectionId, currentUser.CurrentConnectionId);

            //await Clients.Client(enemy.CurrentConnectionId).SendAsync("ChallengeAccepted", currentUser);


        }

    }
}
