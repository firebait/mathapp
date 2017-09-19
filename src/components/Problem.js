import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';


const formStyle = {
  position: 'absolute',
  top: '200px',
  left: '50%',
  width: '500px',
  marginLeft: '-250px',
  padding: '50px'
};

const numberColumnsStyle = {
  display: 'table-cell',
  textAlign: 'right',
  width: '100%'
}

const operatorColumnStyle = {
  display: 'table-cell',
  textAlign: 'right',
  width: '100%',
  paddingRight: '40px',
  verticalAlign: 'bottom'
};

const numberStyle = {
  color: 'rgb(0, 188, 212)',
  fontSize: '62px',
  textAlign: 'right'
};

const answerInputStyle = {
  fontSize: '40px',
  lineHeight: '40px',
  height: '80px',
  textAlign: 'right'
};

const answerContainerStyle = {
  display: 'block',
  width: '100%',
  fontSize: '40px',
  lineHeight: '40px',
  height: '80px',
  textAlign: 'right'
};

const checkStyle = {
  marginTop: '30px',
  display: 'block',
  width: '100%',
};

const checkLabelStyle = {
  fontSize: '20px'
}

const Problem = ({ firstNumber, secondNumber, operation, answer, onAnswerChange, onCheckAnswer }) => {

  const renderOperation = () => {
    let operationString = ''
    if (operation === 'addition') {
      operationString = '+'
    }
    if (operation === 'substraction') {
      operationString = '-'
    }
    return (<span style={numberStyle}>{operationString}</span>)
  };

  return (
    <Paper zDepth={3} style={formStyle}>
      <form action="javascript:void(0);" onSubmit={onCheckAnswer}>
        <div style={operatorColumnStyle}>{renderOperation()}</div>
        <div style={numberColumnsStyle}>
          <div style={numberStyle}>{firstNumber.toLocaleString()}</div>
          <div style={numberStyle}>{secondNumber.toLocaleString()}</div>
        </div>
        <Divider />
        <TextField tabIndex={0} type="number" name="answer" id="answer" value={answer} onChange={onAnswerChange} style={answerContainerStyle} inputStyle={answerInputStyle} />
        <RaisedButton type="submit" label="Check Answer" primary labelStyle={checkLabelStyle} style={checkStyle} />
      </form>
    </Paper>
  );
}

export default Problem;
