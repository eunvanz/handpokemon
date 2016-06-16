import React, { PropTypes } from 'react';
import CustomModal from '../Common/CustomModal';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MessageModal';
    this.state = {
      showModal: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  render() {
    const bodyComponent = () => {
      return (
        <div className="bootbox-body">{this.props.message}</div>
      );
    };
    const renderCancelBtn = () => {
      if (this.props.cancelBtnTxt) {
        return (
          <button type="button" className="btn btn-default" onClick={this.props.close}>
            {this.props.cancelBtnTxt}
          </button>
        );
      }
    };
    const renderConfirmBtn = () => {
      if (this.props.confirmBtnTxt) {
        return (
          <button type="button" className="btn btn-primary" onClick={this.props.onConfirmClick}>
            {this.props.confirmBtnTxt}
          </button>
        );
      }
    };
    const footerComponent = () => {
      return (
        <div className="clearfix" style={{ textAlign: 'right' }}>
          { renderCancelBtn() }
          { renderConfirmBtn() }
        </div>
      );
    };
    return (
      <div>
        <CustomModal show={this.state.showModal}
          bodyComponent={bodyComponent()}
          footerComponent={footerComponent()}
          close={this.props.close}
          backdrop="static"
          width="300px"
        />
      </div>
    );
  }
}

MessageModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  cancelBtnTxt: PropTypes.string,
  confirmBtnTxt: PropTypes.string.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default MessageModal;
