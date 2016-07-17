import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import LoadingView from '../components/Common/LoadingView';
import * as Actions from '../redux/actions/actions';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.dispatch(Actions.showLoading());
    this.props.dispatch(Actions.fetchUserSession())
    .then(this.props.dispatch(Actions.hideLoading()));
    // this.props.dispatch(Actions.fetchUserSession());
    // this.props.dispatch(Actions.hideLoading());
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
            <LoadingView />
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
    loading: store.loading,
  };
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(App);
