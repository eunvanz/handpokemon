import React, { PropTypes } from 'react';
import HelpComponent from './HelpComponent';

class CostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CostComponent';
  }
  render() {
    const renderCostHelpComponent = (key) => {
      if (this.props.withHelp) {
        return (
          <HelpComponent
            key={key}
            title="코스트"
            content="일반적으로 코스트가 높을수록 전투력도 높습니다. 하지만 각 리그별로 엔트리를 구성할 수 있는 최대 코스트가 제한돼있으므로 효율적으로 구성해야합니다."
          />
        );
      }
      return null;
    };
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
      itemDom.push(renderCostHelpComponent(key));
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
  withHelp: PropTypes.bool,
};

export default CostComponent;
