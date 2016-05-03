import React from 'react';
import LoginModal from '../LoginModal/LoginModal';

const style = {
  navbarBrand: {
    padding: '2px 12px',
  },
  logo: {
    height: '40px',
  },
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';
    this.state = {
      showLoginModal: false,
    };
    this._showLoginModal = this._showLoginModal.bind(this);
  }
  _showLoginModal() {
    this.setState({ showLoginModal: true });
  }
  render() {
    return (
      <div id="navbar" className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-container container" id="navbar-container">
          <button type="button" className="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
            <span className="sr-only">Toggle sidebar</span> <span className="icon-bar"></span>
            <span className="icon-bar"></span> <span className="icon-bar"></span>
          </button>
          <div className="navbar-header pull-left">
            <a href="main.do" className="navbar-brand" style={style.navbarBrand}>
              <img src="/img/logo.png" style={style.logo}/>
            </a>
          </div>
          <div className="navbar-buttons navbar-header pull-right" role="navigation">
            <ul className="nav ace-nav">
              <li className="blue" ><a href="#fakeLink" onClick={this._showLoginModal}>
                <i className="ace-icon fa fa-key hidden-xs"></i> 로그인</a>
              </li>
              <li className="grey">
                <a href="main.do?action=registerForm">
                  <i className="ace-icon fa fa-pencil-square-o hidden-xs"></i> 회원가입
                </a>
              </li>
            </ul>
          </div>
        <LoginModal show={this.state.showLoginModal}/>
        </div>
      </div>
    );
  }
}

export default Header;
