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
            <a>
              <i className="menu-icon fa fa-home"></i>
              <span className="menu-text"> 홈 </span>
            </a>
            <b className="arrow"></b>
          </li>
          <li>
            <a>
              <i className="menu-icon fa fa-book"></i>
              <span className="menu-text"> 게임 가이드 </span>
            </a>
            <b className="arrow"></b>
          </li>
          <li>
            <a>
              <i className="menu-icon fa fa-github-alt"></i>
              <span className="menu-text"> 내 콜렉션 </span>
            </a>
            <b className="arrow"></b>
          </li>
          <li>
            <a className="dropdown-toggle">
              <i className="menu-icon fa fa-certificate"></i>
              <span className="menu-text"> 업적과 칭호 </span>
              <b className="arrow fa fa-angle-down"></b>
            </a>
            <ul className="submenu">
              <li>
                <a>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 업적달성 현황 </span>
                </a>
                <b className="arrow"></b>
              </li>
              <li>
                <a>
                  <i className="menu-icon fa fa-caret-right"></i>
                  <span className="menu-text"> 칭호 설정 </span>
                </a>
                <b className="arrow"></b>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
