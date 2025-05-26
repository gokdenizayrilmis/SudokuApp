using Microsoft.AspNetCore.Mvc;

namespace SudokuApp.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index(string difficulty)
        {
            if (string.IsNullOrEmpty(difficulty))
                return RedirectToAction("Index", "Home");

            ViewBag.Difficulty = difficulty;
            return View();
        }
    }
}