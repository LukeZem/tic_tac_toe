import PropTypes from "prop-types";

const Square = ({ value, handleClick, disabled }) => {
  return (
    <div
      onClick={disabled ? undefined : handleClick}
      className={`square ${disabled ? "disabled" : ""}`}
    >
      <h4>{value}</h4>
    </div>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Square;