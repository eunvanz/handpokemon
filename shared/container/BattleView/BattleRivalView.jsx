import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import EntryComponent from '../../components/Common/EntryComponent';
import $ from 'jquery';
import { getEntryForBattleFromUser, getAttrMatchAdjustedVar, getTotalAttackFromCollection } from '../../util/Util';
import { updateUserToLose } from '../../service/UserService';
import HelpComponent from '../../components/Common/HelpComponent';

class BattleRivalView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'BattleRivalView';
    this._handleOnClickNext = this._handleOnClickNext.bind(this);
    this.state = {
      userAttrBonus: 0,
      rivalAttrBonus: 0,
    };
  }
  componentWillMount() {
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      return this.props.dispatch(Actions.fetchRivalForLeague(this.props.user));
    })
    .then(() => {
      // 유저의 1패를 기록하고 시작
      return updateUserToLose(this.props.user);
    })
    .then(() => {
      const userEntry = getEntryForBattleFromUser(this.props.user);
      this.props.dispatch(Actions.getUserEntryForBattle(userEntry));
      const rivalEntry = getEntryForBattleFromUser(this.props.rival);
      this.props.dispatch(Actions.getRivalEntryForBattle(rivalEntry));
      const firstAttackFlag = Math.floor(Math.random() * 2); // 0일경우 선공, 1일경우 후공
      this.props.dispatch(Actions.getFirstAttackFlag(firstAttackFlag));
      let userAttrBonus = 0;
      let rivalAttrBonus = 0;
      const userAttackRatio = [getTotalAttackFromCollection(userEntry[0]), getTotalAttackFromCollection(userEntry[1]), getTotalAttackFromCollection(userEntry[2])];
      const userTotalAttack = userAttackRatio.reduce((pre, cur) => pre + cur);
      const rivalAttackRatio = [getTotalAttackFromCollection(rivalEntry[0]), getTotalAttackFromCollection(rivalEntry[1]), getTotalAttackFromCollection(rivalEntry[2])];
      const rivalTotalAttack = rivalAttackRatio.reduce((pre, cur) => pre + cur);
      for (let i = 0; i < userEntry.length; i++) {
        for (let j = 0; j < rivalEntry.length; j++) {
          userAttrBonus += (getAttrMatchAdjustedVar(userEntry[i], rivalEntry[j]) * 100 - 100) * (userAttackRatio[i] / userTotalAttack);
          rivalAttrBonus += (getAttrMatchAdjustedVar(rivalEntry[j], userEntry[i]) * 100 - 100) * (rivalAttackRatio[j] / rivalTotalAttack);
        }
      }
      this.setState({
        userAttrBonus: userAttrBonus.toFixed(1),
        rivalAttrBonus: rivalAttrBonus.toFixed(1),
      });
    });
  }
  componentDidMount() {
    this.context.router.listenBeforeUnload(() => {
      return '이 페이지에서 벗어나면 패배처리됩니다. 나가시겠습니까?';
    });
  }
  _handleOnClickNext() {
    $('#next-btn').attr('disabled', 'disabled');
    this.context.router.replace('decide-first-attack');
  }
  render() {
    const renderRivalEntry = () => {
      return (
        <EntryComponent
          rivalEntry
          entry={this.props.rivalEntryForBattle}
          user={this.props.rival}
        />
      );
    };
    const renderUserEntry = () => {
      return (
        <EntryComponent
          myEntry
          entry={this.props.userEntryForBattle}
          user={this.props.user}
        />
      );
    };
    const renderBonusHelpComponent = () => {
      return (
        <HelpComponent
          title="평균상성"
          content="각각의 포켓몬에 대해 상성보너스 혹은 패널티를 공격력에 가중치를 두어 계산한 평균 상성보너스(혹은 패널티)로 시합에서 대략 이 정도의 상성보너스(혹은 패널티) 효과를 얻을 수 있습니다."
        />
      );
    };
    const renderContent = () => {
      if (this.props.user && this.props.rival && this.props.rivalEntryForBattle && this.props.userEntryForBattle) {
        return (
          <div>
            {renderRivalEntry()}
            <div className="row">
              <div className="col-xs-12 text-center">
                <h3>
                  <i className="fa fa-chevron-circle-down text-primary"></i> <small>평균상성: </small>
                  <span className={`${this.state.rivalAttrBonus < 0 ? 'text-danger' : 'text-primary'}`}>
                  <strong>{this.state.rivalAttrBonus}</strong></span><small>%</small> {renderBonusHelpComponent()}
                </h3>
                <h3><span className="label label-xlg label-danger arrowed-in-right arrowed-in"><strong>VS</strong></span></h3>
                <h3>
                  <i className="fa fa-chevron-circle-up text-primary"></i> <small>평균상성: </small>
                  <span className={`${this.state.userAttrBonus < 0 ? 'text-danger' : 'text-primary'}`}>
                  <strong>{this.state.userAttrBonus}</strong></span><small>%</small> {renderBonusHelpComponent()}
                </h3>
              </div>
            </div>
            {renderUserEntry()}
            <div className="space"></div>
            <div className="row">
              <div className="col-xs-12 text-center">
                <button className="btn btn-primary btn-xlg" id="next-btn" onClick={this._handleOnClickNext}>시합시작</button>
              </div>
            </div>
          </div>
        );
      }
    };
    return (
      <ContentView
        title="출전 포켓몬 확인"
        content={renderContent()}
      />
    );
  }
}

BattleRivalView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  rival: store.rival,
  userEntryForBattle: store.userEntryForBattle,
  rivalEntryForBattle: store.rivalEntryForBattle,
});

BattleRivalView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  rival: PropTypes.object,
  userEntryForBattle: PropTypes.array,
  rivalEntryForBattle: PropTypes.array,
};

export default connect(mapStateToProps)(BattleRivalView);
