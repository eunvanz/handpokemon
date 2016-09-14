import React, { PropTypes } from 'react';
import MonsterModal from './MonsterModal';
import { connect } from 'react-redux';
import $ from 'jquery';
import * as Actions from '../../redux/actions/actions';
import CostComponent from '../../components/Common/CostComponent';
import AttrComponent from '../../components/Common/AttrComponent';

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
    // this._changeEntry = this._changeEntry.bind(this);
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
      this.props.dispatch(Actions.prepareMessageModal(`이미 ${this.props.maxSelectable}마리를 선택했습니다.`));
      this.props.dispatch(Actions.showMessageModal());
      return;
    } else if (this.props.entryMode) {
      if (this.props.selectedMons.length > 0
        && this.props.selectedMons[0].entry !== this.props.monster.entry) {
        this.props.dispatch(Actions.prepareMessageModal('먼저 선택한 포켓몬과 같은 엔트리의 포켓몬을 선택해주세요.'));
        this.props.dispatch(Actions.showMessageModal());
        return;
      }
    } else if (this.props.selectedMons.reduce((preElement, curElement) => { return preElement.cost + curElement.cost; }, 0)
                + this.props.monster.cost > this.props.maxSelectableCost) {
      this.props.dispatch(Actions.prepareMessageModal(`현재 선택 가능한 최대 코스트 ${this.props.maxSelectableCost}를 초과했습니다.`));
      this.props.dispatch(Actions.showMessageModal());
      return;
    }
    this.setState({ selected: true });
    this.props.dispatch(Actions.addSelectedMon(this.props.monster));
  }
  _uncheckItem() {
    this.setState({ selected: false });
    this.props.dispatch(Actions.removeSelectedMon(this.props.monster));
  }
  // _changeEntry() {
  //   // 교체하고자 하는 포켓몬 저장
  //   this.props.dispatch(Actions.addEntryAsIs(this.props.entryNo, this.props.monster));
  //   browserHistory.push('/entry-ready');
  // }
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
        return (
          <CostComponent
            cost={this.props.monster.cost}
          />
        );
      }
    };
    const renderAttrComponent = () => {
      if (this.props.monster) {
        return (
          <AttrComponent
            grade={this.props.monster.grade}
            mainAttr={this.props.monster.mainAttr}
            subAttr={this.props.monster.subAttr}
          />
        );
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
            <div style={{ marginBottom: '10px' }}>
              {renderCostComponent()}
            </div>
            <div style={{ marginBottom: '10px' }}>
              {renderAttrComponent()}
            </div>
            {renderSelectBtnComponent()}
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
  maxSelectableCost: PropTypes.number,
};

const mapStateToProps = (store) => ({
  selectedMons: store.selectedMons,
});

export default connect(mapStateToProps)(MonsterCard);
