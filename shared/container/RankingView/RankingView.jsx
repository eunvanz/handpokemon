import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import RankingComponent from '../../components/Common/RankingComponent';
import MonsterRankingComponent from '../../components/Common/MonsterRankingComponent';
import $ from 'jquery';
import keygen from 'keygenerator';

let rank = 0;
let count = 0;
let prePoint = 0;
let category = '';

class RankingView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RankingView';
    this.state = {
      page: 0,
      srcs: [],
      lists: [],
    };
    this._handleScroll = this._handleScroll.bind(this);
    this._loadNewPage = this._loadNewPage.bind(this);
    this._renderNextRank = this._renderNextRank.bind(this);
    this._renderNextPage = this._renderNextPage.bind(this);
    rank = 0;
    count = 0;
    prePoint = 0;
    category = location.pathname.split('-')[1];
  }
  componentDidMount() {
    this.props.dispatch(Actions.setMenu(`ranking-${category}`));
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      if (category === 'collection' || category === 'battle') {
        return this.props.dispatch(Actions.fetchMonsterCountInfo());
      }
      return Promise.resolve();
    })
    .then(() => {
      this._loadNewPage();
    });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
    if (category === 'collection' || category === 'battle') this.props.dispatch(Actions.clearUsers());
    if (category === 'pokemon') this.props.dispatch(Actions.clearAllMons());
  }
  _handleScroll() {
    const scrolledHeight = $(window).scrollTop();
    const totalHeight = $('.main-content-inner').height() - $(window).height();
    const restHeightToAction = 100;
    if (totalHeight - scrolledHeight < restHeightToAction) {
      this._loadNewPage();
      window.removeEventListener('scroll', this._handleScroll); // 한 번 로드하고 이벤트 제거
    }
  }
  _loadNewPage() {
    const newStatePage = this.state.page + 1;
    this.setState({ page: newStatePage });
    let dispatch = null;
    if (category === 'collection' || category === 'battle') dispatch = this.props.dispatch(Actions.fetchUsersForRank(category, newStatePage));
    else if (category === 'pokemon') dispatch = this.props.dispatch(Actions.fetchCollectionsForRank(newStatePage));
    dispatch.then(() => {
      const srcs = this.state.srcs;
      if (category === 'collection' || category === 'battle') srcs.push(this.props.users);
      else if (category === 'pokemon') srcs.push(this.props.allMons);
      this.setState({
        srcs,
      });
      this._renderNextPage();
      let condition = 0;
      if (category === 'collection' || category === 'battle') condition = this.props.users.pages;
      else if (category === 'pokemon') condition = this.props.allMons.pageCount;
      if (condition > newStatePage) window.addEventListener('scroll', this._handleScroll);
    });
  }
  _renderNextPage() {
    const domArr = this._renderNextRank();
    const lists = this.state.lists;
    lists.push(domArr);
    this.setState({ lists });
  }
  _renderNextRank() {
    let returnComponent = null;
    if (this.state.srcs.length > 0) {
      const oneSrc = this.state.srcs[this.state.page - 1];
      let arrToMap = [];
      if (category === 'collection' || category === 'battle') arrToMap = oneSrc.docs;
      else if (category === 'pokemon') arrToMap = oneSrc.mons;
      returnComponent = arrToMap.map(item => {
        count++;
        if (category === 'collection' || category === 'battle') {
          const user = item;
          if (prePoint !== (category === 'collection' ? user.colPoint : user.battlePoint)) rank = rank + (count - rank);
          prePoint = category === 'collection' ? user.colPoint : user.battlePoint;
          return (
            <div key={user._id}>
              <RankingComponent
                rank={rank}
                category={category}
                user={user}
                monsterCountInfo={this.props.monsterCountInfo}
              />
            </div>
          );
        } else if (category === 'pokemon') {
          const monster = item;
          if (prePoint !== monster.totalAbility) rank = rank + (count - rank);
          prePoint = monster.totalAbility;
          return (
            <div key={keygen._()}>
              <MonsterRankingComponent
                distinct={this.props.user._id === monster._user._id}
                rank={rank}
                monster={monster}
              />
            </div>
          );
        }
      });
    }
    return returnComponent;
  }
  render() {
    const renderTitle = () => {
      let title = '';
      if (category === 'collection') title = '콜렉션 랭킹';
      else if (category === 'battle') title = '시합 랭킹';
      else if (category === 'pokemon') title = '포켓몬 랭킹';
      return title;
    };
    const renderUserRank = () => {
      if ((category === 'collection' || category === 'battle') && this.props.user) {
        let myRank = 0;
        if (category === 'collection') myRank = this.props.user.colRank;
        else if (category === 'battle') myRank = this.props.user.battleRank;
        return (
          <RankingComponent
            distinct
            rank={myRank}
            category={category}
            user={this.props.user}
            monsterCountInfo={this.props.monsterCountInfo}
          />
        );
      }
    };
    const renderLists = () => {
      const returnComponent = [];
      for (let i = 0; i < this.state.lists.length; i++) {
        for (const dom of this.state.lists[i]) {
          returnComponent.push(dom);
        }
      }
      return returnComponent;
    };
    // TODO: 언젠간 구현할 코스트별 포켓몬 랭킹 보기
    // const renderSelectBox = () => {
    //   let returnComponent = null;
    //   if (category === 'pokemon') {
    //     returnComponent = (
    //       <div className="col-xs-12 text-right">
    //         <select className="form-control" style={{ width: '100px' }} onChange={this._changeCost}>
    //           <option value="0">모든 코스트</option>
    //           <option value="1">코스트 1</option>
    //           <option value="2">코스트 2</option>
    //           <option value="3">코스트 3</option>
    //           <option value="4">코스트 4</option>
    //           <option value="5">코스트 5</option>
    //           <option value="6">코스트 6</option>
    //           <option value="7">코스트 7</option>
    //           <option value="8">코스트 8</option>
    //           <option value="9">코스트 9</option>
    //           <option value="10">코스트 10</option>
    //         </select>
    //       </div>
    //     );
    //   }
    //   return returnComponent;
    // };
    const renderContent = () => {
      return (
        <div id="list-wrapper">
          <div id="list-container">
          {renderUserRank()}
          {renderLists()}
          </div>
        </div>
      );
    };
    return (
      <ContentView
        wrapperId="ranking-view"
        title={renderTitle()}
        content={renderContent()}
      />
    );
  }
}

RankingView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  users: store.users,
  monsterCountInfo: store.monsterCountInfo,
  allMons: store.allMons,
});

RankingView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  users: PropTypes.object,
  monsterCountInfo: PropTypes.object.isRequired,
  allMons: PropTypes.object,
};

export default connect(mapStateToProps)(RankingView);
