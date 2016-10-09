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
          <li className={menu.startsWith('collection') ? 'active open' : null}>
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
        <li className={menu.startsWith('honor') ? 'active open' : null}>
          <Link to="" className="dropdown-toggle">
            <i className="menu-icon fa fa-certificate"></i>
            <span className="menu-text"> 업적과 칭호 </span>
            <b className="arrow fa fa-angle-down"></b>
          </Link>
          <ul className="submenu">
            <li className={menu === 'honor-mission-state' ? 'active' : null}>
              <Link to="/honor-mission-state">
                <i className="menu-icon fa fa-caret-right"></i>
                <span className="menu-text"> 업적달성 현황 </span>
              </Link>
              <b className="arrow"></b>
            </li>
            <li className={menu === 'honor-set-honor' ? 'active' : null}>
              <Link to="/honor-set-honor">
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
    const renderBattle = () => {
      if (this.props.user) {
        return (
          <li className={menu.indexOf('battle') > -1 ? 'active open' : null}>
            <Link to="" className="dropdown-toggle">
              <i className="menu-icon fa fa-gamepad"></i>
              <span className="menu-text"> 포켓몬 시합 </span>
              <b className="arrow fa fa-angle-down"></b>
            </Link>
            <ul className="submenu">
              <li className={menu === 'battle-story' ? 'active' : null}>
                <Link to={`/story/${this.props.user._id}`}>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 싱글 플레이 </span>
                </Link>
                <b className="arrow"></b>
              </li>
              <li className={menu === 'battle-league' ? 'active' : null}>
                <Link to={`/league-battle-ready`}>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 포켓몬 리그 </span>
                </Link>
                <b className="arrow"></b>
              </li>
            </ul>
          </li>
        );
      }
    };
    const renderRanking = () => {
      if (this.props.user) {
        return (
          <li className={menu.indexOf('ranking') > -1 ? 'active open' : null}>
            <Link to="" className="dropdown-toggle">
              <i className="menu-icon fa fa-bookmark"></i>
              <span className="menu-text"> 랭킹 </span>
              <b className="arrow fa fa-angle-down"></b>
            </Link>
            <ul className="submenu">
              <li className={menu === 'ranking-collection' ? 'active' : null}>
                <Link to={'/ranking-collection'}>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 콜렉션 랭킹 </span>
                </Link>
                <b className="arrow"></b>
              </li>
              <li className={menu === 'ranking-battle' ? 'active' : null}>
                <Link to={'/ranking-battle'}>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 시합 랭킹 </span>
                </Link>
                <b className="arrow"></b>
              </li>
              <li className={menu === 'ranking-pokemon' ? 'active' : null}>
                <Link to={'/ranking-pokemon'}>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 포켓몬 랭킹 </span>
                </Link>
                <b className="arrow"></b>
              </li>
            </ul>
          </li>
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
          {renderRanking()}
          <li className={menu === 'get-mon' ? 'active' : null}>
            <Link to="/get-mon-ready">
              <i className="menu-icon fa fa-paw"></i>
              <span className="menu-text"> 포켓몬 채집
                {renderGetMonTimeBadge()}
              </span>
            </Link>
          </li>
          {renderBattle()}
          <li className={menu === 'workshop' ? 'active' : null}>
            <Link to="/workshop">
              <i className="menu-icon fa fa-paint-brush"></i>
              <span className="menu-text"> 포켓몬 공작소 </span>
            </Link>
            <b className="arrow"></b>
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
