import { useState } from "react";
import PropTypes from "prop-types";

const GameSetup = ({ onStart }) => {
  const [selectedMode, setSelectedMode] = useState("pvp");
  const [selectedSize, setSelectedSize] = useState(3);

  const handleStart = () => {
    onStart(selectedMode, selectedSize);
  };

  return (
    <div className="game-setup">
      <h2>Choose Game Mode</h2>
      <div className="mode-selection">
        <button
          className={`mode-button ${selectedMode === "pvp" ? "active" : ""}`}
          onClick={() => setSelectedMode("pvp")}
        >
          Player vs Player
        </button>
        <button
          className={`mode-button ${selectedMode === "ai" ? "active" : ""}`}
          onClick={() => setSelectedMode("ai")}
        >
          Player vs AI
        </button>
      </div>

      <h2>Choose Board Size</h2>
      <div className="size-selection">
        {[3, 4, 5].map((size) => (
          <button
            key={size}
            className={`size-button ${selectedSize === size ? "active" : ""}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}x{size}
          </button>
        ))}
      </div>

      <button className="start-button" onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
};

GameSetup.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default GameSetup;
