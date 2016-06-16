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
    this.props.dispatch(Actions.checkAppMounted());
  }
  render() {
    return (
      <div>
        <Header />
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

function mapStateToProps(store) {
  return {
    appMounted: store.appMounted,
  };
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  appMounted: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(App);
