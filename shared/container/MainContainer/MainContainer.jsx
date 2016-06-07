import React, { PropTypes } from 'react';
import SideBar from '../../components/SideBar/SideBar';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MainContainer';
  }
  render() {
    return (
      <div className="main-container container" id="main-container">
        <SideBar />
        <div className="main-content">
          <div className="main-content-inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainContainer;
