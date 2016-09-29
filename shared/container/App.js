import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import * as Actions from '../redux/actions/actions';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.dispatch(Actions.fetchUserSession());
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
          <div className="footer hidden-xs">
            <div className="footer-inner">
              <div className="footer-content">
                <span>크롬 브라우저 최신버전에 최적화 되어있습니다.</span>
                <span className="bigger-120">
                  <span className="blue bolder">Hand Pokemon</span> &copy; 2016
                </span>
              </div>
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
