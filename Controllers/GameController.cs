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

    [HttpPost]
    public IActionResult Validate(int[][] cells)
    {
        // Burada cells dizisini SudokuBoard formatına dönüştür ve doğrula.
        // Basit doğrulama örneği olarak aynı sayının satırda tekrarını engelleyelim.

        bool isValid = ValidateSudoku(cells);

        ViewBag.Message = isValid ? "Tebrikler! Doğru çözüm." : "Hata var. Lütfen tekrar kontrol edin.";

        var board = new SudokuBoard();

        for (int i = 0; i < 9; i++)
        {
            for (int j = 0; j < 9; j++)
            {
                board.Grid[i, j] = cells[i][j];
            }
        }

        return View("Index", board);
    }

    private bool ValidateSudoku(int[][] grid)
    {
        // Satır kontrolü (örnek)
        for (int row = 0; row < 9; row++)
        {
            var seen = new HashSet<int>();
            for (int col = 0; col < 9; col++)
            {
                int val = grid[row][col];
                if (val == 0) continue;
                if (seen.Contains(val)) return false;
                seen.Add(val);
            }
        }
        return true;
    }





}
