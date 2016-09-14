import React, { PropTypes } from 'react';

class CostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CostComponent';
  }
  render() {
    const renderComponent = () => {
      const itemDom = [];
      const cost = this.props.cost;
      let fullStar = null;
      let emptyStar = null;
      let key = 0;
      for (let i = 0; i < 5; i++) {
        if (cost <= 5) {
          fullStar = <i key={key++} className="fa fa-star fa-2"></i>;
          emptyStar = <i key={key++} className="fa fa-star-o fa-2"></i>;
        } else {
          fullStar = <i key={key++} className="fa fa-star fa-2 text-gold"></i>;
          emptyStar = <i key={key++} className="fa fa-star fa-2"></i>;
        }
        if (cost === 5 || cost === 10) {
          itemDom.push(fullStar);
        } else if (i < cost % 5) {
          itemDom.push(fullStar);
        } else {
          itemDom.push(emptyStar);
        }
      }
      return itemDom;
    };
    return (
      <div>
        {renderComponent()}
      </div>
    );
  }
}

CostComponent.propTypes = {
  cost: PropTypes.number.isRequired,
};

export default CostComponent;
