import React from 'react';
import MonsterModal from './MonsterModal';

class MonsterCard extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterCard';
    this.state = {
      showMonsterModal: false,
    };
    this._showMonsterModal = this._showMonsterModal.bind(this);
    this._hideMonsterModal = this._hideMonsterModal.bind(this);
  }
  _showMonsterModal(e) {
    e.preventDefault();
    this.setState({ showMonsterModal: true });
  }
  _hideMonsterModal() {
    this.setState({ showMonsterModal: false });
  }
  render() {
    const getLevelLabelComponent = () => {
      if (this.props.monster.level != null) {
        return (
          <span className="label label-info arrowed-in-right label-level">
            {`LV.${this.props.monster.level}`}
          </span>
        );
      }
    };
    const getRecentLabelComponent = () => {
      if (this.props.monster.monNo == recentMonNo) {
        return (
          <span className="badge badge-danger badge-new lead"><b>NEW</b></span>
        );
      }
    };
    const getCostComponent = () => {
      let itemDom = [];
      const cost = this.props.monster.cost;
      let fullStar = null;
      let emptyStar = null;
      if (cost <= 5) {
        fullStar = <i className="fa fa-star fa-2"></i>;
        emptyStar = <i className="fa fa-star-o fa-2"></i>;
      } else {
        fullStar = <i className="fa fa-star fa-2 text-gold"></i>;
        emptyStar = <i className="fa fa-star fa-2"></i>;
      }
      for (let i = 0; i < 5; i++) {
        if (i < cost % 5) {
          itemDom.push(fullStar);
        } else {
          itemDom.push(emptyStar);
        }
      }
      return itemDom;
    };
    const getAttrComponent = () => {
      let itemDom = [];
      const grade = this.props.monster.grade;
      const mainAttr = this.props.monster.mainAttr;
      const subAttr = this.props.monster.subAttr;
      let gradeLabel = null;
      let mainAttrLabel = null;
      let subAttrLabel = null;
      if (grade === 'b') {
        gradeLabel = <span className="label label-sm label-yellow arrowed-right" style={{ marginRight: '1px' }}>BA</span>;
      } else if (grade === 'a') {
        gradeLabel = <span className="label label-sm label-adv arrowed-right" style={{ marginRight: '1px' }}>AD</span>;
      } else if (grade === 'r') {
        gradeLabel = <span className="label label-sm label-rare arrowed-right" style={{ marginRight: '1px' }}>RA</span>;
      } else if (grade === 'ar') {
        gradeLabel = <span className="label label-sm label-advr arrowed-right" style={{ marginRight: '1px' }}>AR</span>;
      } else if (grade === 'e') {
        gradeLabel = <span className="label label-sm label-elite arrowed-right" style={{ marginRight: '1px' }}>EL</span>;
      } else if (grade === 'l') {
        gradeLabel = <span className="label label-sm label-limited arrowed-right" style={{ marginRight: '1px' }}>LE</span>;
      }
      if (mainAttr === '노말') {
        mainAttrLabel = <span className="label label-sm label-grey arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '불꽃') {
        mainAttrLabel = <span className="label label-sm label-danger arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '물') {
        mainAttrLabel = <span className="label label-sm label-primary arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '전기') {
        mainAttrLabel = <span className="label label-sm label-warning arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '풀') {
        mainAttrLabel = <span className="label label-sm label-success arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '얼음') {
        mainAttrLabel = <span className="label label-sm label-info arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '비행') {
        mainAttrLabel = <span className="label label-sm label-light arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '요정') {
        mainAttrLabel = <span className="label label-sm label-pink arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '땅') {
        mainAttrLabel = <span className="label label-sm label-inverse arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '독') {
        mainAttrLabel = <span className="label label-sm label-purple arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '격투') {
        mainAttrLabel = <span className="label label-sm label-fighter arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '염력') {
        mainAttrLabel = <span className="label label-sm label-esper arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '벌레') {
        mainAttrLabel = <span className="label label-sm label-bug arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '바위') {
        mainAttrLabel = <span className="label label-sm label-rock arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '유령') {
        mainAttrLabel = <span className="label label-sm label-ghost arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '용') {
        mainAttrLabel = <span className="label label-sm label-dragon arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '악') {
        mainAttrLabel = <span className="label label-sm label-evil arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '강철') {
        mainAttrLabel = <span className="label label-sm label-iron arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      }
      if (subAttr === '노말') {
        subAttrLabel = <span className="label label-sm label-grey arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '불꽃') {
        subAttrLabel = <span className="label label-sm label-danger arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '물') {
        subAttrLabel = <span className="label label-sm label-primary arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '전기') {
        subAttrLabel = <span className="label label-sm label-warning arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '풀') {
        subAttrLabel = <span className="label label-sm label-success arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '얼음') {
        subAttrLabel = <span className="label label-sm label-info arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '비행') {
        subAttrLabel = <span className="label label-sm label-light arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '요정') {
        subAttrLabel = <span className="label label-sm label-pink arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '땅') {
        subAttrLabel = <span className="label label-sm label-inverse arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '독') {
        subAttrLabel = <span className="label label-sm label-purple arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '격투') {
        subAttrLabel = <span className="label label-sm label-fighter arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '염력') {
        subAttrLabel = <span className="label label-sm label-esper arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '벌레') {
        subAttrLabel = <span className="label label-sm label-bug arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '바위') {
        subAttrLabel = <span className="label label-sm label-rock arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '유령') {
        subAttrLabel = <span className="label label-sm label-ghost arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '용') {
        subAttrLabel = <span className="label label-sm label-dragon arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '악') {
        subAttrLabel = <span className="label label-sm label-evil arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '강철') {
        subAttrLabel = <span className="label label-sm label-iron arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      }
      itemDom.push(gradeLabel, mainAttr, subAttr);
      return itemDom;
    };
    return (
      <div>
        <div className="col-xs-6 col-sm-3 collection-item text-center">
          <div className="profile-picture" style={{ margin: '10px', width: '80%' }}>
            <div className="pick-image-container">
              <p>
                <img className="picks" src={`/img/monsters/${this.props.monster.img}`}
                  width="100%"
                  onClick={this._showMonsterModal}
                />
              </p>
            </div>
            {getLevelLabelComponent()}
            {getRecentLabelComponent()}
            <p className="cost">
              {getCostComponent()}
            </p>
            <p>
              {getAttrComponent()}
            </p>
          </div>
          <div className="space"></div>
        </div>
        <MonsterModal
          monster={this.props.monster}
          show={this.state.showMonsterModal}
          close={this._hideMonsterModal}
        />
      </div>
    );
  }
}

export default MonsterCard;
