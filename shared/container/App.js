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
          <SideBar user={this.props.user}/>
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

// App.need = [
//   () => { return Actions.fetchUserSession(); },
// ];

App.contextTypes = {
  router: React.PropTypes.object,
};

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
