import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import TimerBadge from '../Common/TimerBadge';
import * as Actions from '../../redux/actions/actions';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideBar';
    this._handleCreditClick = this._handleCreditClick.bind(this);
  }
  render() {
    const renderMyCollection = () => {
      if (this.props.user) {
        return (
          <li>
            <Link to={`/collection/${this.props.user._id}`}>
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
      if (this.props.user) {
        return (
          <TimerBadge
            userCredit={this.props.user.getCredit}
            userInterval={this.props.user.getInterval}
            maxCredit={this.props.user.maxGetCredit}
            lastActionTime={this.props.user.lastGetTime}
          />
        );
      }
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
            <Link to={ this.props.user && this.props.user.getCredit > 0 ? '/get-mon-ready' : '/get-mon-impossible'}>
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
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(SideBar);
