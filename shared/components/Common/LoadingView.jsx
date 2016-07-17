import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import $ from 'jquery';
import { connect } from 'react-redux';

class LoadingView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoadingView';
  }
  render() {
    const style = {
      textAlign: 'center',
      opacity: '0.5',
      position: 'relative',
      height: $(window).height() - $('#navbar').height(),
      top: $('.main-content-inner').height() * -1,
    };
    const innerStyle = {
      position: 'relative',
      width: '64px',
      left: $('.main-content-inner').width() / 2 - 32,
      top: $(window).height() / 2 - 32,
    };
    const renderLoadingView = () => {
      let returnComponent = null;
      console.log('this.props.loading', this.props.loading);
      if (this.props.loading) {
        returnComponent = (
          <div id="loading" style={style}>
            <div id="loading-inside" style={innerStyle}>
              <Loading type="bubbles" color="#585858"/>
            </div>
          </div>
        );
      } else {
        returnComponent = (<div></div>);
      }
      return returnComponent;
    };
    return renderLoadingView();
  }
}

LoadingView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  loading: store.loading,
});

LoadingView.propTypes = {
  loading: PropTypes.bool,
};

export default connect(mapStateToProps)(LoadingView);
