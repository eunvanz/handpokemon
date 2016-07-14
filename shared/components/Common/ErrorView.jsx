import React, { PropTypes } from 'react';

class ErrorView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ErrorView';
  }
  render() {
    const renderButtons = () => {
      if (this.props.buttons) {
        return (
          <div>
            <hr />
            <div className="space" />
            <div className="center">
              {this.props.buttons}
            </div>
          </div>
        );
      }
    };
    return (
      <div className="error-container">
        <div className="well">
          <h1 className="grey lighter smaller">
            <span className="blue bigger-125"> OOPS!
            </span>
          </h1>
          <hr />
          <h3 className="lighter smaller">{this.props.title}</h3>
          <div>
            <div className="space"></div>
            <h4 className="smaller">{this.props.msg}</h4>
          </div>
          {renderButtons()}
        </div>
      </div>
    );
  }
}

ErrorView.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  buttons: PropTypes.element,
};

export default ErrorView;
