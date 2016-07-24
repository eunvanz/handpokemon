import React, { PropTypes } from 'react';
import * as Actions from '../../redux/actions/actions';
import ErrorView from '../../components/Common/ErrorView';
import { Link } from 'react-router';

class LoginFailView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoginFailView';
    this._showLoginModal = this._showLoginModal.bind(this);
    this._showAccountSearchModal = this._showAccountSearchModal.bind(this);
  }
  _showLoginModal(e) {
    e.preventDefault();
    this.props.dispatch(Actions.showLoginModal());
  }
  _showAccountSearchModal(e) {
    e.preventDefault();
    this.props.dispatch(Actions.showAccountSearchModal());
  }
  render() {
    return (
      <ErrorView
        title="아이디 또는 비밀번호가 잘못됐습니다."
        msg="비밀번호를 잊으셨다면 비밀번호 찾기를 해주세요. 회원이 아니라면 회원가입을 해주세요."
        buttons={
          <div>
            <Link to="/sign-up">
              <button className="btn btn-grey" style={{ marginRight: '4px' }}>
                <i className="ace-icon fa fa-pencil-square-o"></i> 회원가입
              </button>
            </Link>
            <a herf="" onClick={this._showAccountSearchModal}>
              <button className="btn btn-warning">
                <i className="ace-icon fa fa-search"></i> 비밀번호 찾기
              </button>
            </a>
            <a href="" onClick={this._showLoginModal}>
              <button className="btn btn-primary">
                <i className="ace-icon fa fa-key"></i> 로그인
              </button>
            </a>
          </div>
        }
      />
    );
  }
}

LoginFailView.contextTypes = {
  router: React.PropTypes.object,
};

LoginFailView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default LoginFailView;
