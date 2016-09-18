import React, { PropTypes } from 'react';
import UserPhotoComponent from './UserPhotoComponent';
import MonsterCard from './MonsterCard';
import { convertCollectionToMonsterForMonsterCard, getTotalAbilityFromCollection } from '../../util/Util';
import * as constants from '../../util/constants';
import keygen from 'keygenerator';

class EntryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'EntryComponent';
  }
  render() {
    const renderEntries = () => {
      const entrySeq = this.props.user.entrySeq;
      const entries = this.props.user._collections.filter(collection => {
        return collection.entry === entrySeq;
      });
      const returnComponent = entries.map(collection => {
        const collectionForMonsterCard = convertCollectionToMonsterForMonsterCard(collection);
        return <MonsterCard key={keygen._()} monster={collectionForMonsterCard}/>;
      });
      return returnComponent;
    };
    const getCost = () => {
      let cost = 0;
      const entries = this.props.user._collections.filter(collection => {
        return collection.entry === this.props.user.entrySeq;
      });
      entries.forEach(collection => cost += collection._mon.cost);
      return cost;
    };
    const getTotalAbility = () => {
      let cost = 0;
      const entries = this.props.user._collections.filter(collection => {
        return collection.entry === this.props.user.entrySeq;
      });
      entries.forEach(collection => cost += getTotalAbilityFromCollection(collection));
      return cost;
    };
    return (
      <div className={`widget-box ${this.props.myEntry ? 'widget-color-blue' : 'widget-color-red3'}`}>
        <div className="widget-header"><h5>{this.props.myEntry ? '나의 엔트리' : '상대방 엔트리'}</h5></div>
        <div className="widget-body">
          <div className="widget-main">
            <div className="row">
              <div className="col-xs-6 col-sm-3 text-center">
                <div className="space-10"></div>
                <UserPhotoComponent
                  user={this.props.user}
                />
                <div className="space-10"></div>
                <div className="row align-left">
                  <div className="col-xs-5">
                    <big className="text-primary">코스트</big>
                  </div>
                  <div className="col-xs-7">
                    <p>
                      <badge className="badge badge-warning">{getCost()}</badge>
                      /{constants.leagues[this.props.user.league].maxCost}
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
                        <badge className="badge badge-inverse">{getTotalAbility()}</badge>
                      </big>
                    </p>
                  </div>
                </div>
              </div>
              {renderEntries()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EntryComponent.propTypes = {
  myEntry: PropTypes.bool,
  rivalEntry: PropTypes.bool,
  user: PropTypes.object.isRequired,
};

export default EntryComponent;
