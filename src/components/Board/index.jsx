import Square from "../Square";
import PropTypes from "prop-types";

const Board = ({ board, boardSize, onSquareClick, gameOver }) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${boardSize}, 15vw)`,
    gridTemplateRows: `repeat(${boardSize}, 15vw)`,
  };

  const squaresJSX = board.map((value, index) => {
    return (
      <Square
        value={value}
        handleClick={() => onSquareClick(index)}
        key={index}
        disabled={gameOver}
      />
    );
  });

  return (
    <div className="board" style={gridStyle}>
      {squaresJSX}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.null])).isRequired,
  boardSize: PropTypes.number.isRequired,
  onSquareClick: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default Board;
