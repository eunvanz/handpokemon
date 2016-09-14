import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import RankingComponent from '../../components/Common/RankingComponent';
import $ from 'jquery';
import { renderToStaticMarkup } from 'react-dom/server';

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
      users: [],
    };
    this._handleScroll = this._handleScroll.bind(this);
    this._loadNewPage = this._loadNewPage.bind(this);
    this._renderNextRank = this._renderNextRank.bind(this);
    this._getMarkUpArrForNextPage = this._getMarkUpArrForNextPage.bind(this);
    rank = 0;
    count = 0;
    prePoint = 0;
    category = location.pathname.split('-')[1];
  }
  componentDidMount() {
    this.props.dispatch(Actions.setMenu(`ranking-${category}`));
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      return this.props.dispatch(Actions.fetchMonsterCountInfo());
    })
    .then(() => {
      this._loadNewPage();
    });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll);
    this.props.dispatch(Actions.clearUsers());
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
    this.props.dispatch(Actions.fetchUsersForRank(category, newStatePage))
    .then(() => {
      const userList = this.state.users;
      userList.push(this.props.users);
      this.setState({
        users: userList,
      });
      const markUpArr = this._getMarkUpArrForNextPage();
      for (const markUp of markUpArr) {
        $('#list-container').append(markUp);
      }
      if (this.props.users.pages > newStatePage) window.addEventListener('scroll', this._handleScroll);
    });
  }
  _getMarkUpArrForNextPage() {
    const markUpArr = [];
    const domArr = this._renderNextRank();
    for (const dom of domArr) {
      markUpArr.push(renderToStaticMarkup(dom));
    }
    return markUpArr;
  }
  _renderNextRank() {
    let returnComponent = null;
    if (this.state.users.length > 0) {
      const users = this.state.users[this.state.page - 1];
      returnComponent = users.docs.map(user => {
        count++;
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
      });
    }
    return returnComponent;
  }
  render() {
    const renderTitle = () => {
      let title = '';
      if (category === 'collection') title = '콜렉션 랭킹';
      else if (category === 'battle') title = '시합 랭킹';
      return title;
    };
    const renderUserRank = () => {
      if (this.props.user) {
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
    const renderContent = () => {
      return (
        <div id="list-container">
          {renderUserRank()}
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
});

RankingView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  users: PropTypes.object.isRequired,
  monsterCountInfo: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(RankingView);
