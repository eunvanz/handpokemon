import React, { PropTypes } from 'react';

class ConditionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ConditionComponent';
  }
  render() {
    const renderComponent = () => {
      const condition = this.props.condition;
      if (condition) {
        let rotateClass = null;
        let colorClass = 'text-danger';
        if (condition === 4) {
          rotateClass = 'rotate-45';
          colorClass = 'text-warning';
        } else if (condition === 3) {
          rotateClass = 'rotate-90';
          colorClass = 'text-success';
        } else if (condition === 2) {
          rotateClass = 'rotate-135';
          colorClass = 'text-info';
        } else if (condition === 1) {
          rotateClass = 'rotate-180';
          colorClass = 'text-muted';
        }
        return (
          <div className="condition-container" style={{ height: '0px' }}>
            <div style={{ position: 'relative', top: '-34px', textAlign: 'right', fontSize: '20px', left: '-4px' }}>
              <i className={`ace-icon fa fa-arrow-circle-up fa-2 ${colorClass} ${rotateClass}`}></i>
            </div>
          </div>
        );
      }
    };
    return (
      <div>
        {renderComponent()}
      </div>
    );
  }
}

ConditionComponent.propTypes = {
  condition: PropTypes.number.isRequired,
};

export default ConditionComponent;
