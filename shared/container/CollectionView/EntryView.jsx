import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import MonsterCard from '../../components/Common/MonsterCard';
import * as Util from '../../util/Util';

class EntryView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'EntryView';
    this.state = {
      entry1: [],
      entry2: [],
      entry3: [],
    };
  }
  componentWillMount() {
    this.props.dispatch(Actions.setMenu('collection-entry'));
    this.props.dispatch(Actions.fetchCollectionUser(this.props.params.collectionUserId))
    .then(() => {
      const collections = this.props.collectionUser._collections;
      const isInEntry = (collection) => {
        return collection.entry > 0;
      };
      const collectionsInEntry = collections.filter(isInEntry);
      for (const collection of collectionsInEntry) {
        if (collection.entry === 1) this.setState({ entry1: [...this.state.entry1, collection] });
        else if (collection.entry === 2) this.setState({ entry2: [...this.state.entry2, collection] });
        else if (collection.entry === 3) this.setState({ entry3: [...this.state.entry3, collection] });
      }
    });
  }
  render() {
    const renderMonsterCardComponent = (entryNo) => {
      const returnComponent = [];
      let collectionsInEntry = null;
      if (entryNo === 1) collectionsInEntry = this.state.entry1;
      else if (entryNo === 2) collectionsInEntry = this.state.entry2;
      else if (entryNo === 3) collectionsInEntry = this.state.entry3;
      for (let i = 0; i < collectionsInEntry.length; i++) {
        const collection = collectionsInEntry[i];
        const monster = Util.convertCollectionToMonsterForMonsterCard(collection);
        returnComponent.push(
          <div>
            <MonsterCard
              key={monster.monNo}
              monster={monster}
              entryMode
              entryNo={entryNo}
            />
          </div>
        );
      }
      for (let i = 0; i < 3 - collectionsInEntry.length; i++) {
        returnComponent.push(
          <div>
            <MonsterCard
              key={i}
              monster={null}
              entryMode
              entryNo={entryNo}
            />
          </div>
        );
      }
      return returnComponent;
    };
    const renderContent = () => {
      const returnComponent = [];
      for (let i = 1; i <= 3; i++) {
        let containerClass = 'widget-color-grey';
        let title = null;
        if (this.props.collectionUser && this.props.collectionUser.entrySeq === i) {
          containerClass = 'widget-color-blue';
          title = (<div className="widget-header"><h5 className="widget-title">다음 시합 출전</h5></div>);
        }
        const entryComponent = (
          <div className={`widget-box ${containerClass}`}>
            {title}
            <div className="widget-body">
              <div className="widget-main">
                <div className="row">
                  <div className="col-xs-6 col-sm-3 text-center">
                    <h1 className="text-primary">{`엔트리 ${i}`}</h1>
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
});

EntryView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  collectionUser: PropTypes.object,
  params: PropTypes.object,
};

export default connect(mapStateToProps)(EntryView);
