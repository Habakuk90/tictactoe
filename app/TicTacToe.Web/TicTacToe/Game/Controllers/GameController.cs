﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.Web.TicTacToe.Game.Controllers
{
    public class GameController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            return View("~/TicTacToe/Game/Views/Index.cshtml");
        }
    }
}
