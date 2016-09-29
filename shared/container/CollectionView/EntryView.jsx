import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import MonsterCard from '../../components/Common/MonsterCard';
import * as Util from '../../util/Util';
import keygen from 'keygenerator';
import * as constants from '../../util/constants';
import { browserHistory } from 'react-router';
import { updateUserBattlePossible } from '../../service/UserService';

class EntryView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'EntryView';
    this._clickChangeBtn = this._clickChangeBtn.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(Actions.fetchEntryState(this.props.user._id))
    .then(() => {
      const entryState = this.props.entryState;
      if (!this.props.user.battlePossible
        && entryState.entry1.length === 3
        && entryState.entry2.length === 3
        && entryState.entry3.length === 3) {
        return updateUserBattlePossible(this.props.user, true);
      }
      return Promise.resolve();
    })
    .then(() => {
      return this.props.dispatch(Actions.fetchCollectionUser(this.props.user._id));
    });
  }
  componentDidMount() {
    Util.removeInlineScripts();
    this.props.dispatch(Actions.setMenu('collection-entry'));
    this.props.dispatch(Actions.clearSelectedMons());
    this.props.dispatch(Actions.clearEntryAsIs());
    const scriptSrcs = ['/js/collection-view-inline.js'];
    Util.appendInlineScripts(scriptSrcs);
  }
  _clickChangeBtn() {
    browserHistory.push('/entry-ready');
  }
  render() {
    const entryState = this.props.entryState;
    const renderMonsterCardComponent = (entryNo) => {
      const returnComponent = [];
      let collectionsInEntry = null;
      if (entryNo === 1) collectionsInEntry = entryState.entry1;
      else if (entryNo === 2) collectionsInEntry = entryState.entry2;
      else if (entryNo === 3) collectionsInEntry = entryState.entry3;
      let collection = {};
      let monster = {};
      for (let i = 0; i < collectionsInEntry.length; i++) {
        collection = collectionsInEntry[i];
        monster = Util.convertCollectionToMonsterForMonsterCard(collection);
        returnComponent.push(
          <div key={monster._id}>
            <MonsterCard
              monster={monster}
              selectable
              entryMode
              entryNo={monster.entry}
            />
          </div>
        );
      }
      for (let i = 0; i < 3 - collectionsInEntry.length; i++) {
        returnComponent.push(
          <div key={keygen._()}>
            <MonsterCard
              monster={null}
              selectable
              entryMode
              entryNo={entryNo}
            />
          </div>
        );
      }
      return returnComponent;
    };
    const renderEntryComponents = () => {
      const returnComponent = [];
      let containerClass = '';
      let title = null;
      let entry = [];
      let cost = 0;
      let battlePower = 0;
      for (let i = 1; i <= 3; i++) {
        containerClass = 'widget-color-grey';
        title = null;
        if (this.props.collectionUser && this.props.collectionUser.entrySeq === i) {
          containerClass = 'widget-color-blue';
          title = (<div className="widget-header"><h5 className="widget-title">다음 시합 출전</h5></div>);
        }
        if (i === 1) entry = entryState.entry1;
        else if (i === 2) entry = entryState.entry2;
        else if (i === 3) entry = entryState.entry3;
        cost = 0;
        battlePower = 0;
        for (const collection of entry) {
          cost += collection._mon.cost;
          battlePower += Util.getBattlePowerFromCollection(collection);
        }
        const entryComponent = (
          <div key={keygen._()} className={`widget-box ${containerClass}`}>
            {title}
            <div className="widget-body">
              <div className="widget-main">
                <div className="row">
                  <div className="col-xs-6 col-sm-3 text-center">
                    <h1 className="text-primary">{`엔트리 ${i}`}</h1>
                    <div className="row align-left">
                      <div className="col-xs-5">
                        <big className="text-primary">코스트</big>
                      </div>
                      <div className="col-xs-7">
                        <p>
                          <badge className="badge badge-warning">{cost}</badge>
                          /{this.props.collectionUser ? constants.leagues[this.props.collectionUser.league].maxCost : 0}
                        </p>
                      </div>
                    </div>
                    <div className="row align-left">
                      <div className="col-xs-5">
                        <big className="text-primary">전투력</big>
                      </div>
                      <div className="col-xs-7">
                        <p>
                          <big>
                            <badge className="badge badge-inverse">{battlePower}</badge>
                          </big>
                        </p>
                      </div>
                    </div>
                  </div>
                  {renderMonsterCardComponent(i)}
                </div>
              </div>
            </div>
          </div>
        );
        returnComponent.push(entryComponent);
      }
      return returnComponent;
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
                    <div className="col-sm-8 hidden-xs">
                      <h5>교체를 원하는 포켓몬을 선택 후 교체하기 버튼을 눌러주세요.</h5>
                    </div>
                    <div
                      className="col-sm-4 text-right visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"
                    >
                      <button className="btn btn-primary hidden-xs"
                        onClick={this._clickChangeBtn}
                      >
                        <i className="ace-icon fa fa-refresh"></i> 교체하기
                      </button>
                      <button
                        className="btn btn-primary btn-xs visible-xs-inline-block"
                        onClick={this._clickChangeBtn}
                      >
                        교체하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const renderContent = () => {
      return (
        <div>
          {renderFunctionBar()}
          {renderEntryComponents()}
        </div>
      );
    };
    return (
      <ContentView
        wrapperId="entry-view"
        title="엔트리 설정"
        content={renderContent()}
      />
    );
  }
}

EntryView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  collectionUser: store.collectionUser,
  entryState: store.entryState,
});

EntryView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  collectionUser: PropTypes.object,
  params: PropTypes.object,
  entryState: PropTypes.object,
};

export default connect(mapStateToProps)(EntryView);
