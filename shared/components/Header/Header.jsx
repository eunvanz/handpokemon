import React from 'react';
import $ from 'jquery';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';
    this.handleHambergerClick = this.handleHambergerClick;
  }
  _handleHamburgerClick() {
    $('.side-bar-container').toggle();
  }
  render() {
    return (
      <div className="header">
        <div className="container">
          <nav className="navbar navbar-inverse" role="navigation">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" onClick={this._handleHamburgerClick}>
                <span className="sr-only">Toggle navigation</span>
              </button>
              <a className="navbar-brand" href="#">
                <img src="/img/logo.png"/>
              </a>
            </div>
            <p className="navbar-text navbar-right hidden-xs">
              <a href="">회원가입</a>
            </p>
            <p className="navbar-text navbar-right hidden-xs">
              <a href="">로그인</a>
            </p>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
