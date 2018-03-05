using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.Web.TicTacToe.Data;

namespace TicTacToe.Web.TicTacToe.Game.Controllers
{
    //[Authorize]
    public class GamesController : Controller
    {
        private readonly AppDbContext _context;

        public IActionResult Index()
        {
            
            return View("~/TicTacToe/Game/Views/Index.cshtml");
        }
        
        public IActionResult TicTacToe(string enemyName)
        {

            return View("~/TicTacToe/Game/Views/Tictactoe.cshtml");
        }

        
    }
}
