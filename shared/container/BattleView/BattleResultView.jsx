import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import { updateUserToWin, updateUserWhenMvp, updateRivalToLose, updateRivalToWin, updateWinInRow } from '../../service/UserService';
import { getTotalAbilityFromEntry, convertCollectionToMonsterForMonsterCard } from '../../util/Util';
import LeagueIcon from '../../components/Common/LeagueIcon';
import UserPhotoComponent from '../../components/Common/UserPhotoComponent';
import MonsterCard from '../../components/Common/MonsterCard';

class BattleResultView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'BattleResultView';
    this.state = {
      winner: '',
      mvp: '',
      perfect: false,
      gandang: false,
      oneMonShow: false,
      underDog: false,
      userPointGap: 0,
      rivalPointGap: 0,
      beforeUser: {},
      beforeRival: {},
      fiveWinLeft: -1,
    };
  }
  componentWillMount() {
    const result = this.props.battleInfo.result[this.props.battleInfo.result.length - 1];
    const winner = result.winner;
    const perfect = winner === 'user' ? result.perfect : false;
    const gandang = winner === 'user' ? result.gandang : false;
    const oneMonShow = winner === 'user' ? result.oneMonShow : false;
    let fiveWinLeft = -1;
    let underDog = false;
    if (winner === 'user') underDog = getTotalAbilityFromEntry(this.props.userEntryForBattle) < getTotalAbilityFromEntry(this.props.rivalEntryForBattle) ? true : false;
    this.setState({
      winner,
      mvp: result.mvp,
      perfect,
      gandang,
      oneMonShow,
      beforeUser: Object.assign({}, this.props.user),
      beforeRival: Object.assign({}, this.props.rival),
      underDog,
      fiveWinLeft,
    });
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      return this.props.dispatch(Actions.fetchRival(this.props.rival));
    })
    .then(() => {
      const resultApplyProcess = [];
      if (winner === 'user') {
        resultApplyProcess.push(updateRivalToLose(this.props.rival, result.mvp === 'rival' ? 1 : 0));
        fiveWinLeft = 5 - ((this.props.user.winInRow + 1) % 5);
        let rewardCnt = 0;
        if (fiveWinLeft === 5) rewardCnt++;
        if (perfect) rewardCnt++;
        if (gandang) rewardCnt++;
        if (oneMonShow) rewardCnt++;
        if (underDog) rewardCnt++;
        resultApplyProcess.push(updateUserToWin(this.props.user, result.mvp === 'user' ? 1 : 0, rewardCnt));
        this.setState({
          userPointGap: 5 + (result.mvp === 'user' ? 1 : 0),
          rivalPointGap: -2 + (result.mvp === 'rival' ? 1 : 0),
          fiveWinLeft,
        });
      } else {
        resultApplyProcess.push(updateRivalToWin(this.props.rival, result.mvp === 'rival' ? 1 : 0));
        resultApplyProcess.push(updateWinInRow(this.props.user, 0));
        if (result.mvp === 'user') resultApplyProcess.push(updateUserWhenMvp(this.props.user));
        this.setState({
          userPointGap: -5 + (result.mvp === 'user' ? 1 : 0),
          rivalPointGap: 2 + (result.mvp === 'rival' ? 1 : 0),
        });
      }
      return Promise.all(resultApplyProcess);
    });
  }
  componentWillUnmount() {
    this.props.dispatch(Actions.clearUserEntryForBattle());
    this.props.dispatch(Actions.clearRivalEntryForBattle());
  }
  render() {
    const renderRankChangeInfo = type => {
      if (this.state.beforeUser.battleRank && this.state.beforeRival.battleRank) {
        let afterRank = 0;
        let beforeRank = 0;
        if (type === 'user') {
          afterRank = this.props.user.battleRank;
          beforeRank = this.state.beforeUser.battleRank;
        } else {
          afterRank = this.props.rival.battleRank;
          beforeRank = this.state.beforeRival.battleRank;
        }
        const gap = beforeRank - afterRank;
        if (gap !== 0) {
          return (
            <p>
              <span className={`badge badge-${gap > 0 ? 'info' : 'danger'}`}>
                <b>
                  <i className={`fa fa-arrow-${gap > 0 ? 'up' : 'down'}`}></i>{gap > 0 ? gap : gap * -1}
                </b>
              </span>
            </p>
          );
        }
      }
    };
    const renderUserInfo = type => {
      const user = type === 'user' ? this.props.user : this.props.rival;
      const pointGap = type === 'user' ? this.state.userPointGap : this.state.rivalPointGap;
      return (
        <div className="row">
          <div className="col-xs-12 widget-container-col">
            <div className={`widget-box widget-color-${type === 'user' ? 'blue' : 'orange'}`}>
              <div className="widget-header">
                <h5>{type === 'user' ? '나의 랭킹' : '상대 랭킹'}</h5>
              </div>
              <div className="widget-body">
                <div className="widget-main" style={{ padding: '0 12px' }}>
                  <div className="row widget-main">
                    <div className="col-sm-1 col-xs-2 text-center col-rank">
                      {renderRankChangeInfo(type)}
                      <h4 className="text-primary">
                        <b>{user.battleRank}</b>
                      </h4>
                      <LeagueIcon league={user.league}/>
                    </div>
                    <div className="col-sm-2 col-xs-4 text-center">
                      <UserPhotoComponent user={user}/>
                    </div>
                    <div className="col-sm-9 col-xs-6">
                      <div className="row">
                        <div className="row">
                          <div className="col-xs-12">
                            <div className="row">
                              <div className="col-sm-8 hidden-xs text-left">
                                <h5>
                                  <span className="label label-lg label-yellow">시합전적</span>
                                   {`${user.totalBattle}전 ${user.winBattle}승 ${user.loseBattle}패 (승률: ${(user.winBattle / user.totalBattle * 100).toFixed(1)}%)`}
                                </h5>
                              </div>
                              <div className="col-sm-4 col-xs-12 text-left">
                                <h5>
                                  <span className="label label-lg label-warning">시합점수</span>
                                   {`${user.battlePoint}점`}
                                  <span className={`badge badge-${pointGap > 0 ? 'info' : 'danger'}`}>{`${pointGap > 0 ? '+' : ''}${pointGap}`}</span>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space hidden-xs"></div>
                        <div className="row hidden-xs">
                          <div className="col-xs-12">
                            <div className="itemdiv dialogdiv" style={{ minHeight: '0px', paddingRight: '0px' }}>
                              <div className="body" style={{ marginRight: '0px', marginLeft: '30px' }}>
                                {`${user.introduce ? user.introduce : '자기소개가 없습니다.'}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const renderMomBonusInfo = () => {
      if (this.state.mvp === 'user') {
        return (
          <div className="col-xs-12">
            <h4>
              MOM 보너스 점수 : <span className="badge badge-info"><b>+ 1</b></span>
            </h4>
          </div>
        );
      }
    };
    const renderMonOfTheMatch = () => {
      const user = this.state.mvp === 'user' ? this.props.user : this.props.rival;
      const mvpMonIdx = this.props.battleInfo.result[this.props.battleInfo.result.length - 1].mvpMon;
      const collection = this.state.mvp === 'user' ? this.props.userEntryForBattle[mvpMonIdx] : this.props.rivalEntryForBattle[mvpMonIdx];
      return (
        <div className="row">
          <div className="space-30"></div>
          <div className="col-xs-12 text-center">
            <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
              <b>MON OF THE MATCH</b>
            </span>
            <div className="col-xs-12">
              <h4>
                <span className="text-primary">{user.nickname}</span> 님의 <span className="text-primary">{collection._mon.name}</span>
              </h4>
            </div>
            <div className="col-xs-6 col-sm-4 col-xs-offset-3 col-sm-offset-4 collection-item text-center">
              <MonsterCard
                fullSize
                monster={convertCollectionToMonsterForMonsterCard(collection)}
              />
            </div>
            {renderMomBonusInfo()}
          </div>
        </div>
      );
    };
    const renderRewardButton = () => {
      if (this.state.perfect || this.state.fiveWinLeft === 5 || this.state.gandang || this.state.oneMonShow || this.state.underDog) {
        return (
          <p>
            <button className="btn btn-primary btn-lg" id="mission-reward-btn">
              <i className="fa fa-gift"></i> 미션 보상 받기
            </button>
          </p>
        );
      }
    };
    const renderNextButton = () => {
      if (!(this.state.perfect || this.state.fiveWinLeft === 5 || this.state.gandang || this.state.oneMonShow || this.state.underDog)) {
        if (this.props.user.battleCredit > 0) {
          return (
            <p><button className="btn btn-primary btn-xlg">계속 시합 하기</button></p>
          );
        }
        return (
          <p><button className="btn btn-primary btn-lg">시합랭킹 보기</button></p>
        );
      }
    };
    const getLeftWin = () => {
      let result = null;
      if (this.state.fiveWinLeft === 5) {
        result = '달성';
      } else if (this.state.fiveWinLeft === -1) {
        result = '5연승 남음';
      } else {
        result = `${this.state.fiveWinLeft}연승 남음`;
      }
      return result;
    };
    const renderMissionInfo = () => {
      return (
        <div className="row">
          <div className="space"></div>
          <div className="col-xs-12 text-center">
            <p>
              <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
                <b>MISSION</b>
              </span>
            </p>
            <div className="col-xs-12">
              <h4>
                퍼펙트게임 : <span className={`badge badge-${this.state.perfect ? 'info' : 'warning'}`}>
                  <big><i className={`fa fa-${this.state.perfect ? 'check' : 'times'}`}></i>{this.state.perfect ? '달성' : '미달성'}</big>
                </span>
              </h4>
              <h4>
                5연승 : <span className={`badge badge-${this.state.fiveWinLeft === 5 ? 'info' : 'warning'}`}>
                  <big><i className={`fa fa-${this.state.fiveWinLeft === 5 ? 'check' : 'times'}`}></i>{getLeftWin()}</big>
                </span>
              </h4>
              <h4>
                아슬아슬 : <span className={`badge badge-${this.state.gandang ? 'info' : 'warning'}`}>
                  <big><i className={`fa fa-${this.state.gandang ? 'check' : 'times'}`}></i>{this.state.gandang ? '달성' : '미달성'}</big>
                </span>
              </h4>
              <h4>
                원몬쇼 : <span className={`badge badge-${this.state.oneMonShow ? 'info' : 'warning'}`}>
                  <big><i className={`fa fa-${this.state.oneMonShow ? 'check' : 'times'}`}></i>{this.state.oneMonShow ? '달성' : '미달성'}</big>
                </span>
              </h4>
              <h4>
                언더독 : <span className={`badge badge-${this.state.underDog ? 'info' : 'warning'}`}>
                  <big><i className={`fa fa-${this.state.underDog ? 'check' : 'times'}`}></i>{this.state.underDog ? '달성' : '미달성'}</big>
                </span>
              </h4>
              {renderRewardButton()}
              {renderNextButton()}
            </div>
          </div>
        </div>
      );
    };
    const renderContent = () => {
      return (
        <div>
          {renderUserInfo('user')}
          {renderUserInfo('rival')}
          {renderMonOfTheMatch()}
          {renderMissionInfo()}
        </div>
      );
    };
    return (
      <ContentView
        title="시합결과"
        content={renderContent()}
      />
    );
  }
}

BattleResultView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  battleInfo: store.battleInfo,
  rival: store.rival,
  userEntryForBattle: store.userEntryForBattle,
  rivalEntryForBattle: store.rivalEntryForBattle,
});

BattleResultView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  battleInfo: PropTypes.object.isRequired,
  rival: PropTypes.object,
  userEntryForBattle: PropTypes.array.isRequired,
  rivalEntryForBattle: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(BattleResultView);
