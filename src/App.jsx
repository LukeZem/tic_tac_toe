import { useState } from "react";
import Header from "./components/Header";
import Player from "./components/Player";
import Board from "./components/Board";
import GameSetup from "./components/GameSetup";
import GameStatus from "./components/GameStatus";
import ResetButton from "./components/ResetButton";
import "./styles.css";

function App() {
  const [gameMode, setGameMode] = useState(null); // 'pvp' or 'ai'
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const handleSquareClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winResult = checkWinner(newBoard, boardSize);
    if (winResult) {
      setGameOver(true);
      setWinner(winResult);
      if (winResult === "X") setXWins(xWins + 1);
      if (winResult === "O") setOWins(oWins + 1);
      return;
    }

    if (newBoard.every((square) => square !== null)) {
      setGameOver(true);
      setWinner("TIE");
      return;
    }

    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    setCurrentPlayer(nextPlayer);

    // AI move
    if (gameMode === "ai" && nextPlayer === "O") {
      setTimeout(() => {
        makeAIMove(newBoard, boardSize);
      }, 300);
    }
  };

  const makeAIMove = (currentBoard, size) => {
    const aiMove = getBestMove(currentBoard, size);
    if (aiMove !== -1) {
      const newBoard = [...currentBoard];
      newBoard[aiMove] = "O";
      setBoard(newBoard);

      const winResult = checkWinner(newBoard, size);
      if (winResult) {
        setGameOver(true);
        setWinner(winResult);
        if (winResult === "O") setOWins(oWins + 1);
        return;
      }

      if (newBoard.every((square) => square !== null)) {
        setGameOver(true);
        setWinner("TIE");
        return;
      }

      setCurrentPlayer("X");
    }
  };

  const checkWinner = (board, size) => {
    const lines = getWinningLines(size);
    for (let line of lines) {
      const [first, ...rest] = line;
      if (board[first] && rest.every((idx) => board[idx] === board[first])) {
        return board[first];
      }
    }
    return null;
  };

  const getWinningLines = (size) => {
    const lines = [];

    // Rows
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      lines.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
      const col = [];
      for (let j = 0; j < size; j++) {
        col.push(j * size + i);
      }
      lines.push(col);
    }

    // Diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i);
      diag2.push(i * size + (size - 1 - i));
    }
    lines.push(diag1);
    lines.push(diag2);

    return lines;
  };

  const getBestMove = (board, size) => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        const score = minimax(board, size, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const minimax = (board, size, depth, isMaximizing) => {
    const winner = checkWinner(board, size);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (board.every((square) => square !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const score = minimax(board, size, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          const score = minimax(board, size, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const handleNewGame = (mode, size) => {
    setGameMode(mode);
    setBoardSize(size);
    setBoard(Array(size * size).fill(null));
    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

  const handleNewGameSetup = () => {
    setBoard(Array(boardSize * boardSize).fill(null));
    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
    setGameMode(null); // Go back to setup
  };

  const handleResetBoard = () => {
    setBoard(Array(boardSize * boardSize).fill(null));
    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
  };

  const handleFullReset = () => {
    setGameMode(null);
    setBoardSize(3);
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setGameOver(false);
    setWinner(null);
    setXWins(0);
    setOWins(0);
  };

  if (!gameMode) {
    return (
      <div>
        <Header />
        <GameSetup onStart={handleNewGame} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div>
          <Player whichPlayer="X" wins={xWins} />
          <Player whichPlayer="O" wins={oWins} />
          <GameStatus
            gameOver={gameOver}
            winner={winner}
            currentPlayer={currentPlayer}
          />
          <Board
            board={board}
            boardSize={boardSize}
            onSquareClick={handleSquareClick}
            gameOver={gameOver}
          />
          <ResetButton
            onResetBoard={handleResetBoard}
            onNewGame={handleNewGameSetup}
            onFullReset={handleFullReset}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
