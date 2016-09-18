import React, { PropTypes } from 'react';
import LeagueIcon from './LeagueIcon';
import UserPhotoComponent from './UserPhotoComponent';
import { Link } from 'react-router';

class RankingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RankingComponent';
  }
  render() {
    const user = this.props.user;
    const category = this.props.category;
    const monsterCountInfo = this.props.monsterCountInfo;
    const renderHeader = () => {
      if (this.props.distinct) {
        return (
          <div className="widget-header">
            <h5>나의 랭킹</h5>
          </div>
        );
      }
    };
    const renderRankingInfo = () => {
      let returnComponent = null;
      if (category === 'collection') {
        returnComponent = (
          <div className="row">
						<div className="col-sm-3 hidden-xs text-right">
							<h5>콜렉션점수</h5>
						</div>
						<div className="col-sm-7 hidden-xs" style={{ paddingTop: '9px' }}>
							<div className="progress progress-striped active">
								<div className="progress-bar progress-bar-warning collection-point-bar" style={{ width: `${user.colPoint / monsterCountInfo.totalPoint * 100}%` }} >
                </div>
              </div>
						</div>
						<div className="col-sm-2 col-xs-12 text-right">
							<h5>{user.colPoint}/{monsterCountInfo.totalPoint}</h5>
						</div>
					</div>
        );
      } else if (category === 'battle') {
        returnComponent = (
          <div className="row">
            <div className="col-sm-8 hidden-xs text-center">
              <h5>
                <span className="lebel label-lg label-yellow">시합전적</span>
                {user.totalBattle}전 {user.winBattle}승 {user.loseBattle}패
              </h5>
            </div>
            <div className="col-sm-4 col-xs-12 text-right">
              <h5>
                <span className="label label-lg label-warning">시합점수</span>
                {user.battlePoint}점
              </h5>
            </div>
          </div>
        );
      }
      return returnComponent;
    };
    return (
      <div className="col-xs-12 widget-container-col">
        <div className={`widget-box ${this.props.distinct ? 'widget-color-blue' : null}`}>
          {renderHeader()}
          <div className="widget-body" style={{ padding: '0px 10px' }}>
            <div className="row widget-main">
              <div className="col-sm-1 col-xs-2 text-center col-rank">
                <h4 className="text-primary">
                  <b>{this.props.rank}</b>
                </h4>
                <LeagueIcon league={user.league}/>
              </div>
              <div className="col-sm-2 col-xs-4 text-center">
                <UserPhotoComponent
                  user={user}
                />
              </div>
              <div className="col-sm-9 col-xs-6">
                <div className="row">
                  <div className="row">
                    <div className="col-sm-9 col-xs-12">
                    {renderRankingInfo()}
                    </div>
                    <div className="col-sm-3 col-xs-12 text-right">
                      <Link to={`collection/${user._id}`}>
                        <button className="btn btn-primary hidden-xs">콜렉션 보기</button>
                      </Link>
                      <Link to={`collection/${user._id}`}>
                        <button className="btn btn-primary visible-xs-inline-block btn-sm">콜렉션 보기</button>
                      </Link>
                    </div>
                  </div>
                  <div className="space hidden-xs"></div>
                  <div className="row hidden-xs">
                    <div className="col-xs-12">
                      <div className="itemdiv dialogdiv" style={{ minHeight: '0px', paddingRight: '0px' }}>
                        <div className="body" style={{ marginRight: '0px', marginLeft: '30px' }}>{user.introduce ? user.introduce : '자기소개가 없습니다.'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RankingComponent.propTypes = {
  distinct: PropTypes.bool,
  rank: PropTypes.number,
  user: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  monsterCountInfo: PropTypes.object.isRequired,
};

export default RankingComponent;
