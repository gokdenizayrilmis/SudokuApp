namespace SudokuApp.Models;

public class SudokuBoard
{
    public int[,] Grid { get; set; }

    public SudokuBoard()
    {
        Grid = new int[9, 9];
    }
}
