import React from 'react';
import CustomModal from './CustomModal';
import $ from 'jquery';
import _ from 'lodash';

class MonsterModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterModal';
    this.state = {
      showModal: false,
    };
    this._flip = this._flip.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  _flip() {
    $('.modal .front').toggle();
    $('.modal .back').toggle();
  }
  render() {
    const getSelectImgComponent = () => {
      const imgArr = this.props.monster.img;
      let returnComponent = [];
      let idx = 0;
      if (imgArr.length > 1) {
        let itemListComponent = imgArr.map( img => <option value={idx}>타입 {idx}</option>);
        return (
          returnComponent.push(<select style={{ maxWidth: '200px'}} onChange={_changeImg}>{itemListComponent()}</select>)
        );
      }
    };
    const getLevelComponent = () => {
      const level = this.props.monster.level;
      const piece = this.props.monster.piece;
      const requiredPiece = this.props.monster.requiredLevel;
      let returnComponent = [];
      if (piece !== null) {
        returnComponent.push(<p><span className="badge badge-success">{piece} 개의 조각 보유</span></p>);
      }
      if (level !== null) {
        returnComponent.push(<p><span className="label label-info arrowed-in-right">{level}</span></p>);
      }
      if (requiredLevel !== null) {
        returnComponent.push(<p><span className="label label-default arrowed-in-right">{requiredLevel}</span> 에 진화</p>);
      }
      return returnComponent;
    };
    const getGradeComponent = () => {
      const grade = this.props.monster.grade;
      let gradeLabel = null;
      if (grade === 'b') {
        gradeLabel = <span className="label label-sm label-yellow arrowed-right" style={{ marginRight: '1px' }}>BASIC</span>;
      } else if (grade === 'a') {
        gradeLabel = <span className="label label-sm label-adv arrowed-right" style={{ marginRight: '1px' }}>ADVANCED</span>;
      } else if (grade === 'r') {
        gradeLabel = <span className="label label-sm label-rare arrowed-right" style={{ marginRight: '1px' }}>RARE</span>;
      } else if (grade === 'ar') {
        gradeLabel = <span className="label label-sm label-advr arrowed-right" style={{ marginRight: '1px' }}>A.RARE</span>;
      } else if (grade === 'e') {
        gradeLabel = <span className="label label-sm label-elite arrowed-right" style={{ marginRight: '1px' }}>ELITE</span>;
      } else if (grade === 'l') {
        gradeLabel = <span className="label label-sm label-limited arrowed-right" style={{ marginRight: '1px' }}>LEGEND</span>;
      }
      return gradeLabel;
    };
    const getAttrComponent = () => {
      const mainAttr = this.props.monster.mainAttr;
      const subAttr = this.props.monster.subAttr;
      let mainAttrLabel = null;
      let subAttrLabel = null;
      let resultComponent = [];
      if (mainAttr === '노말') {
        mainAttrLabel = <span className="label label-sm label-grey arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '불꽃') {
        mainAttrLabel = <span className="label label-sm label-danger arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '물') {
        mainAttrLabel = <span className="label label-sm label-primary arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '전기') {
        mainAttrLabel = <span className="label label-sm label-warning arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '풀') {
        mainAttrLabel = <span className="label label-sm label-success arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '얼음') {
        mainAttrLabel = <span className="label label-sm label-info arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '비행') {
        mainAttrLabel = <span className="label label-sm label-light arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '요정') {
        mainAttrLabel = <span className="label label-sm label-pink arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '땅') {
        mainAttrLabel = <span className="label label-sm label-inverse arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '독') {
        mainAttrLabel = <span className="label label-sm label-purple arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '격투') {
        mainAttrLabel = <span className="label label-sm label-fighter arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '염력') {
        mainAttrLabel = <span className="label label-sm label-esper arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '벌레') {
        mainAttrLabel = <span className="label label-sm label-bug arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '바위') {
        mainAttrLabel = <span className="label label-sm label-rock arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '유령') {
        mainAttrLabel = <span className="label label-sm label-ghost arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '용') {
        mainAttrLabel = <span className="label label-sm label-dragon arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '악') {
        mainAttrLabel = <span className="label label-sm label-evil arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      } else if (mainAttr === '강철') {
        mainAttrLabel = <span className="label label-sm label-iron arrowed-in arrowed-right" style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>;
      }
      if (subAttr === '노말') {
        subAttrLabel = <span className="label label-sm label-grey arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '불꽃') {
        subAttrLabel = <span className="label label-sm label-danger arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '물') {
        subAttrLabel = <span className="label label-sm label-primary arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '전기') {
        subAttrLabel = <span className="label label-sm label-warning arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '풀') {
        subAttrLabel = <span className="label label-sm label-success arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '얼음') {
        subAttrLabel = <span className="label label-sm label-info arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '비행') {
        subAttrLabel = <span className="label label-sm label-light arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '요정') {
        subAttrLabel = <span className="label label-sm label-pink arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '땅') {
        subAttrLabel = <span className="label label-sm label-inverse arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '독') {
        subAttrLabel = <span className="label label-sm label-purple arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '격투') {
        subAttrLabel = <span className="label label-sm label-fighter arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '염력') {
        subAttrLabel = <span className="label label-sm label-esper arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '벌레') {
        subAttrLabel = <span className="label label-sm label-bug arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '바위') {
        subAttrLabel = <span className="label label-sm label-rock arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '유령') {
        subAttrLabel = <span className="label label-sm label-ghost arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '용') {
        subAttrLabel = <span className="label label-sm label-dragon arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '악') {
        subAttrLabel = <span className="label label-sm label-evil arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '강철') {
        subAttrLabel = <span className="label label-sm label-iron arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      }
      resultComponent.push(mainAttr, subAttr);
      return resultComponent;
    };
    const getCostComponent = () => {
      let resultComponent = [];
      const cost = this.props.monster.cost;
      let fullStar = null;
      let emptyStar = null;
      if (cost <= 5) {
        fullStar = <i className="fa fa-star fa-2"></i>;
        emptyStar = <i className="fa fa-star-o fa-2"></i>;
      } else {
        fullStar = <i className="fa fa-star fa-2 text-gold"></i>;
        emptyStar = <i className="fa fa-star fa-2"></i>;
      }
      for (let i = 0; i < 5; i++) {
        if (i < cost % 5) {
          resultComponent.push(fullStar);
        } else {
          resultComponent.push(emptyStar);
        }
      }
      return resultComponent;
    };
    const getImgComponent = () => {
      let returnComponent = [];
      returnComponent.push(
          <p>
            <img className="monster-image picks"
              src={`/img/monsters/${this.props.monster.img }`}
              width="100%"
              style={{ maxWidth: '150px' }}
            />
          </p>
        );
      returnComponent.concat(<p>{getSelectImgComponent()}</p>);
      returnComponent.concat(getLevelComponent());
      return returnComponent;
    };
    const getStatBarComponent = (honorStat, initStat, stat) => {
      let returnComponent = [];
      let honorStatPct = 0;
      let statPct = 0;
      let addStatPct = 0;
      honorStatPct = _.toString(honorStat / 200 * 100);
      returnComponent.push(
        <div
          className="progress-bar progress-bar-success monster-skill1-bar"
          style={{ width: honorStatPct + '%' }}
        >
        </div>
        );
      if (honorStat + stat > 200) {
        statPct = _.toString(initStat / 200 * 100);
        addStatPct = _.toString(200 - honorStat - initStat);
        returnComponent.push(
          <div
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: statPct + '%' }}
          >
          </div>
          );
        returnComponent.push(
          <div
            className="progress-bar progress-bar-primary monster-skill1-bar"
            style={{ width: addStatPct + '%' }}
          >
          </div>
          );
      } else if (stat - initStat > 0) {
        statPct = _.toString(initStat / 200 * 100);
        addStatPct = _.toString((stat - initStat) / 200 * 100);
        returnComponent.push(
          <div
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: statPct + '%' }}
          >
          </div>
          );
        returnComponent.push(
          <div
            className="progress-bar progress-bar-primary monster-skill1-bar"
            style={{ width: addStatPct + '%' }}
          >
          </div>
          );
      } else if (stat - initStat < 0) {
        statPct = _.toString(stat / 200 * 100);
        addStatPct = _.toString((stat - initStat) / 200 * 100);
        returnComponent.push(
          <div
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: statPct + '%' }}
          >
          </div>
          );
        returnComponent.push(
          <div
            className="progress-bar progress-bar-danger monster-skill1-bar"
            style={{ width: addStatPct + '%' }}
          >
          </div>
          );
      } else {
        statPct = _.toString(stat / 200 * 100);
        returnComponent.push(
          <div
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: statPct + '%' }}
          >
          </div>
          );
      }
      return returnComponent;
    };
    const getStatBadgeComponent = (honorStat, initStat, stat) => {
      let returnComponent = [];
      if (honorStat > 0) {
        returnComponent.push(<span className="badge badge-success">+{honorStat}</span>);
      }
      if (stat - initStat > 0) {
        returnComponent.push(<span className="badge badge-primary">+{stat - initStat}</span>);
      } else if (stat - initStat < 0) {
        returnComponent.push(<span className="badge badge-danger">{stat - initStat}</span>);
      }
      return returnComponent;
    };
    const getStatComponent = () => {
      let returnComponent = [];

      const honorHp = this.props.monster.honorHp;
      const initHp = this.props.monster.initHp;
      const hp = this.props.monster.hp;

      const honorPower = this.props.monster.honorPower;
      const initPower = this.props.monster.initPower;
      const power = this.props.monster.power;

      const honorArmor = this.props.monster.honorArmor;
      const initArmor = this.props.monster.initArmor;
      const armor = this.props.monster.armor;

      const honorSpecialPower = this.props.monster.honorSpecialPower;
      const initSpecialPower = this.props.monster.initSpecialPower;
      const specialPower = this.props.monster.specialPower;

      const honorSpecialArmor = this.props.monster.honorSpecialArmor;
      const initSpecialArmor = this.props.monster.initSpecialArmor;
      const specialArmor = this.props.monster.specialArmor;

      const honorDex = this.props.monster.honorDex;
      const initDex = this.props.monster.initDex;
      const dex = this.props.monster.dex;

      returnComponent.push(
          <div>
            <div className="row">
              <div className="col-xs-2 thin-padding">
                <p>
                  <big className="text-primary"><b>체력</b></big>
                </p>
              </div>
              <div className="col-xs-5 thin-padding">
                <div className="progress progress-striped active">
                  {getStatBarComponent(honorHp, initHp, hp)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {hp + honorHp}
                {getStatBadgeComponent(honorHp, initHp, hp)}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding">
                <p>
                  <big className="text-primary"><b>공격</b></big>
                </p>
              </div>
              <div className="col-xs-5 thin-padding">
                <div className="progress progress-striped active">
                  {getStatBarComponent(honorPower, initPower, power)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {power + honorPower}
                {getStatBadgeComponent(honorPower, initPower, power)}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding">
                <p>
                  <big className="text-primary"><b>방어</b></big>
                </p>
              </div>
              <div className="col-xs-5 thin-padding">
                <div className="progress progress-striped active">
                  {getStatBarComponent(honorArmor, initArmor, armor)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {armor + honorArmor}
                {getStatBadgeComponent(honorArmor, initArmor, armor)}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding">
                <p>
                  <big className="text-primary"><b>특공</b></big>
                </p>
              </div>
              <div className="col-xs-5 thin-padding">
                <div className="progress progress-striped active">
                  {getStatBarComponent(honorSpecialPower, initSpecialPower, specialPower)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {specialPower + honorSpecialPower}
                {getStatBadgeComponent(honorSpecialPower, initSpecialPower, specialPower)}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding">
                <p>
                  <big className="text-primary"><b>특방</b></big>
                </p>
              </div>
              <div className="col-xs-5 thin-padding">
                <div className="progress progress-striped active">
                  {getStatBarComponent(honorSpecialArmor, initSpecialArmor, specialArmor)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {specialArmor + honorSpecialArmor}
                {getStatBadgeComponent(honorSpecialArmor, initSpecialArmor, specialArmor)}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding">
                <p>
                  <big className="text-primary"><b>민첩</b></big>
                </p>
              </div>
              <div className="col-xs-5 thin-padding">
                <div className="progress progress-striped active">
                  {getStatBarComponent(honorDex, initDex, dex)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {dex + honorDex}
                {getStatBadgeComponent(honorDex, initDex, dex)}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-3 thin-padding">
                <p>
                  <big className="text-primary"><b>기술명</b></big>
                </p>
              </div>
              <div className="col-xs-9 monster-skills thin-padding">
                <span className="badge badge-warning">{this.props.monster.skillName}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-3 thin-padding">
                <p>
                  <big className="text-primary"><b>전투력</b></big>
                </p>
              </div>
              <div className="col-xs-9 monster-skills thin-padding">
                <span className="badge badge-inverse">
                  {hp + power + armor + dex + specialPower + specialArmor + honorHp + honorPower + honorArmor + honorDex + honorSpecialPower + honorSpecialArmor}
                </span>
              </div>
            </div>
          </div>
        );
      return returnComponent;
    };
    const getBodyComponent = () => {
      return (
        <div>
          <div className="modal-body front">
            <div className="row">
              <div className="col-sm-4 col-xs-12 align-center">
                {getImgComponent()}
              </div>
              <div className="col-sm-8 col-xs-12 align-left">
                <div className="row">
                  <div className="col-xs-3">
                    <p>
                      <big className="text-primary"><b>이름</b></big>
                    </p>
                  </div>
                  <div className="col-xs-9">
                    <p className="monster-name">
                      <big>{this.props.monster.name}</big>
                      <small>
                        (<span className="text-info">{this.props.monster.getDate }</span> 발견)
                      </small>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-3">
                    <p>
                      <big className="text-primary"><b>등급</b></big>
                    </p>
                  </div>
                  <div className="col-xs-9">
                    <p className="monster-grade">
                      {getGradeComponent()}
                      (<span className="badge badge-warning">+{this.props.monster.colPoint}</span> 콜렉션 점수)
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-3">
                    <p>
                      <big className="text-primary"><b>속성</b></big>
                    </p>
                  </div>
                  <div className="col-xs-9">
                    <p className="monster-attribute">
                      {getAttrComponent()}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-3">
                    <p>
                      <big className="text-primary"><b>코스트</b></big>
                    </p>
                  </div>
                  <div className="col-xs-9">
                    <p className="monster-cost">
                      {getCostComponent()}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <p className="monster-description">{this.props.monster.desc}
                      (designed by <span className="badge badge-grey" id="designer-mon-${m.monId }">{this.props.monster.designer}</span>)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body back">
            <div className="row">
              <div className="col-sm-4 col-xs-12 align-center">
                {getImgComponent()}
              </div>
              <div className="col-sm-8 col-xs-12 align-left">
                {getStatComponent()}
              </div>
            </div>
          </div>
        </div>
      );
    };
    const getFooterComponent = () => {
      return (
        <button className="btn btn-primary flip-btn" onClick={this._flip}>
          <i className="fa fa-refresh"></i> 뒤집기
        </button>
      );
    };
    return (
      <div>
        <CustomModal show={this.state.showModal}
          title="포켓몬 정보"
          bodyComponent={getBodyComponent()}
          footerComponent={getFooterComponent()}
          close={this.props.close}
        />
      </div>
    );
  }
}

export default MonsterModal;
