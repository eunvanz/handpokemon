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
    this._close = this._close.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  componentDidUpdate() {
    $('.modal-backdrop').css('z-index', '1030').css('height', '100%');
    $('.modal-dialog').css('width', this.props.width);
  }
  _close() {
    this.setState({ showModal: false });
  }
  _open() {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this._close}>
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
