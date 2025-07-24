export default function GameBoard({ changePlayer, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((column, columnIndex) => (
              <li key={columnIndex}>
                <button
                  onClick={() => changePlayer(rowIndex, columnIndex)}
                  disabled={!!column}
                >
                  {column}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
