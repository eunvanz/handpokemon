import React, { PropTypes } from 'react';
import CustomModal from './CustomModal';
import $ from 'jquery';
import _ from 'lodash';
import { Link } from 'react-router';

class MonsterModal extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterModal';
    this.state = {
      showModal: false,
    };
    this._flip = this._flip.bind(this);
    this._handleImgChange = this._handleImgChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }
  _flip() {
    $('.modal .front').toggle();
    $('.modal .back').toggle();
  }
  _handleImgChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // TODO: 이미지 타입 업데이트 하는 코드 들어가야 함
  }
  render() {
    const renderSelectImgComponent = () => {
      const imgArr = this.props.monster.img;
      const returnComponent = [];
      let idx = 0;
      if (imgArr.length > 1) {
        const itemListComponent = imgArr.map((img) => <option key={idx} value={img}>타입 {idx++}</option>);
        return (
          returnComponent.push(<select key="selectImg" style={{ maxWidth: '200px' }} onChange={this._handleImgChange}>{itemListComponent()}</select>)
        );
      }
    };
    const renderLevelComponent = () => {
      const level = this.props.monster.level;
      const evolutePiece = this.props.monster.evolutePiece;
      const returnComponent = [];
      if (level) {
        returnComponent.push(<p key="level"><span className="label label-info arrowed-in-right">{`LV. ${level}`}</span></p>);
      }
      if (evolutePiece) {
        returnComponent.push(<p key="evolutePiece"><span className="label label-default arrowed-in-right">{`LV. ${evolutePiece}`}</span> 에 진화</p>);
        if (evolutePiece && level >= evolutePiece) {
          returnComponent.push(
            <Link to={`/evolution/${this.props.monster._id}`}>
              <button className="btn btn-primary btn-minier ev-btn" id="ev-btn">
                <i className="ace-icon fa fa-flash"></i> 진화하기
              </button>
            </Link>
          );
        }
      }
      return returnComponent;
    };
    const renderGradeComponent = () => {
      const grade = this.props.monster.grade;
      let gradeLabel = null;
      if (grade === 'b') {
        gradeLabel = <span key="gradeLabel" className="label label-sm label-yellow arrowed-right" style={{ marginRight: '1px' }}>BASIC</span>;
      } else if (grade === 'a') {
        gradeLabel = <span key="gradeLabel" className="label label-sm label-adv arrowed-right" style={{ marginRight: '1px' }}>SPECIAL</span>;
      } else if (grade === 'r') {
        gradeLabel = <span key="gradeLabel" className="label label-sm label-rare arrowed-right" style={{ marginRight: '1px' }}>RARE</span>;
      } else if (grade === 'ar') {
        gradeLabel = <span key="gradeLabel" className="label label-sm label-advr arrowed-right" style={{ marginRight: '1px' }}>S.RARE</span>;
      } else if (grade === 'e') {
        gradeLabel = <span key="gradeLabel" className="label label-sm label-elite arrowed-right" style={{ marginRight: '1px' }}>ELITE</span>;
      } else if (grade === 'l') {
        gradeLabel = <span key="gradeLabel" className="label label-sm label-limited arrowed-right" style={{ marginRight: '1px' }}>LEGEND</span>;
      }
      return gradeLabel;
    };
    const renderAttrComponent = () => {
      const mainAttr = this.props.monster.mainAttr;
      const subAttr = this.props.monster.subAttr;
      let mainAttrLabel = null;
      let subAttrLabel = null;
      const resultComponent = [];
      const endLabel = 'arrowed-in';
      const continueLabel = 'arrowed-in arrowed-right';
      if (mainAttr === '노말') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-grey ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '불꽃') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-danger ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '물') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-primary ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '전기') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-warning ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '풀') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-success ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '얼음') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-info ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '비행') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-light ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '요정') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-pink ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '땅') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-inverse ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '독') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-purple ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '격투') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-fighter ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '염력') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-esper ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '벌레') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-bug ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '바위') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-rock ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '유령') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-ghost ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '용') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-dragon ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '악') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-evil ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '강철') {
        mainAttrLabel = <span key="mainAttr" className={`label label-sm label-iron ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      }
      if (subAttr === '노말') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-grey arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '불꽃') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-danger arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '물') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-primary arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '전기') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-warning arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '풀') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-success arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '얼음') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-info arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '비행') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-light arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '요정') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-pink arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '땅') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-inverse arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '독') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-purple arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '격투') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-fighter arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '염력') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-esper arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '벌레') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-bug arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '바위') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-rock arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '유령') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-ghost arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '용') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-dragon arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '악') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-evil arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '강철') {
        subAttrLabel = <span key="subAttr" className="label label-sm label-iron arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      }
      resultComponent.push(mainAttrLabel, subAttrLabel);
      return resultComponent;
    };
    const renderCostComponent = () => {
      const resultComponent = [];
      const cost = this.props.monster.cost;
      let fullStar = null;
      let emptyStar = null;
      let key = 0;
      for (let i = 0; i < 5; i++) {
        if (cost <= 5) {
          fullStar = <i key={key++} className="fa fa-star fa-2"></i>;
          emptyStar = <i key={key++} className="fa fa-star-o fa-2"></i>;
        } else {
          fullStar = <i key={key++} className="fa fa-star fa-2 text-gold"></i>;
          emptyStar = <i key={key++} className="fa fa-star fa-2"></i>;
        }
        if (cost === 5) {
          resultComponent.push(fullStar);
        } else if (i < cost % 5) {
          resultComponent.push(fullStar);
        } else {
          resultComponent.push(emptyStar);
        }
      }
      return resultComponent;
    };
    const renderImgComponent = () => {
      const returnComponent = [];
      returnComponent.push(
          <p key="img">
            <img className="monster-image picks"
              src={`/img/monsters/${this.props.monster.img }`}
              width="100%"
              style={{ maxWidth: '150px' }}
            />
          </p>
        );
      returnComponent.push(<p key="selectImgComponent">{renderSelectImgComponent()}</p>);
      returnComponent.push(renderLevelComponent());
      return returnComponent;
    };
    const renderStatBarComponent = (honorStat, initStat, stat) => {
      const returnComponent = [];
      let honorStatPct = 0;
      let statPct = 0;
      let addStatPct = 0;
      honorStatPct = _.toString(honorStat / 200 * 100);
      returnComponent.push(
        <div
          key="1"
          className="progress-bar progress-bar-success monster-skill1-bar"
          style={{ width: `${honorStatPct}%` }}
        >
        </div>
        );
      if (honorStat + stat > 200) {
        statPct = _.toString(initStat / 200 * 100);
        addStatPct = _.toString(200 - honorStat - initStat);
        returnComponent.push(
          <div
            key="2"
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: `${statPct}%` }}
          >
          </div>
          );
        returnComponent.push(
          <div
            key="3"
            className="progress-bar progress-bar-primary monster-skill1-bar"
            style={{ width: `${addStatPct}%` }}
          >
          </div>
          );
      } else if (stat - initStat > 0) {
        statPct = _.toString(initStat / 200 * 100);
        addStatPct = _.toString((stat - initStat) / 200 * 100);
        returnComponent.push(
          <div
            key="4"
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: `${statPct}%` }}
          >
          </div>
          );
        returnComponent.push(
          <div
            key="5"
            className="progress-bar progress-bar-primary monster-skill1-bar"
            style={{ width: `${addStatPct}%` }}
          >
          </div>
          );
      } else if (stat - initStat < 0) {
        statPct = _.toString(stat / 200 * 100);
        addStatPct = _.toString((stat - initStat) / 200 * 100);
        returnComponent.push(
          <div
            key="6"
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: `${statPct}%` }}
          >
          </div>
          );
        returnComponent.push(
          <div
            key="7"
            className="progress-bar progress-bar-danger monster-skill1-bar"
            style={{ width: `${addStatPct}%` }}
          >
          </div>
          );
      } else {
        statPct = _.toString(stat / 200 * 100);
        returnComponent.push(
          <div
            key="8"
            className="progress-bar progress-bar-warning monster-skill1-bar"
            style={{ width: `${statPct}%` }}
          >
          </div>
          );
      }
      return returnComponent;
    };
    const renderStatBadgeComponent = (honorStat, initStat, stat) => {
      const returnComponent = [];
      if (honorStat > 0) {
        returnComponent.push(<span key="1" className="badge badge-success">+{honorStat}</span>);
      }
      if (stat - initStat > 0) {
        returnComponent.push(<span key="2" className="badge badge-primary">+{stat - initStat}</span>);
      } else if (stat - initStat < 0) {
        returnComponent.push(<span key="3" className="badge badge-danger">{stat - initStat}</span>);
      }
      return returnComponent;
    };
    const renderGetDateComponent = () => {
      if (this.props.monster.getDate) {
        return (
          <small>
          (<span className="text-info">{this.props.monster.getDate}</span> 발견)
          </small>
        );
      }
    };
    const renderStatComponent = () => {
      const returnComponent = [];

      const honorHp = Number(this.props.monster.honorHp);
      const initHp = Number(this.props.monster.initHp);
      const hp = Number(this.props.monster.hp);

      const honorPower = Number(this.props.monster.honorPower);
      const initPower = Number(this.props.monster.initPower);
      const power = Number(this.props.monster.power);

      const honorArmor = Number(this.props.monster.honorArmor);
      const initArmor = Number(this.props.monster.initArmor);
      const armor = Number(this.props.monster.armor);

      const honorSpecialPower = Number(this.props.monster.honorSpecialPower);
      const initSpecialPower = Number(this.props.monster.initSpecialPower);
      const specialPower = Number(this.props.monster.specialPower);

      const honorSpecialArmor = Number(this.props.monster.honorSpecialArmor);
      const initSpecialArmor = Number(this.props.monster.initSpecialArmor);
      const specialArmor = Number(this.props.monster.specialArmor);

      const honorDex = Number(this.props.monster.honorDex);
      const initDex = Number(this.props.monster.initDex);
      const dex = Number(this.props.monster.dex);

      let key = 0;
      returnComponent.push(
          <div key={key++}>
            <div className="row">
              <div className="col-xs-2 thin-padding">
                <p>
                  <big className="text-primary"><b>체력</b></big>
                </p>
              </div>
              <div className="col-xs-5 thin-padding">
                <div className="progress progress-striped active">
                  {renderStatBarComponent(honorHp, initHp, hp)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {isNaN(honorHp) ? hp : hp + honorHp}
                {renderStatBadgeComponent(honorHp, initHp, hp)}
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
                  {renderStatBarComponent(honorPower, initPower, power)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {isNaN(honorPower) ? power : power + honorPower}
                {renderStatBadgeComponent(honorPower, initPower, power)}
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
                  {renderStatBarComponent(honorArmor, initArmor, armor)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {isNaN(honorArmor) ? armor : armor + honorArmor}
                {renderStatBadgeComponent(honorArmor, initArmor, armor)}
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
                  {renderStatBarComponent(honorSpecialPower, initSpecialPower, specialPower)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {isNaN(honorSpecialPower) ? specialPower : specialPower + honorSpecialPower}
                {renderStatBadgeComponent(honorSpecialPower, initSpecialPower, specialPower)}
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
                  {renderStatBarComponent(honorSpecialArmor, initSpecialArmor, specialArmor)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {isNaN(honorSpecialArmor) ? specialArmor : specialArmor + honorSpecialArmor}
                {renderStatBadgeComponent(honorSpecialArmor, initSpecialArmor, specialArmor)}
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
                  {renderStatBarComponent(honorDex, initDex, dex)}
                </div>
              </div>
              <div className="col-xs-5 monster-hp thin-padding">
                {isNaN(honorDex) ? dex : dex + honorDex}
                {renderStatBadgeComponent(honorDex, initDex, dex)}
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
                  {hp + power + armor + dex + specialPower + specialArmor +
                    (isNaN(honorHp) ? 0 : honorHp) +
                    (isNaN(honorPower) ? 0 : honorPower) +
                    (isNaN(honorArmor) ? 0 : honorArmor) +
                    (isNaN(honorDex) ? 0 : honorDex) +
                    (isNaN(honorSpecialPower) ? 0 : honorSpecialPower) +
                    (isNaN(honorSpecialArmor) ? 0 : honorSpecialArmor)}
                </span>
              </div>
            </div>
          </div>
        );
      return returnComponent;
    };
    const renderBodyComponent = () => {
      return (
        <div>
          <div className="modal-body front">
            <div className="row">
              <div className="col-sm-4 col-xs-12 align-center">
                {renderImgComponent()}
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
                      {renderGetDateComponent()}
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
                      {renderGradeComponent()}
                      (<span className="badge badge-warning">+{this.props.monster.point}</span> 콜렉션 점수)
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
                      {renderAttrComponent()}
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
                      {renderCostComponent()}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <p className="monster-description">{this.props.monster.desc}
                      (designed by <span className="badge badge-grey" id={`designer-mon-${this.props.monster.monNo}`}>{this.props.monster.designer}</span>)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body back">
            <div className="row">
              <div className="col-sm-4 col-xs-12 align-center">
                {renderImgComponent()}
              </div>
              <div className="col-sm-8 col-xs-12 align-left">
                {renderStatComponent()}
              </div>
            </div>
          </div>
        </div>
      );
    };
    const renderFooterComponent = () => {
      return (
        <div>
          <button className="btn btn-default flip-btn" onClick={this.props.close}>
            닫기
          </button>
          <button className="btn btn-primary flip-btn" onClick={this._flip}>
            <i className="fa fa-refresh"></i> 뒤집기
          </button>
        </div>
      );
    };
    return (
      <div>
        <CustomModal show={this.state.showModal}
          title="포켓몬 정보"
          bodyComponent={renderBodyComponent()}
          footerComponent={renderFooterComponent()}
          close={this.props.close}
          width="500px"
          backdrop
        />
      </div>
    );
  }
}

MonsterModal.propTypes = {
  monster: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

export default MonsterModal;
