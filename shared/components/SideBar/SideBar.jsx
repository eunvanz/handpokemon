import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideBar';
    this.state = {
      user: null,
      getCredit: null,
      restTime: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps.user: ' + nextProps.user);
    if (nextProps.user) {
      this.setState({
        user: nextProps.user,
        getCredit: nextProps.user.getCredit,
      });
      const user = nextProps.user;
      const decrementTime = () => {
        const toMinSec = (restTime) => {
          const min = parseInt((restTime / 60000), 10);
          let sec = parseInt(((restTime - (min * 60000)) / 1000), 10);
          if (sec < 10) sec = `0${sec}`;
          return `${min}:${sec}`;
        };
        const interval = Date.now() - user.lastGetTime;
        const credit = Math.floor(interval / user.getInterval);
        const restTime = interval - credit * user.getInterval;
        this.setState({ restTime: toMinSec(restTime), credit });
      };
      if (this.state.credit < user.maxGetCredit) {
        setInterval(decrementTime(), 1000);
      }
    }
  }
  render() {
    const renderMyCollection = () => {
      if (this.props.user) {
        return (
          <li>
            <Link to={`/collection`}>
              <i className="menu-icon fa fa-github-alt"></i>
              <span className="menu-text"> 내 콜렉션 </span>
            </Link>
            <b className="arrow"></b>
          </li>
        );
      }
    };
    const renderHonor = () => {
      return (
        <li>
          <Link to="" className="dropdown-toggle">
            <i className="menu-icon fa fa-certificate"></i>
            <span className="menu-text"> 업적과 칭호 </span>
            <b className="arrow fa fa-angle-down"></b>
          </Link>
          <ul className="submenu">
            <li>
              <Link to="/">
                <i className="menu-icon fa fa-caret-right"></i>
                <span className="menu-text"> 업적달성 현황 </span>
              </Link>
              <b className="arrow"></b>
            </li>
            <li>
              <Link to="/">
                <i className="menu-icon fa fa-caret-right"></i>
                <span className="menu-text"> 칭호 설정 </span>
              </Link>
              <b className="arrow"></b>
            </li>
          </ul>
        </li>
      );
    };
    const renderGetMonTimeBadge = () => {
      let returnComponent = null;
      const getCredit = this.state.getCredit;
      if (getCredit) {
        if (getCredit > 0) {
          returnComponent = (<span className="badge badge-info" id="credit">{this.state.getCredit}</span>);
        } else {
          returnComponent = (<span className="badge badge-info" id="credit">{this.state.restTime}</span>);
        }
      }
      return returnComponent;
    };
    return (
      <div id="sidebar" className="sidebar responsive sidebar-fixed">
        <ul className="nav nav-list">
          <li>
            <Link to="/">
              <i className="menu-icon fa fa-home"></i>
              <span className="menu-text"> 홈 </span>
            </Link>
            <b className="arrow"></b>
          </li>
          <li>
            <Link to="/">
              <i className="menu-icon fa fa-book"></i>
              <span className="menu-text"> 게임 가이드 </span>
            </Link>
            <b className="arrow"></b>
          </li>
          {renderMyCollection()}
          {renderHonor()}
          <li>
            <Link to="/get-mon">
              <i className="menu-icon fa fa-paw"></i>
              <span className="menu-text"> 포켓몬 채집
                {renderGetMonTimeBadge()}
              </span>
            </Link>
          </li>
          <li>
            <Link to="/mon-list">
              <i className="menu-icon fa fa-github-alt"></i>
              <span className="menu-text"> 포켓몬 리스트 </span>
            </Link>
            <b className="arrow"></b>
          </li>
        </ul>
      </div>
    );
  }
}

SideBar.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
});

SideBar.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(SideBar);
