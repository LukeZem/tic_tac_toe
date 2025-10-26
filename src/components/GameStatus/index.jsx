import PropTypes from "prop-types";

const GameStatus = ({ gameOver, winner, currentPlayer }) => {
  if (gameOver) {
    if (winner === "TIE") {
      return <h4 className="game-status">It&apos;s a Tie! 🤝</h4>;
    }
    return <h4 className="game-status">Player {winner} Wins! 🎉</h4>;
  }

  return <h4 className="game-status">Current Player: {currentPlayer}</h4>;
};

GameStatus.propTypes = {
  gameOver: PropTypes.bool.isRequired,
  winner: PropTypes.string,
  currentPlayer: PropTypes.string.isRequired,
};

export default GameStatus;
