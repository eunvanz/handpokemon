import React from 'react';
import { Link } from 'react-router';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideBar';
  }
  render() {
    // const renderMyCollection = () => {
    //   if (req)
    // };
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
          <li>
            <Link to="/">
              <i className="menu-icon fa fa-github-alt"></i>
              <span className="menu-text"> 내 콜렉션 </span>
            </Link>
            <b className="arrow"></b>
          </li>
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

export default SideBar;
