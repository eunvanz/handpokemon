import React, { PropTypes } from 'react';

class StatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'StatusComponent';
  }
  render() {
    const renderComponent = () => {
      const status = this.props.status;
      const entry = this.props.entry;
      let iconClass = 'fa-battery-full';
      let colorClass = 'text-primary';
      if (status === 1) {
        iconClass = 'fa-battery-half';
        colorClass = 'text-warining';
      } else if (status === 0) {
        iconClass = 'fa-battery-empty';
        colorClass = 'text-danger';
      } else if (entry !== 0) {
        iconClass = 'fa-paw';
        colorClass = 'text-success';
      }
      return (
        <div className="status-container" style={{ height: '0px' }}>
          <div style={{ position: 'relative', top: '-34px', textAlign: 'left', fontSize: '20px', left: '4px' }}>
            <i className={`ace-icon fa ${iconClass} ${colorClass}`}></i>
          </div>
        </div>
      );
    };
    return (
      <div>
        {renderComponent()}
      </div>
    );
  }
}

StatusComponent.propTypes = {
  status: PropTypes.number.isRequired,
  entry: PropTypes.number.isRequired,
};

export default StatusComponent;
