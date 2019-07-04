import React from 'react';
import PropTypes from 'prop-types';
import { fontStyle } from '../theme';
import { width, height, maxCharacters } from './nodeProperties';




export const Choice = ({ choice, x, y, onClick }) => {
  let { text } = choice;
  if (text.length > maxCharacters) text = `${text.substring(0, maxCharacters)}...`;
  const left = x - width / 2;
  const top = y - height / 2;

  const handleClick = () => onClick({ id: choice._id, left, top, width, height });

  return (
    <svg x={left} y={top} width={width} height={height}>
      <rect x={0} y={0} height={height} width={width} fill="#8e8d9b" onClick={handleClick} />
      <text x={left} y={height / 1.65} fill="white" style={fontStyle} textAnchor="middle">
        {text}
      </text>
    </svg>
  );
};

Choice.propTypes = {
  choice: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
