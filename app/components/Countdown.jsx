var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  //use component lifecycle method to manipulate the countdownStatus
  //this function is called automatically after props or state is updated
  //and pass the previous props and previous states
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer)
          this.timer = undefined;
          break;
      }
    }
  },
//   componentWillUpdate: function (nextProps, nextState) {
//
//   },
//
//   //this method get fired when your component first get mounted
//   //render to the screen
// componentWillMount: function () {
//   console.log('componentWillMount');
// },
// //get fired right after everything is reders to the DOM
// componentDidMount: function () {
//     console.log('componentDidMount');
// },

  //this method gets fired by react right before your component
  //is removed from the DOM
 componentWillUnmount: function () {
   clearInterval(this.timer);
   this.timer = undefined;
 },
  startTimer: function () {
      this.timer = setInterval(() => {
        var newCount = this.state.count - 1;
        this.setState({
          count: newCount >= 0 ? newCount : 0
        });

        if (newCount === 0 ) {
          this.setState({countdownStatus: 'stopped'});
        }
      }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },
  handleStatusChange: function (newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  render : function () {
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
      }
    };

    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
    </div>
    );
  }
});

module.exports = Countdown;
