import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SideBar from '../components/SideBar/SideBar';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container main-container">
          <div className="side-bar-container">
            <SideBar/>
          </div>
          <div className="container main-content">
          { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(App);
