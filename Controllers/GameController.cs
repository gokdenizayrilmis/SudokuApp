using Microsoft.AspNetCore.Mvc;
using SudokuApp.Models;
using SudokuApp.Services;

namespace SudokuApp.Controllers;

public class GameController : Controller
{
    public IActionResult Index()
    {
        var generator = new BoardGenerator();
        SudokuBoard board = generator.Generate(40);
        return View(board);
    }
}
