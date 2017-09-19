import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Popover from 'material-ui/Popover';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import { Menu, Problem, Score, Velocity } from 'components';

const contentStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '64px',
  left: 0
};

const snackbarErrorStyle = {
  backgroundColor: '#F44336'
};

const snackbarSuccessStyle = {
  backgroundColor: '#4CAF50'
}

const scoreContainerStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  margin: '0 auto',
  height: '100%',
  width: 'auto',
  textAlign: 'center',
  backgroundColor: '#FAFAFA'
};

const ButtonStyle = {
  marginLeft: '10px'
}

const startState = {
  attempts: 0,
  correct: 0,
  incorrect: 0,
};

class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      menuAnchorEl: null,
      isSnackbarOpen: false,
      snackbarMessage: '',
      snackbarStyle: snackbarSuccessStyle,
      operation: 'addition',
      digits: 1,
      attempts: 0,
      correct: 0,
      incorrect: 0,
      firstNumber: null,
      secondNumber: null,
      answer: '',
      startTime: new Date(),
      isRunning: false
    }
    this.updateOperation = this.updateOperation.bind(this);
    this.updateDigits = this.updateDigits.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.generateProblem = this.generateProblem.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.stop = this.stop.bind(this);
  }

  openMenu (e) {
    // This prevents ghost click.
    e.preventDefault();

    this.setState({
      isMenuOpen: true,
      menuAnchorEl: e.currentTarget,
    });
  };

  closeMenu () {
    this.setState({
      isMenuOpen: false,
    });
  };

  closeSnackbar () {
    this.setState({
      isSnackbarOpen: false,
    });
  };

  updateOperation (event, index, value) {
    this.setState({'operation': value}, () => {
      this.generateProblem();
    });
  }

  updateDigits (event, index, value) {
    this.setState({'digits': value}, () => {
      this.generateProblem();
    });
  }

  updateAnswer (event, index, value) {
    this.setState({'answer': value});
  }

  start () {
    this.setState(Object.assign({}, startState, {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      startTime: new Date(),
      isRunning: true
    }));
  }

  reset () {
    this.setState(startState);
  }

  stop () {
    this.setState({ isRunning: false });
  }

  generateProblem () {
    const { operation, digits } = this.state;
    const maxNumber = Math.pow(10, digits);
    const firstNumber = Math.floor(Math.random() * maxNumber);
    const secondNumber = Math.floor(Math.random() * maxNumber);
    if (operation === 'substraction' && firstNumber < secondNumber) {
      this.generateProblem();
    } else {
      this.setState({
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        answer: ''
      });
    }
  }

  verifyAnswer (e) {
    const formData = new FormData(e.currentTarget);
    const answer = parseInt(formData.get('answer'), 10);
    const { firstNumber, secondNumber, operation, attempts, correct, incorrect } = this.state;
    let snackbarMessage = 'Try again. The best way to improve is to learn from mistakes.';
    let snackbarStyle = snackbarErrorStyle;
    let result = false;
    if(operation === 'addition' && firstNumber+secondNumber === answer) {
      result = true;
    }
    if(operation === 'substraction' && firstNumber-secondNumber === answer) {
      result = true;
    }
    if (result === true) {
      snackbarMessage = 'You\'re awsome! I wanna be like you when I grow up.';
      snackbarStyle = snackbarSuccessStyle;
    }
    this.setState({
      isSnackbarOpen: true,
      snackbarMessage: snackbarMessage,
      snackbarStyle,
      correct: result ? (correct + 1) : correct,
      incorrect: !result ? (incorrect + 1) : incorrect,
      attempts: (attempts + 1)
    });
    this.generateProblem();
  }

  componentWillMount() {
    this.generateProblem();
  }

  render () {
    const { firstNumber, secondNumber, operation, answer, digits,
      isMenuOpen, menuAnchorEl,
      isSnackbarOpen, snackbarMessage, snackbarStyle,
      attempts, correct, incorrect,
      startTime,
      isRunning
      } = this.state;

      console.log('running: ', isRunning);

    return (
      <div>
        <AppBar
          title="Abby's Math World"
          onLeftIconButtonTouchTap={this.openMenu}
        />
        <div style={contentStyle}>
          <Popover
            open={isMenuOpen}
            anchorEl={menuAnchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.closeMenu}>
            <Menu operation={operation} digits={digits} onOperationChange={this.updateOperation} onDigitsChange={this.updateDigits} />
          </Popover>
          <Problem firstNumber={firstNumber} secondNumber={secondNumber} operation={operation} answer={answer} onAnswerChange={this.updateAnswer} onCheckAnswer={this.verifyAnswer} />
          <Snackbar
            open={isSnackbarOpen}
            message={snackbarMessage}
            autoHideDuration={3000}
            onRequestClose={this.closeSnackbar}
            bodyStyle={snackbarStyle}
          />
          <div style={scoreContainerStyle}>
            <Velocity attempts={attempts} startTime={startTime} updateVelocity={isRunning} />
            <Divider />
            <Score attempts={attempts} correct={correct} incorrect={incorrect} />
            <div style={{clear: 'both'}}>
              <RaisedButton disabled={!isRunning} label="Stop" secondary style={ButtonStyle} onClick={this.stop} />
              <RaisedButton disabled={isRunning} label="Reset" style={ButtonStyle} onClick={this.reset} />
              <RaisedButton disabled={isRunning} label="Start" primary style={Object.assign({}, ButtonStyle, {marginRight: '10px'})} onClick={this.start} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Builder;
