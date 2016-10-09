import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import MonsterCard from '../../components/Common/MonsterCard';
import { Link } from 'react-router';
import { removeInlineScripts, appendInlineScripts } from '../../util/Util';
import HonorComponent from '../../components/Common/HonorComponent';
import { leagueIcons, leagues } from '../../util/constants';

class CollectionView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CollectionView';
    this.state = {
      collectionCountInfo: {},
      collections: [],
      collectionsMonNo: null,
    };
  }
  componentDidMount() {
    removeInlineScripts();
    const collectionUserId = this.props.params.collectionUserId;
    this.props.dispatch(Actions.setMenu('collection-my'));
    this.props.dispatch(Actions.fetchCollectionUser(collectionUserId))
    .then(() => { return this.props.dispatch(Actions.fetchMonsterCountInfo()); })
    .then(() => { return this.props.dispatch(Actions.fetchAllMons()); })
    .then(() => { return this.props.dispatch(Actions.fetchDesigners()); })
    .then(() => {
      const scriptSrcs = ['/js/collection-view-inline.js', '/js/pokemon-sort.js'];
      appendInlineScripts(scriptSrcs);
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.collectionUser) {
      const collections = nextProps.collectionUser._collections;
      const collectionCountInfo = {
        basic: 0,
        rare: 0,
        special: 0,
        sRare: 0,
        elite: 0,
        legend: 0,
      };
      const collectionsMonNo = new Set();
      for (const collection of collections) {
        collectionsMonNo.add(collection._mon.monNo);
        const grade = collection._mon.grade;
        if (grade === 'b') {
          collectionCountInfo.basic++;
        } else if (grade === 'r') {
          collectionCountInfo.rare++;
        } else if (grade === 'a') {
          collectionCountInfo.special++;
        } else if (grade === 'ar') {
          collectionCountInfo.sRare++;
        } else if (grade === 'e') {
          collectionCountInfo.elite++;
        } else if (grade === 'l') {
          collectionCountInfo.legend++;
        }
      }
      this.setState({ collections, collectionCountInfo, collectionsMonNo });
    }
  }
  componentWillUnmount() {
    this.props.dispatch(Actions.getCollectionUser(null));
    this.props.dispatch(Actions.clearAllMons());
  }
  render() {
    const collectionUser = this.props.collectionUser;
    const monsterCountInfo = this.props.monsterCountInfo;
    const collectionCountInfo = this.state.collectionCountInfo;
    const collections = this.state.collections;
    const renderOnlineTag = () => {
      if (collectionUser.online) {
        return (
          <span className="label label-primary arrowed-in-right">
            <i className="ace-icon fa fa-circle smaller-80 align-middle"></i>online
					</span>
        );
      }
    };
    const renderHonorTag = () => {
      return (<HonorComponent honor={this.props.collectionUser._honor1} secondHonor={this.props.collectionUser._honor2}/>);
    };
    const renderWinRate = () => {
      let returnComponent = null;
      if (collectionUser.totalBattle !== 0) {
        returnComponent = (<span>(승률 : {(collectionUser.winBattle / collectionUser.totalBattle * 100).toFixed(1)}%)</span>);
      }
      return returnComponent;
    };
    const renderLastActivity = () => {
      const now = Date.now();
      const lastLogin = collectionUser.lastLogin;
      const gap = now - lastLogin;
      let text = '방금 전';
      if (gap > 2000 && gap < 1000 * 60) {
        text = `${Math.floor(gap / 1000)}초 전`;
      } else if (gap < 1000 * 60 * 60) {
        text = `${Math.floor(gap / (1000 * 60))}분 전`;
      } else if (gap < 1000 * 60 * 60 * 24) {
        text = `${Math.floor(gap / (1000 * 60 * 60))}시간 전`;
      } else {
        text = `${Math.floor(gap / (1000 * 60 * 60 * 24))}일 전`;
      }
      return (<div>{text}</div>);
    };
    const renderIntroduce = () => {
      let text = '자기소개가 없습니다.';
      if (collectionUser.introduce !== '') {
        text = collectionUser.introduce;
      }
      return (<div>{text}</div>);
    };
    const renderFunctionBar = () => {
      if (this.props.user.email && collectionUser.email === this.props.user.email) {
        return (
          <div className="row function-section">
            <div className="col-xs-12 widget-container-col function-bar"
              style={{ zIndex: '999' }}
            >
              <div className="widget-box widget-box-function">
                <div className="widget-body">
                  <div className="widget-main">
                    <div className="row">
                      <div className="col-sm-6 hidden-xs">
                        <h5>레어등급 이상의 포켓몬을 얻고 싶다면?</h5>
                      </div>
                      <div className="col-sm-6 visible-xs-inline-block">레어 이상을 원해?
                      </div>
                      <div
                        className="col-sm-6 text-right visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"
                      >
                        <Link to="/mix-mon-ready">
                          <button className="btn btn-primary hidden-xs">
                            <i className="ace-icon fa fa-flask"></i> 교배하기
                          </button>
                          <button
                            className="btn btn-primary btn-xs visible-xs-inline-block"
                          >
                            교배하기
                          </button>
                        </Link>
                        <Link to="/evolute-mon-ready">
                          <button className="btn btn-primary hidden-xs" style={{ marginLeft: '4px' }}>
                            <i className="ace-icon fa fa-flash"></i> 진화하기
                          </button>
                          <button
                            className="btn btn-primary btn-xs visible-xs-inline-block"
                          >
                            진화하기
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    };
    const renderDesignerBadges = () => {
      const returnComponent = [];
      if (this.props.designers) {
        let status = 0;
        for (const designer of this.props.designers) {
          returnComponent.push(
            <span key={status} className="badge badge-default check-badge" id={`filter-designer-${status++}`}>
              <i className="fa fa-check"></i> <span className="designer-name">{designer}</span>
            </span>
          );
        }
      }
      return returnComponent;
    };
    const renderMonsterCardComponent = () => {
      const returnComponent = [];
      const allMons = this.props.allMons;
      let mon = null;
      if (this.state.collectionsMonNo && allMons) {
        for (const mon2 of allMons) {
          mon = Object.assign({}, mon2);
          if (this.state.collectionsMonNo.has(mon2.monNo)) {
            for (const col of collections) {
              if (col._mon.monNo === mon2.monNo) {
                mon.img = mon2.img;
                mon.imgIdx = col.imgIdx;
                mon.designer = mon2.designer;
                mon.level = col.level;
                mon.initHp = mon2.hp;
                mon.initPower = mon2.power;
                mon.initArmor = mon2.armor;
                mon.initSpecialPower = mon2.specialPower;
                mon.initSpecialArmor = mon2.specialArmor;
                mon.initDex = mon2.dex;
                mon.hp = mon2.hp + col.addedHp + col.honorHp;
                mon.power = mon2.power + col.addedPower + col.honorPower;
                mon.armor = mon2.armor + col.addedArmor + col.honorArmor;
                mon.specialPower = mon2.specialPower + col.addedSpecialPower + col.honorSpecialPower;
                mon.specialArmor = mon2.specialArmor + col.addedSpecialArmor + col.honorSpecialArmor;
                mon.dex = mon2.dex + col.addedDex + col.honorDex;
                mon.honorHp = col.honorHp;
                mon.honorPower = col.honorPower;
                mon.honorArmor = col.honorArmor;
                mon.honorSpecialPower = col.honorSpecialPower;
                mon.honorSpecialArmor = col.honorSpecialArmor;
                mon.honorDex = col.honorDex;
                mon.evolutePiece = mon2.evolutePiece;
                mon._id = col._id;
                mon.condition = col.condition;
                mon.status = col.status;
                mon.entry = col.entry;
                const filterData = { 'data-have': '보유', 'data-main-attr': mon.mainAttr, 'data-sub-attr': mon.subAttr, 'data-cost': mon.cost,
                'data-grade': mon.grade, 'data-designer': mon.designer[mon.imgIdx] };
                returnComponent.push(<MonsterCard key={mon.monNo} monster={mon} filterData={filterData}/>);
              }
            }
          } else {
            mon.img = ['nomonster.png'];
            mon.imgIdx = 0;
            mon.name = '????';
            const filterData = { 'data-have': '미보유', 'data-main-attr': mon.mainAttr, 'data-sub-attr': mon.subAttr, 'data-cost': mon.cost,
            'data-grade': mon.grade, 'data-designer': mon.designer[mon.imgIdx] };
            returnComponent.push(<MonsterCard key={mon.monNo} monster={mon} filterData={filterData}/>);
          }
        }
      }
      return returnComponent;
    };
    const renderCollectionView = () => {
      let returnComponent = null;
      if (this.props.collectionUser && this.props.monsterCountInfo) {
        returnComponent = (
          <div id="collection-view">
            <div className="page-content">
              <div className="page-header">
                <h1>{collectionUser.nickname}님의 콜렉션</h1>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-3 center">
                  <span className="profile-picture">
                    <img
                      className="editable img-responsive"
                      src={`/img/user/${collectionUser.img}`}
                    />
                  </span>
                  <div className="hr hr12 dotted"></div>
                  <div className="clearfix">
                    <div className="grid2">
                      <span className="bigger-175 blue">{collectionUser.colRank}</span>
                      위<br/> 콜렉션랭킹
                    </div>
                    <div className="grid2">
                      <span className="bigger-175 blue">{collectionUser.battleRank}</span>
                      위<br/> 시합랭킹
                    </div>
                  </div>
                  <div className="hr hr12 dotted"></div>
                </div>
                <div className="col-xs-12 col-sm-9">
                  <h4 className="blue">
                    <span className="middle">{collectionUser.nickname} </span>
                    {renderOnlineTag()}
                  </h4>
                  <div className="profile-user-info profile-user-info-striped">
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        <h5>칭호</h5>
                      </div>
                      <div className="profile-info-value">
                        {renderHonorTag()}
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        <h5>콜렉션 점수</h5>
                      </div>
                      <div className="profile-info-value">
                        <span><h5>{collectionUser.colPoint}점</h5></span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        <h5>시합 점수</h5>
                      </div>
                      <div className="profile-info-value">
                        <span><h5>{collectionUser.battlePoint}점 <i className={leagueIcons[collectionUser.league]}/> ({leagues[collectionUser.league].name} 리그)</h5></span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        <h5>시합 전적</h5>
                      </div>
                      <div className="profile-info-value">
                        <span><h5>{collectionUser.totalBattle }전 {collectionUser.winBattle }승 {collectionUser.loseBattle }패 {renderWinRate()}
                        </h5></span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        <h5>최대연승</h5>
                      </div>
                      <div className="profile-info-value">
                        <span>
                          <h5>{collectionUser.maxWinInRow }연승(현재 {collectionUser.winInRow }연승 중)</h5>
                        </span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        <h5>마지막 활동</h5>
                      </div>
                      <div className="profile-info-value">
                        <span><h5>
                          {renderLastActivity()}
                        </h5></span>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="profile-info-name">
                        <h5>자기소개</h5>
                      </div>
                      <div className="profile-info-value">
                        <span>
                          <h5>
                            {renderIntroduce()}
                          </h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: '10px' }}></div>
              <div className="row graph-container">
                <div className="col-xs-12 pricing-box">
                  <div className="widget-box widget-collection" style={{ margin: '0px' }}>
                    <div className="widget-body">
                      <div className="widget-main">
                        <div className="row">
                          <div className="col-xs-6 col-sm-2 center">
                            <h4>베이직</h4>
                            <div className="easy-pie-chart percentage"
                              data-percent={monsterCountInfo.basic !== 0 ? collectionCountInfo.basic * 100 / monsterCountInfo.basic : 0}
                              data-color="#f2bb46"
                            >
                              <span className="percent">{collectionCountInfo.basic}/{monsterCountInfo.basic}</span>
                            </div>
                          </div>
                          <div className="col-xs-6 col-sm-2 center">
                            <h4>레어</h4>
                            <div className="easy-pie-chart percentage"
                              data-percent={monsterCountInfo.rare !== 0 ? collectionCountInfo.rare * 100 / monsterCountInfo.rare : 0}
                              data-color="#8ae68a"
                            >
                              <span className="percent">{collectionCountInfo.rare}/{monsterCountInfo.rare}</span>
                            </div>
                          </div>
                          <div className="col-xs-6 col-sm-2 center">
                            <h4>스페셜</h4>
                            <div className="easy-pie-chart percentage"
                              data-percent={monsterCountInfo.special !== 0 ? collectionCountInfo.special * 100 / monsterCountInfo.special : 0}
                              data-color="#66ccff"
                            >
                              <span className="percent">{collectionCountInfo.special}/{monsterCountInfo.special}</span>
                            </div>
                          </div>
                          <div className="col-xs-6 col-sm-2 center">
                            <h4>스페셜레어</h4>
                            <div className="easy-pie-chart percentage"
                              data-percent={monsterCountInfo.sRare !== 0 ? collectionCountInfo.sRare * 100 / monsterCountInfo.sRare : 0}
                              data-color="#9999ff"
                            >
                              <span className="percent">{collectionCountInfo.sRare}/{monsterCountInfo.sRare}</span>
                            </div>
                          </div>
                          <div className="col-xs-6 col-sm-2 center">
                            <h4>엘리트</h4>
                            <div className="easy-pie-chart percentage"
                              data-percent={monsterCountInfo.elite !== 0 ? collectionCountInfo.elite * 100 / monsterCountInfo.elite : 0}
                              data-color="#ff6699"
                            >
                              <span className="percent">{collectionCountInfo.elite}/{monsterCountInfo.elite}</span>
                            </div>
                          </div>
                          <div className="col-xs-6 col-sm-2 center">
                            <h4>레전드</h4>
                            <div className="easy-pie-chart percentage"
                              data-percent={monsterCountInfo.lengend !== 0 ? collectionCountInfo.lengend * 100 / monsterCountInfo.lengend : 0}
                              data-color="#ff9966"
                            >
                              <span className="percent">{collectionCountInfo.legend}/{monsterCountInfo.legend}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ height: '30px' }}></div>
                        <div className="row">
                          <div className="col-sm-2 col-xs-12 text-center">
                            <h4>콜렉션 점수</h4>
                          </div>
                          <div className="col-sm-8 col-xs-12" style={{ paddingTop: '15px' }}>
                            <div className="progress progress-mini">
                              <div
                                className="progress-bar progress-bar-primary collection-point-bar"
                                style={{ width: `${collectionUser.colPoint * 100 / monsterCountInfo.totalPoint}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="col-sm-2 col-xs-12 text-center">
                            <h4>{collectionUser.colPoint}/{monsterCountInfo.totalPoint}</h4>
                          </div>
                        </div>
                        <div style={{ height: '20px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space"></div>
              {renderFunctionBar()}
              <div className="space"></div>
              <div className="row sort-section">
                <div className="col-xs-12">
                  <div className="tabbable">
                    <ul className="nav nav-tabs" id="myTab">
                      <li className="active hidden-xs">
                        <a data-toggle="tab"	href="#have">보유여부 </a>
                      </li>
                      <li className="active visible-xs">
                        <a data-toggle="tab" href="#have"><small>보유</small> </a>
                      </li>
                      <li className="hidden-xs">
                        <a data-toggle="tab" href="#cost">코스트별</a>
                      </li>
                      <li className="visible-xs">
                        <a data-toggle="tab" href="#cost"><small>코스트</small></a>
                      </li>
                      <li className="hidden-xs">
                        <a data-toggle="tab" href="#attr">속성별</a>
                      </li>
                      <li className="visible-xs">
                        <a data-toggle="tab" href="#attr"><small>속성</small></a>
                      </li>
                      <li className="hidden-xs">
                        <a data-toggle="tab" href="#grade">등급별</a>
                      </li>
                      <li className="visible-xs">
                        <a data-toggle="tab" href="#grade"><small>등급</small></a>
                      </li>
                      <li className="hidden-xs">
                        <a data-toggle="tab" href="#designer">디자이너별</a>
                      </li>
                      <li className="visible-xs">
                        <a data-toggle="tab" href="#designer"><small>디자이너</small></a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div id="have" className="tab-pane fade in active">
                        <span className="badge badge-info check-badge" id="filter-allHave">
                          <i className="fa fa-check"></i> 전체
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-have"
                          data-filter-value="보유"
                        ><i className="fa fa-check"></i> 보유
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-noHave"
                          data-filter-value="미보유"
                        ><i className="fa fa-check"></i> 미보유
                        </span>
                      </div>
                      <div id="cost" className="tab-pane">
                        <span className="badge badge-info check-badge" id="filter-allCost"><i
                          className="fa fa-check"
                        ></i> 전체
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-1"
                          data-filter-value="1"
                        ><i className="fa fa-check"></i> 코스트1
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-2"
                          data-filter-value="2"
                        ><i className="fa fa-check"></i> 코스트2
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-3"
                          data-filter-value="3"
                        ><i className="fa fa-check"></i> 코스트3
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-4"
                          data-filter-value="4"
                        ><i className="fa fa-check"></i> 코스트4
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-5"
                          data-filter-value="5"
                        ><i className="fa fa-check"></i> 코스트5
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-6"
                          data-filter-value="6"
                        ><i className="fa fa-check"></i> 코스트6
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-7"
                          data-filter-value="7"
                        ><i className="fa fa-check"></i> 코스트7
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-cost-8"
                          data-filter-value="8"
                        ><i className="fa fa-check"></i> 코스트8
                        </span>
                      </div>
                      <div id="attr" className="tab-pane">
                        <span className="badge badge-info check-badge" id="filter-allAttr">
                          <i className="fa fa-check"></i> 전체
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-normal"
                        >
                          <i className="fa fa-check"></i> 노말
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-fire"
                        >
                          <i className="fa fa-check"></i> 불꽃
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-water"
                        >
                          <i className="fa fa-check"></i> 물
                        </span>
                        <span
                          className="badge badge-default check-badge"
                          id="filter-attr-electronic"
                        ><i className="fa fa-check"></i>전기
                        </span>
                        <span className="badge badge-default check-badge"
                          id="filter-attr-plant"
                        ><i className="fa fa-check"></i> 풀
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-ice"
                        ><i className="fa fa-check"></i> 얼음
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-fly"
                        ><i className="fa fa-check"></i> 비행
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-fairy"
                        ><i className="fa fa-check"></i> 요정
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-earth"
                        ><i className="fa fa-check"></i> 땅
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-venom"
                        ><i className="fa fa-check"></i> 독
                        </span>
                        <span
                          className="badge badge-default check-badge"
                          id="filter-attr-fighter"
                        ><i className="fa fa-check"></i> 격투
                        </span>
                        <span className="badge badge-default check-badge"
                          id="filter-attr-esper"
                        ><i className="fa fa-check"></i> 염력
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-bug"
                        ><i className="fa fa-check"></i> 벌레
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-rock"
                        ><i className="fa fa-check"></i> 바위
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-ghost"
                        ><i className="fa fa-check"></i> 유령
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-dragon"
                        ><i className="fa fa-check"></i> 용
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-evil"
                        ><i className="fa fa-check"></i> 악
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-attr-iron"
                        ><i className="fa fa-check"></i> 강철
                        </span>
                      </div>
                      <div id="grade" className="tab-pane">
                        <span className="badge badge-info check-badge" id="filter-allGrade">
                          <i className="fa fa-check"></i> 전체
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-grade-b"
                        ><i className="fa fa-check"></i> 베이직
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-grade-r"
                        ><i className="fa fa-check"></i> 레어
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-grade-a"
                        ><i className="fa fa-check"></i> 스페셜
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-grade-ar"
                        ><i className="fa fa-check"></i> 스페셜레어
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-grade-e"
                        ><i className="fa fa-check"></i> 엘리트
                        </span>
                        <span
                          className="badge badge-default check-badge" id="filter-grade-l"
                        ><i className="fa fa-check"></i> 레전드
                        </span>
                      </div>
                      <div id="designer" className="tab-pane">
                        <span className="badge badge-info check-badge"
                          id="filter-allDesigner"
                        ><i className="fa fa-check"></i> 전체
                        </span>
                        {renderDesignerBadges()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row collection-container">
                {renderMonsterCardComponent()}
              </div>
            </div>
          </div>
        );
      } else {
        returnComponent = (
          <div></div>
        );
      }
      return returnComponent;
    };
    return renderCollectionView();
  }
}

CollectionView.need = [
  (params) => { return Actions.fetchCollectionUser.bind(null, params.collectionUserId)(); },
  () => { return Actions.fetchMonsterCountInfo(); },
  () => { return Actions.fetchAllMons(); },
  () => { return Actions.fetchDesigners(); },
];

CollectionView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  collectionUser: store.collectionUser,
  monsterCountInfo: store.monsterCountInfo,
  user: store.user,
  allMons: store.allMons,
  designers: store.designers,
});

CollectionView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  collectionUser: PropTypes.object,
  params: PropTypes.object,
  monsterCountInfo: PropTypes.object,
  user: PropTypes.object,
  allMons: PropTypes.array,
  designers: PropTypes.array,
};

export default connect(mapStateToProps)(CollectionView);
