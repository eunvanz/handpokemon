import React, { PropTypes } from 'react';
import { getClassNameFromHonor } from '../../util/Util';

class HonorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'HonorComponent';
  }
  render() {
    const renderLabels = () => {
      const returnComponent = [];
      if (this.props.honor) returnComponent.push(<span key="1" className={`${getClassNameFromHonor(this.props.honor, this.props.disabled)}`} style={{ marginRight: '1px' }}>{this.props.honor.name}</span>); // eslint-disable-line
      if (this.props.secondHonor) {
        returnComponent.push(<span key="2" className={`${getClassNameFromHonor(this.props.secondHonor, this.props.disabled)}`} style={{ marginRight: '1px' }}>{this.props.secondHonor.name}</span>); // eslint-disable-line
      }
      return returnComponent;
    };
    return (
      <div>
        {renderLabels()}
      </div>
    );
  }
}

HonorComponent.propTypes = {
  honor: PropTypes.object,
  secondHonor: PropTypes.object,
  disabled: PropTypes.bool,
};

export default HonorComponent;
