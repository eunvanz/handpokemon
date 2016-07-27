import React from 'react';
import _ from 'lodash';

const show = {
  display: 'block',
};

const hide = {
  display: 'none',
};

class MonsterInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterInfoView';
  }
  render() {
    const mon = this.props.mon;
    const monInfo = this.props.mon._mon;
    const renderGradeTag = () => {
      const returnComponent = [];
      if (monInfo.grade === 'b') {
        returnComponent.push(
          <span key="1"
            className="label label-sm label-yellow arrowed-right"
            style={{ marginRight: '1px' }}
          >BASIC</span>
        );
      } else if (monInfo.grade === 'r') {
        returnComponent.push(
          <span key="1"
            className="label label-sm label-rare arrowed-right"
            style={{ marginRight: '1px' }}
          >RARE</span>
        );
      } else if (monInfo.grade === 'a') {
        returnComponent.push(
          <span key="1"
            className="label label-sm label-adv arrowed-right"
            style={{ marginRight: '1px' }}
          >SPECIAL</span>
        );
      } else if (monInfo.grade === 'ar') {
        returnComponent.push(
          <span key="1"
            className="label label-sm label-advr arrowed-right"
            style={{ marginRight: '1px' }}
          >S.RARE</span>
        );
      } else if (monInfo.grade === 'e') {
        returnComponent.push(
          <span key="1"
            className="label label-sm label-elite arrowed-right"
            style={{ marginRight: '1px' }}
          >ELITE</span>
        );
      } else if (monInfo.grade === 'l') {
        returnComponent.push(
          <span key="1"
            className="label label-sm label-limited arrowed-right"
            style={{ marginRight: '1px' }}
          >LEGEND</span>
        );
      }
      return returnComponent;
    };
    const renderAttrTag = () => {
      const mainAttr = monInfo.mainAttr;
      const subAttr = monInfo.subAttr;
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
      const cost = monInfo.cost;
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
    const renderStatBarComponent = (honorStat, initStat, stat, name) => {
      const returnComponent = [];
      let honorStatPct = 0;
      let statPct = 0;
      let addStatPct = 0;
      let upStatPct = 0;
      let upStat = 0;
      if (this.props.addedAbility) {
        if (name === 'hp') {
          upStat = this.props.addedAbility.addedHp;
        } else if (name === 'power') {
          upStat = this.props.addedAbility.addedPower;
        } else if (name === 'armor') {
          upStat = this.props.addedAbility.addedArmor;
        } else if (name === 'specialPower') {
          upStat = this.props.addedAbility.addedSpecialPower;
        } else if (name === 'specialArmor') {
          upStat = this.props.addedAbility.addedSpecialArmor;
        } else if (name === 'dex') {
          upStat = this.props.addedAbility.addedDex;
        }
      }
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
        upStatPct = _.toString(upStat / 200 * 100);
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
        returnComponent.push(
          <div
            key="9"
            className="progress-bar progress-bar-info monster-skill1-bar"
            style={{ width: `${upStatPct}%` }}
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
    const renderStatBadgeComponent = (honorStat, initStat, stat, name) => {
      let upStat = 0;
      if (this.props.addedAbility) {
        if (name === 'hp') {
          upStat = this.props.addedAbility.addedHp;
        } else if (name === 'power') {
          upStat = this.props.addedAbility.addedPower;
        } else if (name === 'armor') {
          upStat = this.props.addedAbility.addedArmor;
        } else if (name === 'specialPower') {
          upStat = this.props.addedAbility.addedSpecialPower;
        } else if (name === 'specialArmor') {
          upStat = this.props.addedAbility.addedSpecialArmor;
        } else if (name === 'dex') {
          upStat = this.props.addedAbility.addedDex;
        }
      }
      const returnComponent = [];
      if (honorStat > 0) {
        returnComponent.push(<span key="1" className="badge badge-success">+{honorStat}</span>);
      }
      if (stat - initStat > 0) {
        returnComponent.push(<span key="2" className="badge badge-primary">+{stat - initStat}</span>);
      } else if (stat - initStat < 0) {
        returnComponent.push(<span key="3" className="badge badge-danger">{stat - initStat}</span>);
      }
      if (upStat > 0) returnComponent.push(<strong key="4" className="text-info">+{upStat}</strong>);
      return returnComponent;
    };
    const renderStatComponent = () => {
      const returnComponent = [];

      const honorHp = Number(mon.honorHp);
      const initHp = Number(monInfo.hp);
      const hp = honorHp + initHp + mon.addedHp - (this.props.addedAbility ? this.props.addedAbility.addedHp : 0);

      const honorPower = Number(mon.honorPower);
      const initPower = Number(monInfo.power);
      const power = honorPower + initPower + mon.addedPower - (this.props.addedAbility ? this.props.addedAbility.addedPower : 0);

      const honorArmor = Number(mon.honorArmor);
      const initArmor = Number(monInfo.armor);
      const armor = honorArmor + initArmor + mon.addedArmor - (this.props.addedAbility ? this.props.addedAbility.addedArmor : 0);

      const honorSpecialPower = Number(mon.honorSpecialPower);
      const initSpecialPower = Number(monInfo.specialPower);
      const specialPower = honorSpecialPower + initSpecialPower + mon.addedSpecialPower - (this.props.addedAbility ? this.props.addedAbility.addedSpecialPower : 0);

      const honorSpecialArmor = Number(mon.honorSpecialArmor);
      const initSpecialArmor = Number(monInfo.specialArmor);
      const specialArmor = honorSpecialArmor + initSpecialArmor + mon.addedSpecialArmor - (this.props.addedAbility ? this.props.addedAbility.addedSpecialArmor : 0);

      const honorDex = Number(mon.honorDex);
      const initDex = Number(monInfo.dex);
      const dex = honorDex + initDex + mon.addedDex - (this.props.addedAbility ? this.props.addedAbility.addedDex : 0);

      let key = 0;
      returnComponent.push(
          <div key={key++}>
            <div className="row">
              <div className="col-xs-2 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>체력</b></big>
                </p>
              </div>
              <div className="col-xs-6 thin-padding">
                <div className="progress progress-striped active">
                  {renderStatBarComponent(honorHp, initHp, hp, 'hp')}
                </div>
              </div>
              <div className="col-xs-4 monster-hp thin-padding align-left">
                {isNaN(honorHp) ? hp : hp + honorHp}
                {renderStatBadgeComponent(honorHp, initHp, hp, 'hp')}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>공격</b></big>
                </p>
              </div>
              <div className="col-xs-6 thin-padding">
                <div className="progress progress-striped active">
                  {renderStatBarComponent(honorPower, initPower, power, 'power')}
                </div>
              </div>
              <div className="col-xs-4 monster-hp thin-padding align-left">
                {isNaN(honorPower) ? power : power + honorPower}
                {renderStatBadgeComponent(honorPower, initPower, power, 'power')}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>방어</b></big>
                </p>
              </div>
              <div className="col-xs-6 thin-padding">
                <div className="progress progress-striped active">
                  {renderStatBarComponent(honorArmor, initArmor, armor, 'armor')}
                </div>
              </div>
              <div className="col-xs-4 monster-hp thin-padding align-left">
                {isNaN(honorArmor) ? armor : armor + honorArmor}
                {renderStatBadgeComponent(honorArmor, initArmor, armor, 'armor')}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>특공</b></big>
                </p>
              </div>
              <div className="col-xs-6 thin-padding">
                <div className="progress progress-striped active">
                  {renderStatBarComponent(honorSpecialPower, initSpecialPower, specialPower, 'specialPower')}
                </div>
              </div>
              <div className="col-xs-4 monster-hp thin-padding align-left">
                {isNaN(honorSpecialPower) ? specialPower : specialPower + honorSpecialPower}
                {renderStatBadgeComponent(honorSpecialPower, initSpecialPower, specialPower, 'specialPower')}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>특방</b></big>
                </p>
              </div>
              <div className="col-xs-6 thin-padding">
                <div className="progress progress-striped active">
                  {renderStatBarComponent(honorSpecialArmor, initSpecialArmor, specialArmor, 'specialArmor')}
                </div>
              </div>
              <div className="col-xs-4 monster-hp thin-padding align-left">
                {isNaN(honorSpecialArmor) ? specialArmor : specialArmor + honorSpecialArmor}
                {renderStatBadgeComponent(honorSpecialArmor, initSpecialArmor, specialArmor, 'specialArmor')}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>민첩</b></big>
                </p>
              </div>
              <div className="col-xs-6 thin-padding">
                <div className="progress progress-striped active">
                  {renderStatBarComponent(honorDex, initDex, dex, 'dex')}
                </div>
              </div>
              <div className="col-xs-4 monster-hp thin-padding align-left">
                {isNaN(honorDex) ? dex : dex + honorDex}
                {renderStatBadgeComponent(honorDex, initDex, dex, 'dex')}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-3 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>기술명</b></big>
                </p>
              </div>
              <div className="col-xs-9 monster-skills thin-padding align-left">
                <span className="badge badge-warning">{monInfo.skillName}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-3 thin-padding align-left">
                <p>
                  <big className="text-primary"><b>전투력</b></big>
                </p>
              </div>
              <div className="col-xs-9 monster-skills thin-padding align-left">
                <span className="badge badge-inverse">
                  {hp + power + armor + dex + specialPower + specialArmor +
                    (isNaN(honorHp) ? 0 : honorHp) +
                    (isNaN(honorPower) ? 0 : honorPower) +
                    (isNaN(honorArmor) ? 0 : honorArmor) +
                    (isNaN(honorDex) ? 0 : honorDex) +
                    (isNaN(honorSpecialPower) ? 0 : honorSpecialPower) +
                    (isNaN(honorSpecialArmor) ? 0 : honorSpecialArmor)}
                </span>
                <strong className="text-primary">+{monInfo.point}</strong>
              </div>
            </div>
          </div>
        );
      return returnComponent;
    };
    return (
      <div>
        <div className="front" style={this.props.flip ? show : hide}>
          <div className="row">
            <div className="col-xs-12 align-center">
              <div className="row">
                <div className="col-xs-3 align-left">
                  <p>
                    <big className="text-primary"><b>이름</b></big>
                  </p>
                </div>
                <div className="col-xs-9 align-left">
                  <p className="monster-name">
                    <big>{monInfo.name}</big>
                  </p>
                </div>
              </div>
              <div className="row">
								<div className="col-xs-3 align-left">
									<p>
										<big className="text-primary"><b>등급</b></big>
									</p>
								</div>
								<div className="col-xs-9 align-left">
									<p className="monster-grade">
                    {renderGradeTag()}
                  </p>
                </div>
              </div>
              <div className="row">
								<div className="col-xs-3 align-left">
									<p>
										<big className="text-primary"><b>속성</b></big>
									</p>
								</div>
								<div className="col-xs-9 align-left">
									<p className="monster-attribute">
                    {renderAttrTag()}
                  </p>
                </div>
              </div>
              <div className="row">
								<div className="col-xs-3 align-left">
									<p>
										<big className="text-primary"><b>코스트</b></big>
									</p>
								</div>
								<div className="col-xs-9 align-left">
									<p className="monster-cost">
                    {renderCostComponent()}
                  </p>
                </div>
              </div>
              <div className="row">
								<div className="col-xs-12 align-left">
									<p className="monster-description">{monInfo.desc} (designed by <span className="badge badge-grey">{monInfo.designer[0]}</span>)</p>
								</div>
							</div>
            </div>
          </div>
        </div>
        <div className="back" style={this.props.flip ? hide : show}>
          {renderStatComponent()}
        </div>
      </div>
    );
  }
}

MonsterInfoView.contextTypes = {
  router: React.PropTypes.object,
};

MonsterInfoView.propTypes = {
  mon: React.PropTypes.object,
  flip: React.PropTypes.bool,
  addedAbility: React.PropTypes.object,
};

export default MonsterInfoView;
