import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import { Link } from 'react-router';
import MonsterInfoView from '../../components/Common/MonsterInfoView';
import * as CollectionService from '../../service/CollectionService';
import * as UserService from '../../service/UserService';
import $ from 'jquery';
import { getAcomplishedHonors, getMissionNameFromHonor, getDisabledHonors } from '../../util/Util';
import HonorComponent from '../../components/Common/HonorComponent';
import keygen from 'keygenerator';

const scratchStyle = {
  width: '200px',
  height: '200px',
  backgroundImage: 'url("/img/common/scratchbg.png")',
  margin: '0 auto',
};

let action = null;
let collectionId = null;

class GetMonView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'GetMonView';
    this._handleFlipClick = this._handleFlipClick.bind(this);
    this._handleContinueClick = this._handleContinueClick.bind(this);
    this._getMonProcess = this._getMonProcess.bind(this);
    this._removeInlineScripts = this._removeInlineScripts.bind(this);
    this._appendScripts = this._appendScripts.bind(this);
    this.state = { refreshFlag: true };
  }
  componentWillMount() {
    this._getMonProcess();
  }
  componentWillUnmount() {
    this.props.dispatch(Actions.resetMon());
    this.props.dispatch(Actions.showMonInfoFront());
    this.props.dispatch(Actions.getAddedAbility(null));
    this._removeInlineScripts();
  }
  _removeInlineScripts() {
    while (document.body.childElementCount !== 2) {
      document.body.removeChild(document.body.lastChild);
    }
  }
  _handleFlipClick(e) {
    e.preventDefault();
    if (!this.props.monInfoFlip) {
      this.props.dispatch(Actions.showMonInfoFront());
    } else {
      this.props.dispatch(Actions.showMonInfoBack());
    }
  }
  _handleContinueClick() {
    this._getMonProcess()
    .then(() => {
      if (action === 'get-mon') this.setState({ refreshFlag: !this.state.refreshFlag });
    });
  }
  _appendScripts() {
    const scriptSrcs = ['/js/wScratchpad.min.js', '/js/common-getmon.js', '/js/getmon-ev.js', '/js/get-mon-view-inline.js'];
    for (const src of scriptSrcs) {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    }
  }
  _getMonProcess() {
    $('.monster-info').hide();
    this._removeInlineScripts();
    action = location.pathname.split('/')[1];
    collectionId = location.pathname.split('/')[2];
    if (action === 'mix-mon') {
      this.props.dispatch(Actions.fetchHonors())
      .then(() => {
        const acomplishedHonors = getAcomplishedHonors(this.props.user, this.props.honors);
        if (acomplishedHonors.length > 0) {
          return UserService.updateCompletedHonors(this.props.user, acomplishedHonors);
        }
      })
      .then(() => {
        this._appendScripts();
      });
    } else if (action === 'get-mon') {
      return this.props.dispatch(Actions.fetchUserSession())
      .then(() => {
        const user = this.props.user;
        if (user.getCredit > 0) {
          return this.props.dispatch(Actions.fetchOneMonWhenGet(user, 'get', null))
          .then(() => {
            return this.props.dispatch(Actions.fetchUserSession());
          })
          .then(() => {
            return this.props.dispatch(Actions.fetchHonors());
          })
          .then(() => {
            const acomplishedHonors = getAcomplishedHonors(this.props.user, this.props.honors);
            if (acomplishedHonors.length > 0) {
              return UserService.updateCompletedHonors(this.props.user, acomplishedHonors);
            }
          })
          .then(() => {
            this.props.dispatch(Actions.setBeforeAction('get'));
            this._appendScripts();
          });
        }
        this.context.router.replace('/get-mon-impossible');
      });
    } else if (action === 'get-mon-multi') {
      // TODO
    } else if (action === 'evolution' || 'evolution2') {
      return this.props.dispatch(Actions.fetchUserSession())
      .then(() => {
        const user = this.props.user;
        if (user && user._collections.some(e => e._id === collectionId)) {
          let beforeId = null;
          // 포켓몬의 레벨 감소 및 사라지는 경우 처리
          return CollectionService.selectById(collectionId)
          .then(response => {
            const collection = response.data.collection;
            beforeId = collection._mon._id;
            // 콜렉션 레벨과 포켓몬 진화레벨 비교
            if (collection.level > collection._mon.evolutePiece) {
              // 레벨하락 및 능력치 하락
              return CollectionService.updateLevelWithStat(collection, collection._mon.evolutePiece * -1);
            } else if (collection.level === collection._mon.evolutePiece) {
              // 콜렉션 레벨이 진화레벨과 같을 경우 유저의 콜렉션점수 하락, 콜렉션 삭제
              user.colPoint -= collection._mon.point; // Actions.fetchOneMonWhenGet(user, 'evolute', beforeId) 를 위한 업데이트
              return UserService.updateColPoint(user, collection._mon.point * -1)
              .then(() => {
                return CollectionService.deleteById(collectionId);
              });
            }
            // TODO: 진화를 못하는 경우 (잘못된 접근)
          })
          .then(() => {
            // 선택된 포켓몬의 진화형 포켓몬 하나를 가지고 온다.
            return this.props.dispatch(Actions.fetchOneMonWhenGet(user, 'evolute', beforeId));
          })
          .then(() => {
            return this.props.dispatch(Actions.fetchUserSession());
          })
          .then(() => {
            return this.props.dispatch(Actions.fetchHonors());
          })
          .then(() => {
            const acomplishedHonors = getAcomplishedHonors(this.props.user, this.props.honors);
            if (acomplishedHonors.length > 0) {
              return UserService.updateCompletedHonors(this.props.user, acomplishedHonors);
            }
          })
          .then(() => {
            this._appendScripts();
          });
        }
      });
    }
  }
  render() {
    const renderEvolutionButton = () => {
      const routeName = action === 'evolution' ? 'evolution2' : 'evolution';
      const evolutePiece = this.props.mon._mon.evolutePiece;
      const thisMonPiece = this.props.mon.piece;
      if (evolutePiece && evolutePiece <= thisMonPiece &&
        (this.props.mon.entry !== 0 ? thisMonPiece > evolutePiece : true)) {
        return (
          <Link to={`/${routeName}/${this.props.mon._id}`} refresh>
            <button
              className="btn btn-primary btn-minier ev-btn"
              id="ev-btn" style={{ marginLeft: '4px' }}
            >
              <i className="ace-icon fa fa-flash"></i> 진화하기
            </button>
          </Link>
        );
      }
    };
    const renderLevelInfo = () => {
      let returnComponent = null;
      const isNewMon = this.props.mon.level === 1;
      if (isNewMon) {
        returnComponent = (<div className="col-xs-12 align-center">
          <p>
            <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
              <b>새로운 포켓몬</b>
            </span>
          </p>
          <h5>
            콜렉션점수 : <span className="badge badge-warning">{`+${this.props.mon._mon.point}`}</span>
          </h5>
        </div>);
      } else {
        returnComponent = (
          <div className="col-xs-12 align-center">
            <p>
              <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
                <b>레벨 업</b>
              </span>
            </p>
            <h5>
              <span className="label label-info arrowed-in-right">{`LV. ${this.props.mon.level}`}</span> 이(가) 되었다!
              {renderEvolutionButton()}
            </h5>
          </div>
        );
      }
      return returnComponent;
    };
    const renderRewardBadge = () => {
      if (this.props.beforeAction === 'get' && this.props.user.reward > this.props.user.getReward) {
        return (
          <span className="badge badge-info" style={{ color: 'white' }}>{this.props.user.reward - this.props.user.getReward}</span>
        );
      }
    };
    const renderContinueBtn = () => {
      let returnComponent = null;
      let btnTxt = '계속 채집하기';
      let link = '/get-mon';
      let onClickFunc = this._handleContinueClick;
      if (this.props.beforeAction === 'mix') {
        btnTxt = '계속 교배하기';
        link = '/mix-mon-ready';
        onClickFunc = null;
      } else if (this.props.beforeAction === 'evolute') {
        btnTxt = '계속 진화하기';
        link = '/evolute-mon-ready';
        onClickFunc = null;
      } else if (this.props.user.reward > this.props.user.getReward) {
        btnTxt = '계속 보상받기';
      }
      if (this.props.beforeAction !== 'get' || (this.props.beforeAction === 'get' && this.props.user.getCredit > 0)) {
        returnComponent = (
          <p>
            <Link to={link}>
              <button className="btn btn-primary" onClick={onClickFunc}>{btnTxt} {renderRewardBadge()}</button>
            </Link>
          </p>
        );
      }
      return returnComponent;
    };
    const renderMissionInfo = () => {
      const honors = getAcomplishedHonors(this.props.user, this.props.honors);
      if (honors.length > 0) {
        const renderTbody = honorsParam => {
          return honorsParam.map(honor => {
            return (
              <tr key={keygen._()}>
                <td className="center">{getMissionNameFromHonor(honor)}</td>
                <td className="center">포키머니 <span className="badge badge-info">{honor.reward}</span></td>
                <td className="center"><HonorComponent honor={honor}/></td>
              </tr>
            );
          });
        };
        return (
          <div>
            <div className="space"></div>
            <p>
              <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
                <b>업적 달성</b>
              </span>
            </p>
            <table id="simple-table" className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="center">업적명</th>
                  <th className="center">보상</th>
                  <th className="center">획득칭호</th>
                </tr>
              </thead>
              <tbody>
                {renderTbody(honors)}
              </tbody>
            </table>
          </div>
        );
      }
    };
    const renderDisabledHonorInfo = () => {
      const honors = getDisabledHonors(this.props.user, this.props.honors);
      if (honors.length > 0) {
        return (
          <div>
            <div className="space"></div>
            <p>
              <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
                <b>칭호해제</b>
              </span>
            </p>
            <p>소모된 포켓몬으로 인해 다음 칭호가 해제되었습니다.</p>
            <p>
              {honors.map(honor => <HonorComponent key={keygen._()} honor={honor}/>)}
            </p>
          </div>
        );
      }
    };
    const renderGetResult = () => {
      let returnComponent = null;
      if (this.props.mon) {
        returnComponent = (
          <div id="get-mon-view">
            <div className="page-content">
              <div className="page-header">
                <h1>포켓몬 채집</h1>
              </div>
              <div className="row">
                <div className="space hidden-xs"></div>
                <div className="space hidden-xs"></div>
                <div className="space hidden-xs"></div>
                <div className="col-xs-12 align-center">
                  <p>
                    <big>야호! 새로운 포켓몬 친구를 발견했어!<br/>과연 어떤 친구일까?</big>
                  </p>
                  <div className="scratch-container">
                    <div id="demo2" className="scratchpad" style={scratchStyle}></div>
                    <input type="hidden" id="monImg" value={this.props.mon._mon.img[0]}/>
                  </div>
                  <div className="space"></div>
                  <div className="info-container">
                    <div className="monster-info" style={{ display: 'none', width: '280px', margin: '0 auto' }}>
                      <div className="row">
                        {renderLevelInfo()}
                      </div>
                      <div className="space"></div>
                      <MonsterInfoView mon={this.props.mon} flip={this.props.monInfoFlip} addedAbility={this.props.addedAbility} />
                      <p>
                        <Link to={`/collection/${this.props.user._id}`}>
                          <button className="btn btn-default">내 콜렉션</button>
                        </Link>
                        <button className="btn btn-warning flip-btn" onClick={this._handleFlipClick} style={{ marginLeft: '5px' }}>
                          <i className="fa fa-refresh"></i> 뒤집기
                        </button>
                      </p>
                      {renderMissionInfo()}
                      {renderDisabledHonorInfo()}
                      {renderContinueBtn()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return returnComponent;
    };
    return (
      <div key={this.state.refreshFlag}>{renderGetResult()}</div>
    );
  }
}

GetMonView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  mon: store.mon,
  user: store.user,
  monInfoFlip: store.monInfoFlip,
  addedAbility: store.addedAbility,
  beforeAction: store.beforeAction,
  honors: store.honors,
});

GetMonView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mon: PropTypes.object,
  user: PropTypes.object,
  monInfoFlip: PropTypes.bool,
  addedAbility: PropTypes.object,
  beforeAction: PropTypes.string,
  honors: PropTypes.array,
};

export default connect(mapStateToProps)(GetMonView);
