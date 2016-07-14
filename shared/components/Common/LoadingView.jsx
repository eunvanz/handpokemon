import React from 'react';
import Loading from 'react-loading';
import $ from 'jquery';

const style = {
  // textAlign: 'center',
  // opacity: '0.5',
  // height: $(window).height(),
  // position: 'relative',
};

const innerStyle = {
  // position: 'relative',
  // left: $('.main-content-inner').width() / 2 - 32,
  // width: '64px',
  // top: $(window).height() / 2 - 32,
};

class LoadingView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoadingView';
  }
  render() {
    return (
      <div style={style}>
        <div style={innerStyle}>
          <Loading type="bubbles" color="#585858"/>
        </div>
      </div>
    );
  }
}

export default LoadingView;
