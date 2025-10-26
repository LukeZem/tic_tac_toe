import { useState } from "react";
import PropTypes from "prop-types";

const ResetButton = ({ onResetBoard, onNewGame, onFullReset }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className="reset-container"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <button className="reset-button" onClick={onResetBoard}>
        Reset Board
      </button>
      {showDropdown && (
        <div className="reset-dropdown">
          <button className="dropdown-button" onClick={onNewGame}>
            New Game
            <span className="dropdown-description">
              (Change board size or mode)
            </span>
          </button>
          <button className="dropdown-button" onClick={onFullReset}>
            Full Reset
            <span className="dropdown-description">
              (Reset everything including counters)
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

ResetButton.propTypes = {
  onResetBoard: PropTypes.func.isRequired,
  onNewGame: PropTypes.func.isRequired,
  onFullReset: PropTypes.func.isRequired,
};

export default ResetButton;
