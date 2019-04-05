using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicTacToe.WebApi.TicTacToe.Entities;
using TicTacToe.WebApi.TicTacToe.Hubs.Models;

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

        [HttpGet]
        public JsonResult Index()
        {
            var x = _context.AppUser.ToList();
            
            return Json(x);
        }

        [Route("reset")]
        [HttpGet]
        public JsonResult Reset()
        {

            foreach (var x in _context.AppUser.ToList())
            {
                _context.AppUser.Remove(x);
            }
            _context.SaveChanges();

            return Json("success");
        }
    }

}
