import React, { PropTypes } from 'react';
import CustomModal from '../Common/CustomModal';
import { browserHistory } from 'react-router';
import * as Actions from '../../redux/actions/actions';
import { connect } from 'react-redux';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoginModal';
    this.state = {
      showModal: this.props.show,
      email: '',
      password: '',
      remember: false,
    };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleOnLoginClick = this._handleOnLoginClick.bind(this);
    this._handleRememberClick = this._handleRememberClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  _handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  _handleOnLoginClick() {
    this.props.dispatch(Actions.login(this.state.email, this.state.password, this.state.remember))
    .then(() => {
      this.props.close();
      browserHistory.push('/');
    });
    // $.ajax({
    //   url: '/api/login',
    //   type: 'post',
    //   data: { email: this.state.email, password: this.state.password },
    //   success: (res) => {
    //     if (this.state.remember) {
    //       console.log('res', res);
    //       localStorage.setItem('token', res.token);
    //       // const data = {};
    //       // data.email = this.state.email;
    //       // data.password = this.state.password;
    //       // $.ajax({
    //       //   url: '/api/remember-user',
    //       //   type: 'post',
    //       //   contentType: 'application/json',
    //       //   data: JSON.stringify(data),
    //       //   success: () => {
    //       //     this.props.close();
    //       //     this.props.dispatch(Actions.fetchUserSession());
    //       //     browserHistory.push('/');
    //       //   },
    //       // });
    //     }
    //     this.props.close();
    //     this.props.dispatch(Actions.fetchUserSession());
    //     browserHistory.push('/');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
  }
  _handleRememberClick(e) {
    this.setState({
      remember: e.target.checked,
    });
  }
  render() {
    const bodyComponent = () => {
      return (
        <fieldset>
          <label className="block clearfix">
            <span className="block input-icon input-icon-right">
            <input type="text" className="form-control" placeholder="이메일"
              name="email" value={this.state.email} onChange={this._handleInputChange}
            />
            <i className="ace-icon fa fa-user"></i>
          </span>
          </label>
          <label className="block clearfix">
            <span className="block input-icon input-icon-right">
            <input type="password" className="form-control" placeholder="패스워드"
              name="password" value={this.state.password} onChange={this._handleInputChange}
            />
            <i className="ace-icon fa fa-lock"></i>
          </span>
          </label>
        </fieldset>
      );
    };
    const footerComponent = () => {
      return (
        <div className="clearfix" style={{ textAlign: 'left' }}>
          <label className="inline" style={{ marginTop: '6px' }}>
            <input type="checkbox" className="ace" name="remember" value="yes" id="remember" onClick={this._handleRememberClick}/>
            <span className="lbl"> 자동로그인</span>
          </label>
          <button type="button" className="width-35 pull-right btn btn-sm btn-primary" onClick={this._handleOnLoginClick}>
            <i className="ace-icon fa fa-key"></i> <span className="bigger-110">로그인</span>
          </button>
        </div>
      );
    };
    return (
      <div>
        <CustomModal show={this.state.showModal}
          title="로그인"
          bodyComponent={bodyComponent()}
          footerComponent={footerComponent()}
          width="300px"
          close={this.props.close}
          backdrop
        />
      </div>
    );
  }
}

LoginModal.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    user: store.user,
  };
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(LoginModal);
