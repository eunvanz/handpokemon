import React, { PropTypes } from 'react';
import { monsterImgRoute } from '../../util/constants';
import * as util from '../../util/Util';
import MonsterModal from './MonsterModal';

class MonsterInArena extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterInArena';
    this.state = {
      showModal: false,
    };
    this._handleOnClickMonster = this._handleOnClickMonster.bind(this);
    this._handleOnClickClose = this._handleOnClickClose.bind(this);
  }
  _handleOnClickMonster() {
    this.setState({ showModal: true });
  }
  _handleOnClickClose() {
    this.setState({ showModal: false });
  }
  render() {
    const playerType = this.props.playerType;
    const monster = this.props.monster;
    const index = this.props.index;
    return (
      <div className="col-xs-4 text-center">
        <div className="special-info text-info text-center">
          <div className={`${playerType}-mon-${index}-special special-text`}></div>
        </div>
        <div className="damage-info text-danger text-center">
          <div className={`${playerType}-mon-${index}-damage damage-text`}></div>
        </div>
        <div className={`mon-object ${playerType}-mon-${index}`} style={{ margin: '0 auto' }}>
          <div className="progress progress-mini">
            <div className="progress-bar progress-bar-yellow" style={{ width: '100%' }}></div>
          </div>
          <div className="hp-info">
            <span className={`${playerType}-mon-${index}-restHp`}>
              {util.getRealHpFromCollection(monster)}
            </span>
            /{util.getRealHpFromCollection(monster)}
          </div>
          <img className="battle-monster"
            src={`${monsterImgRoute}/${monster._mon.img[monster.imgIdx]}`}
            onClick={this._handleOnClickMonster}
          />
        </div>
        <MonsterModal
          monster={util.convertCollectionToMonsterForMonsterCard(monster)}
          show={this.state.showModal}
          close={this._handleOnClickClose}
        />
      </div>
    );
  }
}

MonsterInArena.propTypes = {
  playerType: PropTypes.string.isRequired,
  monster: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default MonsterInArena;
