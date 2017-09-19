import React from 'react';

const scoreStyle = {
  float: 'left',
  display: 'block',
  width: '33%',
  textAlign: 'center',
  padding: '10px 0',
  fontSize: '30px',
  display: 'block'
};

const scoreLabelStyle = {
  display: 'block',
  fontSize: '16px',
  color: '#333333'
};

const Score = ({ attempts, correct, incorrect }) => {
  return (
    <div style={{marginTop: '10px'}}>
      <span style={scoreStyle}>{correct.toLocaleString()}<span style={scoreLabelStyle}>Solved</span></span>
      <span style={scoreStyle}>{incorrect.toLocaleString()}<span style={scoreLabelStyle}>Tried</span></span>
      <span style={scoreStyle}>{attempts.toLocaleString()}<span style={scoreLabelStyle}>Total</span></span>
    </div>
  );
};

export default Score;
