import React from 'react';

const Bomb = () => (
  <span
    style={{
      width: 50,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      overflow: 'hidden',
    }}
    role="img"
    aria-label="Bomb"
  >
    💣
  </span>
);

export default Bomb;
