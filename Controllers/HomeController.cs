using Microsoft.AspNetCore.Mvc;

namespace SudokuApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}