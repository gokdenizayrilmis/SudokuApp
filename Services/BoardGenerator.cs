using SudokuApp.Models;

namespace SudokuApp.Services;

public class BoardGenerator
{
    private readonly SudokuBoard _board;
    private Random _rand;

    public BoardGenerator()
    {
        _board = new SudokuBoard();
        _rand = new Random();
    }

    public SudokuBoard Generate(int emptyCells = 40)
    {
        FillBoard(0, 0);
        RemoveCells(emptyCells); // Doğru çağrı artık
        return _board;
    }

    public void RemoveCells(int cellsToRemove) // Sadece hücre sayısı alıyor
    {
        Random rand = new Random();
        int removed = 0;

        while (removed < cellsToRemove)
        {
            int row = rand.Next(9);
            int col = rand.Next(9);

            if (_board.Grid[row, col] != 0)
            {
                _board.Grid[row, col] = 0;
                removed++;
            }
        }
    }

    private bool FillBoard(int row, int col)
    {
        if (row == 9)
            return true;

        int nextRow = col == 8 ? row + 1 : row;
        int nextCol = (col + 1) % 9;

        var numbers = Enumerable.Range(1, 9).OrderBy(x => _rand.Next()).ToList();

        foreach (int num in numbers)
        {
            if (IsSafe(row, col, num))
            {
                _board.Grid[row, col] = num;

                if (FillBoard(nextRow, nextCol))
                    return true;

                _board.Grid[row, col] = 0;
            }
        }

        return false;
    }

    private bool IsSafe(int row, int col, int num)
    {
        for (int i = 0; i < 9; i++)
        {
            if (_board.Grid[row, i] == num || _board.Grid[i, col] == num)
                return false;
        }

        int startRow = (row / 3) * 3;
        int startCol = (col / 3) * 3;

        for (int r = 0; r < 3; r++)
        {
            for (int c = 0; c < 3; c++)
            {
                if (_board.Grid[startRow + r, startCol + c] == num)
                    return false;
            }
        }

        return true;
    }
}
