import React, { PropTypes } from 'react';

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ContentView';
  }
  render() {
    return (
      <div id={this.props.wrapperId}>
        <div className="page-content">
          <div className="page-header">
            <h1>{this.props.title}</h1>
          </div>
          <div>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

ContentView.contextTypes = {
  router: React.PropTypes.object,
};

ContentView.propTypes = {
  wrapperId: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.object,
};

export default ContentView;
