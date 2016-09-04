import React, { PropTypes } from 'react';
import MonsterModal from './MonsterModal';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as Actions from '../../redux/actions/actions';
import { browserHistory } from 'react-router';

class MonsterCard extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterCard';
    this.state = {
      showMonsterModal: false,
      selected: false,
    };
    this._showMonsterModal = this._showMonsterModal.bind(this);
    this._hideMonsterModal = this._hideMonsterModal.bind(this);
    this._checkItem = this._checkItem.bind(this);
    this._uncheckItem = this._uncheckItem.bind(this);
    this._changeEntry = this._changeEntry.bind(this);
  }
  _showMonsterModal(e) {
    e.preventDefault();
    this.setState({ showMonsterModal: true });
  }
  _hideMonsterModal() {
    this.setState({ showMonsterModal: false });
  }
  _checkItem() {
    if (this.props.selectedMons.length >= this.props.maxSelectable) {
      alert(`이미 ${this.props.maxSelectable}마리를 선택했습니다.`);
    } else {
      this.setState({ selected: true });
      this.props.dispatch(Actions.addSelectedMon(this.props.monster));
    }
  }
  _uncheckItem() {
    this.setState({ selected: false });
    this.props.dispatch(Actions.removeSelectedMon(this.props.monster));
  }
  _changeEntry() {
    // 교체하고자 하는 포켓몬 저장
    this.props.dispatch(Actions.addEntryAsIs(this.props.entryNo, this.props.monster));
    browserHistory.push('/entry-ready');
  }
  render() {
    const renderLevelLabelComponent = () => {
      if (this.props.monster.level) {
        return (
          <span className="label label-info arrowed-in-right label-level">
            {`LV. ${this.props.monster.level}`}
          </span>
        );
      }
    };
    const renderRecentLabelComponent = () => {
      if (this.props.recentMon) {
        return (
          <span className="badge badge-danger badge-new lead"><b>NEW</b></span>
        );
      }
    };
    const renderCostComponent = () => {
      if (this.props.monster) {
        const itemDom = [];
        const cost = this.props.monster.cost;
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
      }
      return (
        <div>
          <i className="fa fa-star-o fa2"></i>
          <i className="fa fa-star-o fa2"></i>
          <i className="fa fa-star-o fa2"></i>
          <i className="fa fa-star-o fa2"></i>
          <i className="fa fa-star-o fa2"></i>
        </div>
      );
    };
    const renderAttrComponent = () => {
      if (this.props.monster) {
        const itemDom = [];
        const grade = this.props.monster.grade;
        const mainAttr = this.props.monster.mainAttr;
        const subAttr = this.props.monster.subAttr;
        let gradeLabel = null;
        let mainAttrLabel = null;
        let subAttrLabel = null;
        const endLabel = 'arrowed-in';
        const continueLabel = 'arrowed-in arrowed-right';
        if (grade === 'b') {
          if (subAttr !== '없음') {
            gradeLabel = <span key="1" className="label label-sm label-yellow arrowed-right" style={{ marginRight: '1px' }}>BA</span>;
          } else {
            gradeLabel = <span key="1" className="label label-sm label-yellow arrowed-right" style={{ marginRight: '1px' }}>BASIC</span>;
          }
        } else if (grade === 'a') {
          if (subAttr !== '없음') {
            gradeLabel = <span key="1" className="label label-sm label-adv arrowed-right" style={{ marginRight: '1px' }}>SP</span>;
          } else {
            gradeLabel = <span key="1" className="label label-sm label-adv arrowed-right" style={{ marginRight: '1px' }}>SPECIAL</span>;
          }
        } else if (grade === 'r') {
          if (subAttr !== '없음') {
            gradeLabel = <span key="1" className="label label-sm label-rare arrowed-right" style={{ marginRight: '1px' }}>RA</span>;
          } else {
            gradeLabel = <span key="1" className="label label-sm label-rare arrowed-right" style={{ marginRight: '1px' }}>RARE</span>;
          }
        } else if (grade === 'ar') {
          if (subAttr !== '없음') {
            gradeLabel = <span key="1" className="label label-sm label-advr arrowed-right" style={{ marginRight: '1px' }}>SR</span>;
          } else {
            gradeLabel = <span key="1" className="label label-sm label-advr arrowed-right" style={{ marginRight: '1px' }}>S.RARE</span>;
          }
        } else if (grade === 'e') {
          if (subAttr !== '없음') {
            gradeLabel = <span key="1" className="label label-sm label-elite arrowed-right" style={{ marginRight: '1px' }}>EL</span>;
          } else {
            gradeLabel = <span key="1" className="label label-sm label-elite arrowed-right" style={{ marginRight: '1px' }}>ELITE</span>;
          }
        } else if (grade === 'l') {
          if (subAttr !== '없음') {
            gradeLabel = <span key="1" className="label label-sm label-limited arrowed-right" style={{ marginRight: '1px' }}>LE</span>;
          } else {
            gradeLabel = <span key="1" className="label label-sm label-limited arrowed-right" style={{ marginRight: '1px' }}>LEGEND</span>;
          }
        }
        if (mainAttr === '노말') {
          mainAttrLabel = <span key="2" className={`label label-sm label-grey ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '불꽃') {
          mainAttrLabel = <span key="2" className={`label label-sm label-danger ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '물') {
          mainAttrLabel = <span key="2" className={`label label-sm label-primary ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '전기') {
          mainAttrLabel = <span key="2" className={`label label-sm label-warning ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '풀') {
          mainAttrLabel = <span key="2" className={`label label-sm label-success ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '얼음') {
          mainAttrLabel = <span key="2" className={`label label-sm label-info ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '비행') {
          mainAttrLabel = <span key="2" className={`label label-sm label-light ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '요정') {
          mainAttrLabel = <span key="2" className={`label label-sm label-pink ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '땅') {
          mainAttrLabel = <span key="2" className={`label label-sm label-inverse ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '독') {
          mainAttrLabel = <span key="2" className={`label label-sm label-purple ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '격투') {
          mainAttrLabel = <span key="2" className={`label label-sm label-fighter ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '염력') {
          mainAttrLabel = <span key="2" className={`label label-sm label-esper ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '벌레') {
          mainAttrLabel = <span key="2" className={`label label-sm label-bug ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '바위') {
          mainAttrLabel = <span key="2" className={`label label-sm label-rock ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '유령') {
          mainAttrLabel = <span key="2" className={`label label-sm label-ghost ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '용') {
          mainAttrLabel = <span key="2" className={`label label-sm label-dragon ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '악') {
          mainAttrLabel = <span key="2" className={`label label-sm label-evil ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        } else if (mainAttr === '강철') {
          mainAttrLabel = <span key="2" className={`label label-sm label-iron ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
        }
        if (subAttr === '노말') {
          subAttrLabel = <span key="3" className="label label-sm label-grey arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '불꽃') {
          subAttrLabel = <span key="3" className="label label-sm label-danger arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '물') {
          subAttrLabel = <span key="3" className="label label-sm label-primary arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '전기') {
          subAttrLabel = <span key="3" className="label label-sm label-warning arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '풀') {
          subAttrLabel = <span key="3" className="label label-sm label-success arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '얼음') {
          subAttrLabel = <span key="3" className="label label-sm label-info arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '비행') {
          subAttrLabel = <span key="3" className="label label-sm label-light arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '요정') {
          subAttrLabel = <span key="3" className="label label-sm label-pink arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '땅') {
          subAttrLabel = <span key="3" className="label label-sm label-inverse arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '독') {
          subAttrLabel = <span key="3" className="label label-sm label-purple arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '격투') {
          subAttrLabel = <span key="3" className="label label-sm label-fighter arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '염력') {
          subAttrLabel = <span key="3" className="label label-sm label-esper arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '벌레') {
          subAttrLabel = <span key="3" className="label label-sm label-bug arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '바위') {
          subAttrLabel = <span key="3" className="label label-sm label-rock arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '유령') {
          subAttrLabel = <span key="3" className="label label-sm label-ghost arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '용') {
          subAttrLabel = <span key="3" className="label label-sm label-dragon arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '악') {
          subAttrLabel = <span key="3" className="label label-sm label-evil arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        } else if (subAttr === '강철') {
          subAttrLabel = <span key="3" className="label label-sm label-iron arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
        }
        itemDom.push(gradeLabel, mainAttrLabel, subAttrLabel);
        return itemDom;
      }
      return (<span className="label label-sm label-default">엔트리없음</span>);
    };
    const renderCheckComponent = () => {
      if (this.state.selected) {
        return (
          <div className="check-container" style={{ height: '0px' }}>
            <div className="check"
              style={{ position: 'relative', cursor: 'pointer', top: $('.picks').height() * -1 - 10 }}
              onClick={this._uncheckItem}
            >
              <img className="check" src="/img/common/check.png" width="100%"/>
            </div>
          </div>
        );
      }
    };
    const renderConditionComponent = () => {
      const condition = this.props.monster.condition;
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
    const renderStatusComponent = () => {
      const status = this.props.monster.status;
      const entry = this.props.monster.entry;
      if (status !== undefined) {
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
      }
    };
    const renderSelectBtnComponent = () => {
      if (this.props.selectable) {
        if (this.state.selected) {
          return (
            <p><button onClick={this._uncheckItem} className="btn btn-sm btn-danger"><i className="ace-icon fa fa-times"></i> 선택해제</button></p>
          );
        }
        return (
          <p><button onClick={this._checkItem} className="btn btn-sm btn-warning"><i className="ace-icon fa fa-check"></i> 선택하기</button></p>
        );
      }
    };
    const renderImgComponent = () => {
      let imgSrc = null;
      let onClickFunc = null;
      let className = null;
      if (this.props.monster) {
        imgSrc = `/img/monsters/${this.props.monster.img}`;
        onClickFunc = this._showMonsterModal;
        className = 'picks';
      } else {
        imgSrc = '/img/monsters/nomonster.png';
      }
      return (
        <div className="pick-image-container">
          <p>
            <img className={className} src={imgSrc}
              width="100%"
              onClick={onClickFunc}
            />
          </p>
        </div>
      );
    };
    const renderMonsterModal = () => {
      return (
        <MonsterModal
          monster={this.props.monster}
          show={this.state.showMonsterModal}
          close={this._hideMonsterModal}
        />
      );
    };
    const renderEntryBtnComponent = () => {
      if (this.props.entryMode) {
        if (this.props.monster) {
          return (
            <div>
            <p><button onClick={this._changeEntry} className="btn btn-sm btn-warning"><i className="ace-icon fa fa-refresh"></i> 교체하기</button></p>
            </div>
          );
        }
        return (
          <div>
          <p><button onClick={this._changeEntry} className="btn btn-sm btn-info"><i className="ace-icon fa fa-paw"></i> 투입하기</button></p>
          </div>
        );
      }
    };
    return (
      <div>
        <div className="col-xs-6 col-sm-3 collection-item text-center" {...this.props.filterData}>
          <div className="profile-picture" style={{ margin: '10px', width: '80%' }}>
            {renderImgComponent()}
            {renderCheckComponent()}
            {this.props.monster ? renderLevelLabelComponent() : null}
            {this.props.monster ? renderRecentLabelComponent() : null}
            {this.props.monster ? renderConditionComponent() : null}
            {this.props.monster ? renderStatusComponent() : null}
            <p>
              {renderCostComponent()}
            </p>
            <p>
              {renderAttrComponent()}
            </p>
            {renderSelectBtnComponent()}
            {renderEntryBtnComponent()}
          </div>
          <div className="space"></div>
        </div>
        {this.props.monster ? renderMonsterModal() : null}
      </div>
    );
  }
}

MonsterCard.propTypes = {
  monster: PropTypes.object,
  recentMon: PropTypes.bool,
  filterData: PropTypes.object,
  selectable: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  selectedMons: PropTypes.array,
  maxSelectable: PropTypes.number,
  entryMode: PropTypes.bool,
  entryNo: PropTypes.number,
};

const mapStateToProps = (store) => ({
  selectedMons: store.selectedMons,
});

export default connect(mapStateToProps)(MonsterCard);
