import React, { PropTypes } from 'react';
import LoginModal from '../Modals/LoginModal';
import MessageModal from '../../components/Modals/MessageModal';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

import { userImgRoute } from '../../util/constants';

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
    this._showLoginModal = this._showLoginModal.bind(this);
    this._hideLoginModal = this._hideLoginModal.bind(this);
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
    this._handleLogoutClick = this._handleLogoutClick.bind(this);
  }
  _showLoginModal(e) {
    e.preventDefault();
    this.props.dispatch(Actions.showLoginModal());
  }
  _hideLoginModal() {
    this.props.dispatch(Actions.hideLoginModal());
  }
  _handleConfirmClick() {
    this.props.dispatch(Actions.hideMessageModal());
    if (this.props.showMessageModal.confirmAction) this.props.showMessageModal.confirmAction();
  }
  _handleLogoutClick() {
    localStorage.removeItem('token');
    this.props.dispatch(Actions.logout())
    .then(() => this.context.router.push('/'));
    // $.ajax({
    //   url: '/api/logout',
    //   success: () => {
    //     this.context.router.push('/');
    //   },
    // });
  }
  render() {
    const renderLoginComponent = () => {
      let returnComponent = null;
      const user = this.props.user;
      if (user) {
        returnComponent = (
          <ul key="logon" className="nav ace-nav">
            <li className="grey">
              <a data-toggle="dropdown" href="#"
                className="dropdown-toggle"
              >
                <div className="nav-user-photo-container">
                  <div className="focuspoint nav-user-photo" data-focus-x="0" data-focus-y="0">
                    <img className="user-photo"
                      src={`${userImgRoute}/${this.props.user.img}_thumb`}
                    />
                  </div>
                </div>
                <span className="user-info">
                  {this.props.user.nickname}님,<br/>안녕?
                </span>
                <i className="ace-icon fa fa-caret-down"></i>
              </a>
              <ul className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                <li>
                  <a href="">
                    <i className="ace-icon fa fa-cog"></i> 정보수정 및 설정
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a href="" onClick={this._handleLogoutClick}>
                    <i className="ace-icon fa fa-power-off"></i> 로그아웃
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        );
      } else {
        returnComponent = (
          <ul key="logoff" className="nav ace-nav">
            <li className="blue" >
              <a href="" onClick={this._showLoginModal}>
                <i className="ace-icon fa fa-key hidden-xs"></i> 로그인
              </a>
            </li>
            <li className="grey">
              <Link to="/sign-up">
                <i className="ace-icon fa fa-pencil-square-o hidden-xs"></i> 회원가입
              </Link>
            </li>
          </ul>
        );
      }
      return returnComponent;
    };
    return (
      <div id="navbar" className="navbar navbar-default navbar-fixed-top">
        <div className="navbar-container container" id="navbar-container">
          <button type="button" className="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
            <span className="sr-only">Toggle sidebar</span> <span className="icon-bar"></span>
            <span className="icon-bar"></span> <span className="icon-bar"></span>
          </button>
          <div className="navbar-header pull-left">
            <Link to="/" className="navbar-brand" style={style.navbarBrand}>
              <img src="/img/logo.png" style={style.logo}/>
            </Link>
          </div>
          <div className="navbar-buttons navbar-header pull-right" role="navigation">
            {renderLoginComponent()}
          </div>
          <LoginModal show={this.props.showLoginModal} close={this._hideLoginModal}/>
          <MessageModal
            show={this.props.showMessageModal.status}
            message={this.props.showMessageModal.message}
            confirmBtnTxt="확인"
            onConfirmClick={this._handleConfirmClick}
            close={this._hideMessageModal}
          />
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    showLoginModal: store.showLoginModal,
    showMessageModal: store.showMessageModal,
  };
}

Header.propTypes = {
  showLoginModal: PropTypes.bool.isRequired,
  showMessageModal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(Header);
