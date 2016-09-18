import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setMenu } from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import { removeInlineScripts, appendInlineScripts } from '../../util/Util';
import { updateUserToLose } from '../../service/UserService';
import { browserHistory } from 'react-router';

class BattleReadyView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'BattleReadyView';
    this._handleOnClickReady = this._handleOnClickReady.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(setMenu('battle-league'));
    removeInlineScripts();
    const scriptSrcs = ['/js/align-middle.js'];
    appendInlineScripts(scriptSrcs);
  }
  componentWillUnmount() {
    removeInlineScripts();
  }
  _handleOnClickReady() {
    // 시합 준비시 유저의 패를 1 기록하고 시작
    updateUserToLose(this.props.user)
    .then(() => {
      browserHistory.push('league-battle-check-rival');
    });
  }
  render() {
    const renderContent = () => {
      return (
        <div className="col-xs-12 align-center center-middle">
          <p><big>시합을 시작할 준비가 됐니?<br/>시합 시작 이후에 페이지를 이동하면 패배 처리가 돼.<br/>준비가 됐다면 아래 버튼을 클릭하렴.</big></p>
          <button className="btn btn-primary btn-xlg" onClick={this._handleOnClickReady}>I'M READY!!</button>
        </div>
      );
    };
    return (
      <ContentView
        title="포켓몬 리그"
        content={renderContent()}
      />
    );
  }
}

BattleReadyView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
});

BattleReadyView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(BattleReadyView);
