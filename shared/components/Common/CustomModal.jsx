import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import $ from 'jquery';

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CustomModal';
    this.state = {
      showModal: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  componentDidUpdate() {
    $('.modal-backdrop').css('z-index', '1030').css('height', '100%');
    if (this.props.width !== null) {
      $('.modal-dialog').css('width', this.props.width);
    }
  }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.bodyComponent}
          </Modal.Body>
          <Modal.Footer>
            {this.props.footerComponent}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  bodyComponent: PropTypes.element.isRequired,
  footerComponent: PropTypes.element,
  width: PropTypes.string,
};

export default CustomModal;
