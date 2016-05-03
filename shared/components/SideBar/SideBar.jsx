import React from 'react';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideBar';
  }
  render() {
    return (
      <div id="sidebar" className="sidebar responsive sidebar-fixed">
        <ul className="nav nav-list">
          <li>
            <i className="menu-icon fa fa-home"></i>
            <span className="menu-text"> 홈 </span>
            <b className="arrow"></b>
          </li>
          <li>
            <i className="menu-icon fa fa-book"></i>
            <span className="menu-text"> 게임 가이드 </span>
            <b className="arrow"></b>
          </li>
          <li>
            <i className="menu-icon fa fa-github-alt"></i>
            <span className="menu-text"> 내 콜렉션 </span>
            <b className="arrow"></b>
          </li>
          <li>
            <i className="menu-icon fa fa-certificate"></i>
            <span className="menu-text"> 업적과 칭호 </span>
            <b className="fa fa-angle-down"></b>
          </li>
          <ul className="submenu">
            <li>
              <i className="menu-icon fa fa-caret-right"></i>
              <span className="menu-text"> 업적달성 현황 </span>
              <b className="fa fa-angle-down"></b>
            </li>
            <li>
              <i className="menu-icon fa fa-caret-right"></i>
              <span className="menu-text"> 칭호 설정 </span>
              <b className="fa fa-angle-down"></b>
            </li>
          </ul>
        </ul>
      </div>
    );
  }
}

export default SideBar;
