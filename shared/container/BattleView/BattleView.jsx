import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UserPhotoComponent from '../../components/Common/UserPhotoComponent';
import MonsterInArena from '../../components/Common/MonsterInArena';
import { monsterImgRoute } from '../../util/constants';
import { appendInlineScripts, removeInlineScripts } from '../../util/Util';
import $ from 'jquery';
import * as Actions from '../../redux/actions/actions';
import { browserHistory } from 'react-router';

class BattleView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'BattleView';
  }
  componentDidMount() {
    const scriptSrcs = ['/js/roulette.js', '/js/jquery-ui.js', '/js/inline/battle-view.js'];
    appendInlineScripts(scriptSrcs);
  }
  componentWillUnmount() {
    this.props.dispatch(Actions.getGameSpeed($('.game-speed').text()));
    removeInlineScripts();
  }
  _handleOnClickNext() {
    browserHistory.push('battle-result');
  }
  render() {
    const renderPlayerInfo = (player, entry, playerType) => {
      return (
        <div className="row battle-arena user-control widget-box">
          <div className="col-xs-3 col-sm-5">
            <div className="text-center" style={{ float: 'left', margin: '10px' }}>
              <UserPhotoComponent user={player} hiddenXs/>
            </div>
            <div className="text-left hidden-xs" style={{ float: 'left', margin: '10px' }}>
              <p>
                <span className="label label-warning label-sm">시합랭킹</span>
                <span className="text-info"> {player.battleRank}</span>위
              </p>
              <p>
                <span className="label label-info label-sm">시합점수</span>
                <span className="text-info"> {player.battlePoint}</span>점
              </p>
              <p>
                <span className="text-info">{player.totalBattle}</span>전
                <span className="text-info"> {player.winBattle}</span>승
                <span className="text-info"> {player.loseBattle}</span>패
              </p>
            </div>
          </div>
          <div className="col-xs-9 col-sm-7">
            <div className="row">
              <div className="controller-container">
                <div className={`battle_roulette_container ${playerType}-3`}>
                  <div className={`${playerType}-roulette-3`} style={{ display: 'none' }}>
                    <img className="battle-roulette-img" src="/img/common/normal.png"/>
                    <img className="battle-roulette-img" src="/img/common/normal.png"/>
                    <img className="battle-roulette-img" src="/img/common/special.png"/>
                  </div>
                </div>
              </div>
              <div className="controller-container">
                <div className={`battle_roulette_container ${playerType}-2`}>
                  <div className={`${playerType}-roulette-2`} style={{ display: 'none' }}>
                    <img className="battle-roulette-img"
                      src={`${monsterImgRoute}/${playerType === 'user' ?
                        this.props.rivalEntryForBattle[0]._mon.img[this.props.rivalEntryForBattle[0].imgIdx]
                        : this.props.userEntryForBattle[0]._mon.img[this.props.userEntryForBattle[0].imgIdx]}`}
                    />
                    <img className="battle-roulette-img"
                      src={`${monsterImgRoute}/${playerType === 'user' ?
                        this.props.rivalEntryForBattle[1]._mon.img[this.props.rivalEntryForBattle[1].imgIdx]
                        : this.props.userEntryForBattle[1]._mon.img[this.props.userEntryForBattle[1].imgIdx]}`}
                    />
                    <img className="battle-roulette-img"
                      src={`${monsterImgRoute}/${playerType === 'user' ?
                        this.props.rivalEntryForBattle[2]._mon.img[this.props.rivalEntryForBattle[2].imgIdx]
                        : this.props.userEntryForBattle[2]._mon.img[this.props.userEntryForBattle[2].imgIdx]}`}
                    />
                  </div>
                </div>
              </div>
              <div className="controller-container">
                <div className={`battle_roulette_container ${playerType}-1`}>
                  <div className={`${playerType}-roulette-1`} style={{ display: 'none' }}>
                    <img className="battle-roulette-img"
                      src={`${monsterImgRoute}/${playerType === 'rival' ?
                        this.props.rivalEntryForBattle[0]._mon.img[this.props.rivalEntryForBattle[0].imgIdx]
                        : this.props.userEntryForBattle[0]._mon.img[this.props.userEntryForBattle[0].imgIdx]}`}
                    />
                    <img className="battle-roulette-img"
                      src={`${monsterImgRoute}/${playerType === 'rival' ?
                        this.props.rivalEntryForBattle[1]._mon.img[this.props.rivalEntryForBattle[1].imgIdx]
                        : this.props.userEntryForBattle[1]._mon.img[this.props.userEntryForBattle[1].imgIdx]}`}
                    />
                    <img className="battle-roulette-img"
                      src={`${monsterImgRoute}/${playerType === 'rival' ?
                        this.props.rivalEntryForBattle[2]._mon.img[this.props.rivalEntryForBattle[2].imgIdx]
                        : this.props.userEntryForBattle[2]._mon.img[this.props.userEntryForBattle[2].imgIdx]}`}
                    />
                  </div>
                </div>
              </div>
              <div className="controller-container">
                <div className={`text-center ${playerType}-bonus-info`}>
                  <div className="bonus-type"></div>
                  <div className="bonus-pct"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const renderMonsters = (playerType) => {
      const entry = playerType === 'rival' ? this.props.rivalEntryForBattle : this.props.userEntryForBattle;
      let index = 0;
      const returnComponent = [];
      for (const monster of entry) {
        returnComponent.push(
          <MonsterInArena
            key={monster._id}
            playerType={playerType}
            monster={monster}
            index={index++}
          />
        );
      }
      return returnComponent;
    };
    const renderArena = () => {
      return (
        <div className="row battle-arena">
          {renderMonsters('rival')}
          <div className="vs-space"></div>
          {renderMonsters('user')}
        </div>
      );
    };
    const renderSpeedController = () => {
      return (
        <div className="row speed-controller">
          <div className="col-xs-12">
            시합 속도 : <span className="badge badge-primary">x<span className="game-speed">{this.props.gameSpeed}</span></span>
            <div className="help-block ui-slider-orange" id="speed-slider"></div>
          </div>
        </div>
      );
    };
    const renderResult = () => {
      return (
        <div className="row battle-result text-center">
          <div className="result-container text-center">
            <div className="result-content"
              style={{ textAlign: 'center', position: 'absolute', zIndex: '999' }}
            >
              <h3>
                <b>
                  <p className="perfect text-primary">
                    {this.props.battleInfo.result[this.props.battleInfo.result.length - 1].perfect ? 'PERFECT GAME!!' : null}
                  </p>
                </b>
              </h3>
              <h3>
                <b>
                  <span className="winner text-primary">
                    {this.props.battleInfo.result[this.props.battleInfo.result.length - 1].winner === 'user' ? this.props.user.nickname : this.props.rival.nickname}
                  </span>
                </b>
                님이 승리하셨습니다.
              </h3>
              <p>
                <button className="btn btn-primary btn-lg" id="next-btn" onClick={this._handleOnClickNext}>확인</button>
              </p>
            </div>
            <div style={{ backgroundColor: 'white', opacity: '.5', position: 'absolute', width: '100%', height: '100%' }}></div>
          </div>
        </div>
      );
    };
    return (
      <div className="page-content">
        {renderPlayerInfo(this.props.rival, this.props.rivalEntryForBattle, 'rival')}
        <div className="space-30 hidden-xs"></div>
        {renderArena()}
        <div className="space-30 hidden-xs"></div>
        {renderPlayerInfo(this.props.user, this.props.userEntryForBattle, 'user')}
        {renderSpeedController()}
        {renderResult()}
        <input type="hidden" readOnly value={this.props.battleInfo.firstAttack} id="first-attack"/>
        <input type="hidden" readOnly value={JSON.stringify(this.props.battleInfo.result)} id="result-data"/>
        <input type="hidden" readOnly value={this.props.gameSpeed} id="game-speed"/>
        <div className="blood-attack"></div>
      </div>
    );
  }
}

BattleView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  userEntryForBattle: store.userEntryForBattle,
  rivalEntryForBattle: store.rivalEntryForBattle,
  battleInfo: store.battleInfo,
  rival: store.rival,
  user: store.user,
  gameSpeed: store.gameSpeed,
});

BattleView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userEntryForBattle: PropTypes.array.isRequired,
  rivalEntryForBattle: PropTypes.array.isRequired,
  battleInfo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  rival: PropTypes.object.isRequired,
  gameSpeed: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(BattleView);
