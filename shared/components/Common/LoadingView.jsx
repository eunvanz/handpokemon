import React from 'react';
import Loading from 'react-loading';

const style = {
  textAlign: 'center',
};

class LoadingView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoadingView';
  }
  render() {
    return (
      <div style={style}>
        <Loading type="bubbles" color="#585858"/>
      </div>
    );
  }
}

export default LoadingView;
