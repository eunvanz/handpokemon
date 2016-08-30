import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import TimerBadge from '../Common/TimerBadge';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideBar';
  }
  render() {
    const menu = this.props.menu;
    const renderMyCollection = () => {
      if (this.props.user) {
        return (
          <li className={menu.indexOf('collection') > -1 ? 'active open' : null}>
            <Link to="" className="dropdown-toggle">
              <i className="menu-icon fa fa-github-alt"></i>
              <span className="menu-text"> 콜렉션 </span>
              <b className="arrow fa fa-angle-down"></b>
            </Link>
            <ul className="submenu">
              <li className={menu === 'collection-my' ? 'active' : null}>
                <Link to={`/collection/${this.props.user._id}`}>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 내 콜렉션 </span>
                </Link>
                <b className="arrow"></b>
              </li>
              <li className={menu === 'collection-entry' ? 'active' : null}>
                <Link to={`/entry/${this.props.user._id}`}>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 엔트리 설정 </span>
                </Link>
                <b className="arrow"></b>
              </li>
              <li className={menu === 'collection-mix' ? 'active' : null}>
                <Link to="/mix-mon-ready">
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 교배하기 </span>
                </Link>
                <b className="arrow"></b>
              </li>
              <li className={menu === 'collection-evolute' ? 'active' : null}>
                <Link to="/evolute-mon-ready">
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 진화하기 </span>
                </Link>
                <b className="arrow"></b>
              </li>
            </ul>
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
          <li className={menu === 'home' ? 'active' : null}>
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
          <li className={menu === 'get-mon' ? 'active' : null}>
            <Link to="/get-mon-ready">
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
  menu: store.menu,
});

SideBar.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  menu: PropTypes.string,
};

export default connect(mapStateToProps)(SideBar);
