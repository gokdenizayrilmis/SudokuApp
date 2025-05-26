using Microsoft.AspNetCore.Mvc;
using SudokuApp.Models;
using System;

namespace SudokuApp.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index(string difficulty)
        {
            if (string.IsNullOrEmpty(difficulty))
                return RedirectToAction("Index", "Home");

            var board = GenerateBoard(difficulty.ToLower());

            ViewBag.Difficulty = difficulty;
            return View(board);
        }

        private int?[,] GenerateBoard(string difficulty)
        {
            var rnd = new Random();
            int numberOfCells = difficulty switch
            {
                "easy" => 40,
                "medium" => 30,
                "hard" => 22,
                _ => 30
            };

            int?[,] board = new int?[9, 9];

            int filled = 0;
            while (filled < numberOfCells)
            {
                int r = rnd.Next(0, 9);
                int c = rnd.Next(0, 9);
                int val = rnd.Next(1, 10);

                if (board[r, c] == null)
                {
                    board[r, c] = val;
                    filled++;
                }
            }

            return board;
        }
    }
}
