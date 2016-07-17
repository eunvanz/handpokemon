import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as Actions from '../../redux/actions/actions';
import ErrorView from '../../components/Common/ErrorView';

export default (ComposedComponent) => {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      this.displayName = 'Authentication';
      this._showLoginModal = this._showLoginModal.bind(this);
    }
    _showLoginModal(e) {
      e.preventDefault();
      this.props.dispatch(Actions.showLoginModal());
    }
    render() {
      let returnComponent = null;
      if (!this.props.user) {
        returnComponent = (
          <ErrorView
            title="로그인이 필요한 메뉴입니다."
            msg="로그인 후 이용해주세요. 회원이 아니라면 회원가입을 해주세요."
            buttons={
              <div>
                <Link to="/sign-up">
                  <button className="btn btn-grey" style={{ marginRight: '4px' }}>
                    <i className="ace-icon fa fa-pencil-square-o"></i> 회원가입
                  </button>
                </Link>
                <a href="" onClick={this._showLoginModal}>
                  <button className="btn btn-primary">
                    <i className="ace-icon fa fa-key"></i> 로그인
                  </button>
                </a>
              </div>
            }
          />
        );
      } else {
        returnComponent = <ComposedComponent {...this.props} />;
      }
      return returnComponent;
    }
  }

  Authentication.contextTypes = {
    router: PropTypes.object,
  };

  const mapStateToProps = (store) => {
    return { user: store.user };
  };

  Authentication.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
  };

  return connect(mapStateToProps)(Authentication);
};
