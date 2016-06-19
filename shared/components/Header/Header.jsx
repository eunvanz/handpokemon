import React, { PropTypes } from 'react';
import LoginModal from '../Modals/LoginModal';
import MessageModal from '../../components/Modals/MessageModal';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

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
    this._hideMessageModal = this._hideMessageModal.bind(this);
  }
  componentWillMount() {
    // this.props.dispatch(Actions.getUserSession());
  }
  _showLoginModal(e) {
    e.preventDefault();
    this.props.dispatch(Actions.showLoginModal());
  }
  _hideLoginModal() {
    this.props.dispatch(Actions.hideLoginModal());
  }
  _hideMessageModal() {
    this.props.dispatch(Actions.hideMessageModal());
  }
  render() {
    const renderLoginComponent = () => {
      const returnComponent = [];
      const session = this.props.session;
      if (session.user) {
        console.log('session.user: ' + session.user);
        returnComponent.push(<div> {session.user} </div>);
      } else {
        returnComponent.push(
          <div className="navbar-buttons navbar-header pull-right" role="navigation">
            <ul className="nav ace-nav">
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
          </div>
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
        <LoginModal show={this.props.showLoginModal} close={this._hideLoginModal}/>
        <MessageModal
          show={this.props.showMessageModal.status}
          message={this.props.showMessageModal.message}
          confirmBtnTxt="확인"
          onConfirmClick={this._hideMessageModal}
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
    session: store.session,
  };
}

Header.propTypes = {
  showLoginModal: PropTypes.bool.isRequired,
  showMessageModal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.object,
};

export default connect(mapStateToProps)(Header);
