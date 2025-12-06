import PropTypes from "prop-types";

const Player = ({ whichPlayer, wins }) => {
  return (
    <div className={whichPlayer}>
      <h2>Player {whichPlayer}</h2>
      <h3>Wins: {wins}</h3>
    </div>
  );
};

Player.propTypes = {
  whichPlayer: PropTypes.string.isRequired,
  wins: PropTypes.number.isRequired,
};

export default Player;
