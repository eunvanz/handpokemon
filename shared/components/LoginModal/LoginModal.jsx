import React from 'react';
import CustomModal from '../Common/CustomModal';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoginModal';
    this.state = {
      showModal: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  render() {
    const bodyComponent = () => {
      return (
        <fieldset>
          <label className="block clearfix">
            <span className="block input-icon input-icon-right">
            <input type="text" className="form-control" placeholder="이메일"
              ref={(email) => this._email = email}
            />
            <i className="ace-icon fa fa-user"></i>
          </span>
          </label>
          <label className="block clearfix">
            <span className="block input-icon input-icon-right">
            <input type="password" className="form-control" placeholder="패스워드"
              ref={(password) => this._password = password}
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
        />
      </div>
    );
  }
}

export default LoginModal;
