import React, { PropTypes } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap'
import keygen from 'keygenerator';

class HelpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'HelpComponent';
  }
  render() {
    const popover = (
      <Popover id={keygen._()} title={this.props.title || null}>
        {this.props.content}
      </Popover>
    );
    return (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement={this.props.placement || 'bottom'}
        overlay={popover}
      >
        <small> <i className="fa fa-question-circle-o text-muted" style={{ cursor: 'pointer' }}/></small>
      </OverlayTrigger>
    );
  }
}

HelpComponent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  placement: PropTypes.string,
};

export default HelpComponent;
