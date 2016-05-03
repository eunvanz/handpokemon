import React from 'react';
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
            동적으로 변하는 뷰
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
