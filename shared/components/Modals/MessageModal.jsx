import React from 'react';
import CustomModal from '../Common/CustomModal';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MessageModal';
    this.state = {
      showModal: this.props.show,
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
          <button type="button" className="btn btn-default">
            {this.props.cancelBtnTxt}
          </button>
        );
      }
    };
    const renderConfirmBtn = () => {
      if (this.props.confirmBtnText) {
        return (
          <button type="button" className="btn btn-primary" onClick={this.props.onConfirmClick}>
            {this.props.confirmBtnText}
          </button>
        );
      }
    };
    const footerComponent = () => {
      return (
        <div className="clearfix" style={{ textAlign: 'left' }}>
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
        />
      </div>
    );
  }
}

export default MessageModal;
