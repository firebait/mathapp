import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';


const numberStyle = {
  color: 'rgb(0, 188, 212)',
  fontSize: '62px',
  textAlign: 'center'
};

const velocityLabelStyle = {
  fontSize: '16px',
  fontStyle: 'italic'
}

const messageStyle = {
  marginTop: '20px',
  fontSize: '20px',
  textAlign: 'center',
  marginBottom: '20px'
};

const velocityLowColor = '#F44336';
const velocityNormalColor = '#FFC107';
const velocityHighColor = '#4CAF50';

class Velocity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      velocity: 0
    };
    this.calculateVelocity = this.calculateVelocity.bind(this);
  }

  calculateVelocity () {
    const { attempts, startTime, updateVelocity } = this.props;
    if (!updateVelocity) {
      return;
    }
    const now = new Date();
    const velocity = attempts/((now - startTime)/1000/60); // Attemps per minute.
    this.setState({ velocity });
  }

  componentDidMount() {
    setInterval(() => {
      this.calculateVelocity();
    }, 1000);
  }

  render () {
    const { velocity } = this.state;
    let velocityColor = velocityLowColor;
    let velocityMessage = 'Let\'s pick it up!';
    if (velocity > 10) {
      velocityColor = velocityNormalColor;
      velocityMessage = 'You are doing great!';
    }
    if (velocity > 20) {
      velocityColor = velocityHighColor;
      velocityMessage = 'Look at this rock star!';
    }
    return (
      <div style={{marginTop: '40px', marginBottom: '40px'}}>
        <CircularProgress
          mode="determinate"
          min={0}
          max={60}
          thickness={10}
          size={100}
          color={velocityColor}
          value={velocity}
        />
        <div style={Object.assign({}, numberStyle, {color: velocityColor})}>
          {parseInt(velocity, 10).toLocaleString()} <div style={velocityLabelStyle}>prob/min</div>
        </div>
        <div style={Object.assign({}, messageStyle, {color: velocityColor})}>
          {velocityMessage}
        </div>
      </div>
    );
  }

};

export default Velocity;
