import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as Actions from '../../redux/actions/actions';
import MonsterCard from '../../components/Common/MonsterCard';
import { convertCollectionToMonsterForMonsterCard } from '../../util/Util';
import * as CollectionService from '../../service/CollectionService';
import * as UserService from '../../service/UserService';
import ContentView from '../../components/Common/ContentView';
import * as MixService from '../../service/MixService';
import * as constants from '../../util/constants';

let action = null;

class SelectableMonView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SelectableMonView';
    this._removeInlineScripts = this._removeInlineScripts.bind(this);
    this._clickDoAction = this._clickDoAction.bind(this);
    action = location.pathname.split('/')[1];
  }
  componentDidMount() {
    if (action === 'mix-mon-ready') {
      this.props.dispatch(Actions.clearSelectedMons());
      this.props.dispatch(Actions.setMenu('collection-mix'));
    } else if (action === 'evolute-mon-ready') {
      this.props.dispatch(Actions.clearSelectedMons());
      this.props.dispatch(Actions.setMenu('collection-evolute'));
    } else if (action === 'entry-ready') {
      this.props.dispatch(Actions.setMenu('collection-entry'));
      // 선택된 포켓몬을 AS-IS 포켓몬에 저장
      const convertProms = this.props.selectedMons.map(mon => {
        return this.props.dispatch(Actions.addEntryAsIs(mon.entry, mon));
      });
      Promise.all(convertProms)
      .then(() => {
        this.props.dispatch(Actions.clearSelectedMons());
      });
    }
    this._removeInlineScripts();
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      const scriptSrcs = ['/js/collection-view-inline.js', '/js/pokemon-sort.js'];
      for (const src of scriptSrcs) {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
      }
    });
  }
  componentWillUnmount() {
    this.props.dispatch(Actions.getCollectionUser(null));
    this.props.dispatch(Actions.clearSelectedMons());
    this._removeInlineScripts();
  }
  _processMixMon() {
    const monsToMix = this.props.selectedMons;
    if (monsToMix.length < 2) {
      this.props.dispatch(Actions.prepareMessageModal('교배할 두 마리의 포켓몬을 선택해주세요.'));
      this.props.dispatch(Actions.showMessageModal());
    } else {
      // 교배한 포켓몬의 레벨하락 및 삭제 처리
      const mixProcess = (index) => {
        return CollectionService.selectById(monsToMix[index]._id)
        .then(response => {
          const monToMix = response.data.collection;
          if (monToMix.piece > 1) { // 교배한 포켓몬의 레벨이 2이상인 경우 레벨하락 및 스탯 조정
            CollectionService.updateLevelWithStat(monToMix, -1);
          } else { // 교배한 포켓몬의 레벨이 1일 경우 콜렉션삭제 및 콜렉션 점수 하락
            CollectionService.deleteById(monToMix._id)
            .then(() => {
              return UserService.updateColPoint(this.props.user, monToMix._mon.point * -1);
            });
          }
        });
      };
      const processArr = [mixProcess(0), mixProcess(1)];
      Promise.all(processArr)
      .then(() => {
        // 교배 후 새로운 포켓몬 추출
        let mixLimit = 'r';
        if (monsToMix[0].grade === 'r' && monsToMix[1].grade === 'r') {
          mixLimit = 'e';
        } else if (monsToMix[0].grade === 'e' && monsToMix[1].grade === 'e') {
          mixLimit = 'l';
        }
        const specialMixResultMonNo = MixService.getSpecialMixResult(monsToMix[0].monNo, monsToMix[1].monNo);
        if (specialMixResultMonNo) {
          return this.props.dispatch(Actions.fetchOneMonWhenGet(this.props.user, 'specialMix', specialMixResultMonNo));
        }
        return this.props.dispatch(Actions.fetchOneMonWhenGet(this.props.user, 'mix', mixLimit));
      })
      .then(() => {
        this.props.dispatch(Actions.setBeforeAction('mix'));
        browserHistory.push('/mix-mon');
      });
    }
  }
  _processEvoluteMon() {
    const monsToEvolute = this.props.selectedMons;
    if (monsToEvolute < 1) {
      this.props.dispatch(Actions.prepareMessageModal('진화할 포켓몬을 선택해주세요.'));
      this.props.dispatch(Actions.showMessageModal());
    } else {
      this.props.dispatch(Actions.setBeforeAction('evolute'));
      browserHistory.push(`/evolution/${monsToEvolute[0]._id}`);
    }
  }
  _processChangeEntry() {
    if (this.props.entryAsIs) {
      if (this.props.selectedMons.length !== this.props.entryAsIs.length) {
        this.props.dispatch(Actions.prepareMessageModal(`${this.props.selectedMons.length}마리의 포켓몬을 선택해주세요.`));
      } else {
        const entryAsIs = this.props.entryAsIs;
        const removeProms = entryAsIs.map(item => {
          if (item.monster._id) return CollectionService.removeMonsterFromEntry(item.monster);
        });
        const addProms = this.props.selectedMons.map(item => {
          return CollectionService.addMonsterToEntry(entryAsIs[0].entryNo, item);
        });
        Promise.all(removeProms)
        .then(() => {
          return Promise.all(addProms);
        })
        .then(() => {
          return UserService.updateLastStatusUpdate(this.props.user);
        })
        .then(() => {
          browserHistory.push(`/entry/${this.props.user._id}`);
        });
      }
    }
  }
  _clickDoAction() {
    if (action === 'mix-mon-ready') {
      this._processMixMon();
    } else if (action === 'evolute-mon-ready') {
      this._processEvoluteMon();
    } else if (action === 'entry-ready') {
      this._processChangeEntry();
    }
  }
  _removeInlineScripts() {
    while (document.body.childElementCount !== 2) {
      document.body.removeChild(document.body.lastChild);
    }
  }
  render() {
    let collections = this.props.user._collections;
    const _willDisapearAfterMix = collection => {
      if (collection.piece === 1) {
        return true;
      }
      return false;
    };
    const _willDisapearAfterEvolute = collection => {
      if (collection.piece === collection._mon.evolutePiece) {
        return true;
      }
      return false;
    };
    // 화면에 보여줄 콜렉션 filter
    if (action === 'mix-mon-ready') {
      collections = collections.filter(collection => {
        return (collection.entry !== 0 ? !_willDisapearAfterMix(collection) : true);
      });
    } else if (action === 'evolute-mon-ready') {
      collections = collections.filter(collection => {
        return collection._mon.evolutePiece && collection.piece >= collection._mon.evolutePiece
          && (collection.entry !== 0 ? !_willDisapearAfterEvolute(collection) : true);
      });
    } else if (action === 'entry-ready') {
      collections = collections.filter(collection => {
        return collection.entry === 0 && collection.status === 2;
      });
    }
    const renderGuideComment = () => {
      if (action === 'mix-mon-ready') {
        return (<h5>두 마리의 포켓몬을 선택 후 교배하기 버튼을 눌러주세요.</h5>);
      } else if (action === 'evolute-mon-ready') {
        return (<h5>하나의 포켓몬을 선택 후 진화하기 버튼을 눌러주세요.</h5>);
      } else if (action === 'entry-ready') {
        return (<h5>{this.props.entryAsIs.length}마리의 포켓몬을 선택 후 투입하기 버튼을 눌러주세요.</h5>);
      }
    };
    const renderActionBtn = () => {
      let btnTxt = null;
      let btnClassName = null;
      let leftBtnName = '내 콜렉션';
      let leftBtnLink = `/collection/${this.props.user._id}`;
      if (action === 'mix-mon-ready') {
        btnTxt = '교배하기';
        btnClassName = 'ace-icon fa fa-flask';
      } else if (action === 'evolute-mon-ready') {
        btnTxt = '진화하기';
        btnClassName = 'ace-icon fa fa-flash';
      } else if (action === 'entry-ready') {
        btnTxt = '투입하기';
        btnClassName = 'ace-icon fa fa-paw';
        leftBtnName = '돌아가기';
        leftBtnLink = `/entry/${this.props.user._id}`;
      }
      return (
        <div>
          <Link to={leftBtnLink}>
            <button className="btn btn-default hidden-xs">
              <i className="menu-icon fa fa-github-alt"></i> {leftBtnName}
            </button>
          </Link>
          <Link to={leftBtnLink}>
            <button
              className="btn btn-primary btn-xs visible-xs-inline-block"
            >
              {leftBtnName}
            </button>
          </Link>
          <button className="btn btn-primary hidden-xs"
            style={{ marginLeft: '4px' }}
            onClick={this._clickDoAction}
          >
            <i className={btnClassName}></i> {btnTxt}
          </button>
          <button
            className="btn btn-primary btn-xs visible-xs-inline-block"
            style={{ marginLeft: '4px' }}
            onClick={this._clickDoAction}
          >
            {btnTxt}
          </button>
        </div>
      );
    };
    const renderFunctionBar = () => {
      return (
        <div className="row function-section">
          <div className="col-xs-12 widget-container-col function-bar"
            style={{ zIndex: '999' }}
          >
            <div className="widget-box widget-box-function">
              <div className="widget-body">
                <div className="widget-main">
                  <div className="row">
                    <div className="col-sm-6 hidden-xs">
                      {renderGuideComment()}
                    </div>
                    <div
                      className="col-sm-6 text-right visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"
                    >
                      {renderActionBtn()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const renderMonsterCardComponent = () => {
      const returnComponent = [];
      let mon = null;
      let maxSelectable = 0;
      let maxSelectableCost = 999;
      if (action === 'mix-mon-ready') maxSelectable = 2;
      else if (action === 'evolute-mon-ready') maxSelectable = 1;
      else if (action === 'entry-ready') {
        maxSelectable = this.props.entryAsIs.length;
        // 최대 선택 가능한 코스트 = 유저 리그의 최대 코스트 - 현재 엔트리의 코스트 + entryAsIs의 코스트 합
        let currentEntryCost = 0;
        let currentEntry = null;
        let entryAsIsCost = 0;
        if (this.props.entryAsIs[0].entryNo === 1) currentEntry = this.props.entryState.entry1;
        else if (this.props.entryAsIs[0].entryNo === 2) currentEntry = this.props.entryState.entry2;
        else if (this.props.entryAsIs[0].entryNo === 3) currentEntry = this.props.entryState.entry3;
        currentEntry.forEach((element) => {
          currentEntryCost += element._mon.cost;
        });
        this.props.entryAsIs.forEach(element => {
          entryAsIsCost += element.monster.cost;
        });
        maxSelectableCost = constants.leagues[this.props.user.league].maxCost - currentEntryCost + entryAsIsCost;
      }
      for (const col of collections) {
        mon = convertCollectionToMonsterForMonsterCard(col);
        const filterData = { 'data-have': '보유', 'data-attr': mon.mainAttr, 'data-cost': mon.cost,
        'data-grade': mon.grade, 'data-designer': mon.designer };
        returnComponent.push(
          <MonsterCard
            key={mon.monNo}
            monster={mon}
            filterData={filterData}
            selectable
            maxSelectable={maxSelectable}
            maxSelectableCost={maxSelectableCost}
          />
        );
      }
      return returnComponent;
    };
    const renderTitle = () => {
      let title = null;
      if (action === 'mix-mon-ready') title = '교배하기';
      else if (action === 'evolute-mon-ready') title = '진화하기';
      else if (action === 'entry-ready') title = '엔트리 투입하기';
      return title;
    };
    const renderContent = () => {
      return (
        <div>
        {renderFunctionBar()}
        <div className="space"></div>
          <div className="row sort-section">
            <div className="col-xs-12">
              <div className="tabbable">
                <ul className="nav nav-tabs" id="myTab">
                  <li className="active hidden-xs">
                    <a data-toggle="tab" href="#cost">코스트별</a>
                  </li>
                  <li className="visible-xs">
                    <a data-toggle="tab" href="#cost"><small>코스트</small></a>
                  </li>
                  <li className="hidden-xs">
                    <a data-toggle="tab" href="#attr">속성별</a>
                  </li>
                  <li className="visible-xs">
                    <a data-toggle="tab" href="#attr"><small>속성</small></a>
                  </li>
                  <li className="hidden-xs">
                    <a data-toggle="tab" href="#grade">등급별</a>
                  </li>
                  <li className="visible-xs">
                    <a data-toggle="tab" href="#grade"><small>등급</small></a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="have" className="tab-pane fade in active" style={{ display: 'none' }}>
                    <span className="badge badge-info check-badge" id="filter-allHave">
                      <i className="fa fa-check"></i> 전체
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-have"
                      data-filter-value="보유"
                    ><i className="fa fa-check"></i> 보유
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-noHave"
                      data-filter-value="미보유"
                    ><i className="fa fa-check"></i> 미보유
                    </span>
                  </div>
                  <div id="cost" className="tab-pane fade in active">
                    <span className="badge badge-info check-badge" id="filter-allCost"><i
                      className="fa fa-check"
                    ></i> 전체
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-1"
                      data-filter-value="1"
                    ><i className="fa fa-check"></i> 코스트1
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-2"
                      data-filter-value="2"
                    ><i className="fa fa-check"></i> 코스트2
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-3"
                      data-filter-value="3"
                    ><i className="fa fa-check"></i> 코스트3
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-4"
                      data-filter-value="4"
                    ><i className="fa fa-check"></i> 코스트4
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-5"
                      data-filter-value="5"
                    ><i className="fa fa-check"></i> 코스트5
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-6"
                      data-filter-value="6"
                    ><i className="fa fa-check"></i> 코스트6
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-7"
                      data-filter-value="7"
                    ><i className="fa fa-check"></i> 코스트7
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-cost-8"
                      data-filter-value="8"
                    ><i className="fa fa-check"></i> 코스트8
                    </span>
                  </div>
                  <div id="attr" className="tab-pane">
                    <span className="badge badge-info check-badge" id="filter-allAttr">
                      <i className="fa fa-check"></i> 전체
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-normal"
                    >
                      <i className="fa fa-check"></i> 노말
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-fire"
                    >
                      <i className="fa fa-check"></i> 불꽃
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-water"
                    >
                      <i className="fa fa-check"></i> 물
                    </span>
                    <span
                      className="badge badge-default check-badge"
                      id="filter-attr-electronic"
                    ><i className="fa fa-check"></i>전기
                    </span>
                    <span className="badge badge-default check-badge"
                      id="filter-attr-plant"
                    ><i className="fa fa-check"></i> 풀
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-ice"
                    ><i className="fa fa-check"></i> 얼음
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-fly"
                    ><i className="fa fa-check"></i> 비행
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-fairy"
                    ><i className="fa fa-check"></i> 요정
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-earth"
                    ><i className="fa fa-check"></i> 땅
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-venom"
                    ><i className="fa fa-check"></i> 독
                    </span>
                    <span
                      className="badge badge-default check-badge"
                      id="filter-attr-fighter"
                    ><i className="fa fa-check"></i> 격투
                    </span>
                    <span className="badge badge-default check-badge"
                      id="filter-attr-esper"
                    ><i className="fa fa-check"></i> 염력
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-bug"
                    ><i className="fa fa-check"></i> 벌레
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-rock"
                    ><i className="fa fa-check"></i> 바위
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-ghost"
                    ><i className="fa fa-check"></i> 유령
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-dragon"
                    ><i className="fa fa-check"></i> 용
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-evil"
                    ><i className="fa fa-check"></i> 악
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-attr-iron"
                    ><i className="fa fa-check"></i> 강철
                    </span>
                  </div>
                  <div id="grade" className="tab-pane">
                    <span className="badge badge-info check-badge" id="filter-allGrade">
                      <i className="fa fa-check"></i> 전체
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-grade-b"
                    ><i className="fa fa-check"></i> 베이직
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-grade-r"
                    ><i className="fa fa-check"></i> 레어
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-grade-a"
                    ><i className="fa fa-check"></i> 스페셜
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-grade-ar"
                    ><i className="fa fa-check"></i> 스페셜레어
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-grade-e"
                    ><i className="fa fa-check"></i> 엘리트
                    </span>
                    <span
                      className="badge badge-default check-badge" id="filter-grade-l"
                    ><i className="fa fa-check"></i> 레전드
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row collection-container">
            {renderMonsterCardComponent()}
          </div>
        </div>
      );
    };
    const renderSelectableMonView = () => {
      let returnComponent = null;
      if (this.props.user) {
        returnComponent = (
          <ContentView
            wrapperId="collection-view"
            title={renderTitle()}
            content={renderContent()}
          />
        );
      } else {
        returnComponent = (
          <div></div>
        );
      }
      return returnComponent;
    };
    return renderSelectableMonView();
  }
}

SelectableMonView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  selectedMons: store.selectedMons,
  collectionsToShow: store.collectionsToShow,
  entryAsIs: store.entryAsIs,
  entryState: store.entryState,
});

SelectableMonView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  selectedMons: PropTypes.array,
  collectionsToShow: PropTypes.array,
  entryAsIs: PropTypes.array,
  entryState: PropTypes.object,
};

export default connect(mapStateToProps)(SelectableMonView);
