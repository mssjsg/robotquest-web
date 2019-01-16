import PropTypes from 'prop-types';
import React from 'react';

const onKeyPress = () => false;

const GameTile = ({
  background, mapHeight, x, y, onTileClick,
}) => (
  <div
    className="tile noselect"
    role="button"
    tabIndex="0"
    onKeyPress={onKeyPress}
    onClick={() => onTileClick(x, y)}
    style={{ background }}
    key={x * mapHeight + y}
  >
    {`${x}, ${y}`}
  </div>
);

GameTile.propTypes = {
  background: PropTypes.string.isRequired,
  mapHeight: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onTileClick: PropTypes.func.isRequired,
};

export default GameTile;
