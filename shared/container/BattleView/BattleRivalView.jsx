import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import EntryComponent from '../../components/Common/EntryComponent';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import { getEntryForBattleFromUser, getAttrMatchAdjustedVar, appendInlineScripts } from '../../util/Util';
import { updateUserToLose } from '../../service/UserService';

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
      for (const userCollection of userEntry) {
        for (const rivalCollection of rivalEntry) {
          userAttrBonus += getAttrMatchAdjustedVar(userCollection, rivalCollection).toFixed(2) * 100 - 100;
          rivalAttrBonus += getAttrMatchAdjustedVar(rivalCollection, userCollection).toFixed(2) * 100 - 100;
        }
      }
      userAttrBonus = userAttrBonus / 9;
      rivalAttrBonus = rivalAttrBonus / 9;
      this.setState({
        userAttrBonus: userAttrBonus.toFixed(1),
        rivalAttrBonus: rivalAttrBonus.toFixed(1),
      });
    });
  }
  componentDidMount() {
    const scripts = ['/js/inline/catch-exit.js'];
    appendInlineScripts(scripts);
  }
  _handleOnClickNext() {
    $('#next-btn').attr('disabled', 'disabled');
    browserHistory.push('decide-first-attack');
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
                  <strong>{this.state.rivalAttrBonus}</strong></span><small>%</small>
                </h3>
                <h2 className="text-danger"><strong>VS</strong></h2>
                <h3>
                  <i className="fa fa-chevron-circle-up text-primary"></i> <small>평균상성: </small>
                  <span className={`${this.state.userAttrBonus < 0 ? 'text-danger' : 'text-primary'}`}>
                  <strong>{this.state.userAttrBonus}</strong></span><small>%</small>
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
