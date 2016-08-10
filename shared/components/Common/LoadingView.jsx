import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import $ from 'jquery';
import { connect } from 'react-redux';

class LoadingView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LoadingView';
  }
  componentDidMount() {
    const scriptSrcs = ['/js/inline/loading-view.js'];
    for (const src of scriptSrcs) {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    }
  }
  render() {
    const getWindowHeight = () => {
      if ($(window)) {
        return $(window).height();
      }
      return 0;
    };
    const windowHeight = getWindowHeight();
    const style = {
      textAlign: 'center',
      opacity: '0.5',
      position: 'relative',
      height: windowHeight - $('#navbar').height(),
      top: $('#navbar-container').height() * -1,
    };
    const innerStyle = {
      position: 'relative',
      width: '64px',
      left: $('.main-content-inner').width() / 2 - 32,
      top: windowHeight / 2 - 32,
    };
    const renderLoadingView = () => {
      let returnComponent = null;
      if (this.props.loading) {
        returnComponent = (
          <div id="loading" style={style}>
            <div id="loading-inside" style={innerStyle}>
              <Loading type="spin" color="#585858"/>
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
