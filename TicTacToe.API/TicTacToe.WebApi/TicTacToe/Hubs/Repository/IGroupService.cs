using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Repository
{
    public interface IGroupService
    {
        void JoinGroup(GameUserModel userModel);

        void LeaveGroup(GameUserModel userModel);
    }
}
