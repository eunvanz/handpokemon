import React from 'react';

class WidgetBox extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'WidgetBox';
  }
  render() {
    return (
      <div>
        <div className="widget-box">
          <div className="widget-header widget-header-blue widget-header-flat">
            <h4 className="widget-title lighter">{this.props.title}</h4>
          </div>
          <div className="widget-body">
            <div className="widget-main">
              {this.props.body}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WidgetBox;
