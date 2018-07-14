using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;

namespace TicTacToe.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        public JsonResult Index()
        {
            var x = _context.AppUser.ToList();

            return Json(x);
        }
    }

}
