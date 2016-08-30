import React from 'react';
import { connect } from 'react-redux';

let timer = null;
let initRestTime = 0;
class TimerBadge extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'TimerBadge';
    this.state = {
      credit: null,
      restTime: null,
    };
    this._setStates = this._setStates.bind(this);
  }
  componentWillMount() {
    this._setStates(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this._setStates(nextProps);
  }
  _setStates(srcProps) {
    clearInterval(timer);
    const userCredit = srcProps.userCredit;
    const maxCredit = srcProps.maxCredit;
    const userInterval = srcProps.userInterval;
    const lastActionTime = srcProps.lastActionTime;
    this.setState({
      credit: userCredit,
    });
    timer = setInterval(() => {
      const toMinSec = (time) => { // 남은 시간을 '분:초' 형태로 바꿔주는 함수
        const min = parseInt((time / 60000), 10);
        let sec = parseInt(((time - (min * 60000)) / 1000), 10);
        if (sec < 10) sec = `0${sec}`;
        return `${min}:${sec}`;
      };
      const interval = Date.now() - lastActionTime;
      const credit = Math.floor(interval / userInterval);
      if (initRestTime > userInterval || initRestTime <= 0) {
        // restTime을 초기화 시킴
        initRestTime = userInterval - (interval - credit * userInterval);
      } else {
        // 초기화가 이미 되어있다면 감소만 시킴
        initRestTime = initRestTime - 1000;
      }
      this.setState({ restTime: toMinSec(initRestTime), credit: userCredit + credit > maxCredit ? maxCredit : userCredit + credit });
    }, 1000);
  }
  render() {
    const renderBadge = () => {
      let returnComponent = null;
      const { credit, restTime } = this.state;
      if (credit !== (null || undefined)) {
        if (credit > 0) {
          returnComponent = (<span className="badge badge-info" id="credit">{credit}</span>);
        } else {
          returnComponent = (<span className="badge badge-danger" id="credit">{restTime}</span>);
        }
      }
      return returnComponent;
    };
    return (
      <div>{renderBadge()}</div>
    );
  }
}

TimerBadge.contextTypes = {
  router: React.PropTypes.object,
};

TimerBadge.propTypes = {
  userCredit: React.PropTypes.number,
  userInterval: React.PropTypes.number,
  maxCredit: React.PropTypes.number,
  lastActionTime: React.PropTypes.number,
  // dispatch: React.PropTypes.func,
};

const mapStateToProps = (store) => ({
  user: store.user,
});

export default connect(mapStateToProps)(TimerBadge);
// export default TimerBadge;
