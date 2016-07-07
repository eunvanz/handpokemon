import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import * as Actions from '../redux/actions/actions';
import $ from 'jquery';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  // componentWillMount() {
  //   this.props.dispatch(Actions.fetchUserSession());
  // }
  componentDidMount() {
    $.ajax({
      url: '/api/cookie-user',
      method: 'get',
      success: (res) => {
        if (!res.nouser) {
          $.ajax({
            url: '/api/login',
            method: 'post',
            data: { email: res.email, password: res.password },
            success: () => {
              this.props.dispatch(Actions.fetchUserSession());
            },
          });
        } else {
          this.props.dispatch(Actions.fetchUserSession());
        }
      },
    });
  }
  render() {
    return (
      <div>
        <Header user={this.props.user}/>
        <div className="main-container container" id="main-container">
          <SideBar />
          <div className="main-content">
            <div className="main-content-inner">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

// App.need = [
//   () => { return Actions.fetchUserSession(); },
// ];

function mapStateToProps(store) {
  return {
    user: store.user,
  };
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(App);
