import React, { PropTypes } from 'react';
import CustomModal from '../Common/CustomModal';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoginModal';
    this.state = {
      showModal: this.props.show,
      email: '',
      password: '',
    };
    this._handleInputChange = this._handleInputChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  _handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
          <label className="inline" style={{ marginTop: '6px' }}> <input type="checkbox" className="ace" name="remember" value="yes"/>
            <span className="lbl"> 아이디 기억하기</span>
          </label>
          <button type="submit" className="width-35 pull-right btn btn-sm btn-primary">
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

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default LoginModal;
