﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TicTacToe.WebApi.TicTacToe.Hubs.Models
{
    public class BaseUserModel
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public string Status { get; set; }

    }
}