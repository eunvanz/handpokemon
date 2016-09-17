import React, { PropTypes } from 'react';
import LeagueIcon from './LeagueIcon';
import { Link } from 'react-router';
import { monsterImgRoute } from '../../util/constants';
import { convertCollectionToMonsterForMonsterCard } from '../../util/Util';
import CostComponent from './CostComponent';
import MonsterModal from './MonsterModal';

class MonsterRankingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterRankingComponent';
    this.state = {
      showMonsterModal: false,
    };
    this._showMonsterModal = this._showMonsterModal.bind(this);
    this._hideMonsterModal = this._hideMonsterModal.bind(this);
  }
  _showMonsterModal(e) {
    e.preventDefault();
    this.setState({ showMonsterModal: true });
  }
  _hideMonsterModal() {
    this.setState({ showMonsterModal: false });
  }
  render() {
    const monster = this.props.monster;
    const renderMonsterModal = () => {
      const convertedMonster = convertCollectionToMonsterForMonsterCard(monster);
      return (
        <MonsterModal
          monster={convertedMonster}
          show={this.state.showMonsterModal}
          close={this._hideMonsterModal}
        />
      );
    };
    return (
      <div className="col-xs-12 col-sm-6 widget-container-col">
        <div className={`widget-box ${this.props.distinct ? 'widget-color-blue' : null}`}>
          <div className="widget-body">
            <div className="row widget-main">
              <div className="col-sm-1 col-xs-2 text-center col-rank" style={{ width: '50px' }}>
                <h4 className="text-primary">
                  <b>{this.props.rank}</b>
                </h4>
                <LeagueIcon league={monster._user.league}/>
              </div>
              <div className="col-sm-3 col-xs-4 text-center">
                <p>
                  <img className="monster-image picks"
                    src={`${monsterImgRoute}/${monster._mon.img[monster.imgIdx]}`}
                    onClick={this._showMonsterModal}
                    style={{ maxWidth: '100px' }}
                  />
                </p>
                <p>
                  <span className="label label-info arrowed-in-right">
                    LV.{monster.level}
                  </span>
                </p>
              </div>
              <div className="col-sm-7 col-xs-5">
                <div className="row hidden-xs">
                  <div className="col-xs-5">
                    <p>
                      <big className="text-primary">
                        <b>이름</b>
                      </big>
                    </p>
                  </div>
                  <div className="col-xs-7">
                    <big>{monster._mon.name}</big>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-5">
                    <p>
                      <big className="text-primary">
                        <b>트레이너</b>
                      </big>
                    </p>
                  </div>
                  <div className="col-xs-7">
                    <p>
                      <Link to={`collection/${monster._user._id}`}>
                        <big>{monster._user.nickname}</big>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="row hidden-xs">
                  <div className="col-xs-5">
                    <p>
                      <big className="text-primary">
                        <b>코스트</b>
                      </big>
                    </p>
                  </div>
                  <div className="col-xs-7">
                    <div style={{ marginBottom: '10px' }}>
                      <CostComponent cost={monster._mon.cost}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-5">
                    <p>
                      <big className="text-primary">
                        <b>전투력</b>
                      </big>
                    </p>
                  </div>
                  <div className="col-xs-12 col-sm-7">
                    <span className="badge badge-inverse">{monster.totalAbility}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderMonsterModal()}
      </div>
    );
  }
}

MonsterRankingComponent.propTypes = {
  distinct: PropTypes.bool,
  rank: PropTypes.number,
  monster: PropTypes.object.isRequired,
};

export default MonsterRankingComponent;
