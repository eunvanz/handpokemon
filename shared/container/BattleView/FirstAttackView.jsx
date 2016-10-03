import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import { appendInlineScripts, removeInlineScripts } from '../../util/Util';
import { getBattleResultObject } from '../../util/battle';
import ContentView from '../../components/Common/ContentView';

class FirstAttackView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'FirstAttackView';
    this._handleOnClickStart = this._handleOnClickStart.bind(this);
  }
  componentDidMount() {
    const scriptSrcs = ['/js/roulette.js', '/js/inline/first-attack-view.js', '/js/align-middle.js'];
    appendInlineScripts(scriptSrcs);
    const userEntry = this.props.userEntryForBattle;
    const rivalEntry = this.props.rivalEntryForBattle;
    const firstAttackFlag = this.props.battleInfo.firstAttack;
    const battleResult = getBattleResultObject(userEntry, rivalEntry, firstAttackFlag);
    this.props.dispatch(Actions.getBattleResult(battleResult));
    this.context.router.listenBeforeUnload(() => {
      return '이 페이지에서 벗어나면 패배처리됩니다. 나가시겠습니까?';
    });
  }
  componentWillUnmount() {
    removeInlineScripts();
  }
  _handleOnClickStart() {
    // 시합화면으로 넘어가는 로직
    this.context.router.replace('battle');
  }
  render() {
    const renderFirstAttackRoulette = () => {
      return (
        <div className="row" id="first-attack-container">
          <div className="col-xs-12 center center-middle">
            <div>
              <h4>
                선공을 결정해야해.<br/>
                신중하게 클릭해보렴.
              </h4>
              <div className="roulette_container">
                <div className="white-effect"
                  style={{
                    opacity: '0',
                    backgoundColor: 'white',
                    width: '200px',
                    height: '200px',
                    float: 'left',
                    position: 'absolute',
                    zIndex: '1',
                  }}
                />
                <div className="first-attack-roulette" style={{ dispaly: 'none' }}>
                  <img src="/img/common/attack.png" width="200px" />
                  <img src="/img/common/defense.png" width="200px" />
                </div>
              </div>
              <div className="btn_container align-center">
                <p>
                  <button className="stop btn btn-warning btn-xlg">STOP</button>
                </p>
                <p className="start-btn" style={{ display: 'none' }} onClick={this._handleOnClickStart}>
                  <button className="btn btn-primary btn-xlg" id="start-battle">시작하기</button>
                </p>
              </div>
            </div>
          </div>
          <input type="hidden" value={this.props.battleInfo.firstAttack} id="pickIndex"/>
        </div>
      );
    };
    return (
      <ContentView
        title="선공결정"
        content={renderFirstAttackRoulette()}
      />
    );
  }
}

FirstAttackView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  rival: store.rival,
  userEntryForBattle: store.userEntryForBattle,
  rivalEntryForBattle: store.rivalEntryForBattle,
  battleInfo: store.battleInfo,
});

FirstAttackView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  rival: PropTypes.object.isRequired,
  userEntryForBattle: PropTypes.array.isRequired,
  rivalEntryForBattle: PropTypes.array.isRequired,
  battleInfo: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(FirstAttackView);
