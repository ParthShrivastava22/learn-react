import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { checkForWinner } from "./components/checkWinner";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  if (gameTurns.length === 0) {
    return "X";
  }
  const prevPlayer = gameTurns[0].player;
  return prevPlayer === "X" ? "O" : "X";
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    Y: "Player 2",
  });

  function renamePlayer(player, newName) {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [player]: newName }));
  }

  const [gameTurns, setGameTurns] = useState([]);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = players[checkForWinner(gameBoard)];

  function handlePlayerChange(rIndex, cIndex) {
    const activePlayer = deriveActivePlayer(gameTurns);
    setGameTurns((prevTurns) => {
      const newTurns = [
        { square: { row: rIndex, column: cIndex }, player: activePlayer },
        ...prevTurns,
      ];
      return newTurns;
    });
  }

  function resetGame() {
    setGameTurns([]);
    gameBoard = initialGameBoard;
  }

  const drawn = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.X}
            symbol="X"
            isActive={deriveActivePlayer(gameTurns) === "X"}
            rename={renamePlayer}
          />
          <Player
            name={players.Y}
            symbol="O"
            isActive={deriveActivePlayer(gameTurns) === "O"}
            rename={renamePlayer}
          />
        </ol>
        {(winner || drawn) && <GameOver winner={winner} reset={resetGame} />}
        <GameBoard changePlayer={handlePlayerChange} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
