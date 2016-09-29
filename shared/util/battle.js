import * as util from './Util';

export const getBattleResultObject = (userEntry, rivalEntry, firstAttackFlag) => {
  const result = [];
  let finished = false;
  let turn = 1;
  const finishedMon = [];
  let attacker = firstAttackFlag === 1 ? 'user' : 'rival';
  let defender = attacker === 'user' ? 'rival' : 'user';
  // 포켓몬 점수를 담을 배열
  const userMonsterPoint = [0, 0, 0];
  const rivalMonsterPoint = [0, 0, 0];
  // 공격자와 방어자 몬스터 hp
  let attackMonsterHp = [0, 0, 0];
  let defenseMonsterHp = [0, 0, 0];
  let tempMonsterHp = [0, 0, 0];
  // 공격 방어 몬스터 인덱스 초기화
  let attackMonIdx = 0;
  let defenseMonIdx = 0;
  // 공격타입 (0,1은 일반, 2는 특수)
  let attackType = 0;
  // 회피참조변수 초기화
  let avoidIdx = 0;
  // 회피기준변수 초기화
  let point = 0;
  // 기본데미지 초기화
  let basicDamage = 0;
  // 특수공격데미지 초기화
  let specialDamage = 0;
  // 방어적용되기 전 데미지 초기화
  let damage = 0;
  // 회피여부 초기화
  let avoid = false;
  // 방어초기화
  let armor = 0;
  // 방어비율 초기화
  let armorPct = 0;
  // 최종데미지 초기화
  let finalDamage = 0;
  // 공격 받기 전 체력 변수 초기화
  let beforeHp = 0;
  // 공격받은 후 체력 변수 초기화
  let afterHp = 0;
  // 모든 몬스터 체력 체크 변수 초기화
  let cnt = 0;
  // 퍼펙트게임 여부 초기화
  let perfect = false;
  // 턴의 경기내용을 담을 객체
  let turnObject = null;
  // 공격몬스터를 담을 객체
  let attackMon = {};
  // 방어몬스터를 담을 객체
  let defenseMon = {};
  // 공격몬스터 리스트를 담을 배열
  let attackMonList = [];
  // 방어몬스터 리스트를 담을 배열
  let defenseMonList = [];
  let tempMonList = [];

  while (!finished) {
    if (turn === 1) {
      if (attacker === 'rival') {
        attackMonList = rivalEntry;
        defenseMonList = userEntry;
        defenseMonsterHp = [
          util.getRealHpFromCollection(userEntry[0]),
          util.getRealHpFromCollection(userEntry[1]),
          util.getRealHpFromCollection(userEntry[2]),
        ];
        attackMonsterHp = [
          util.getRealHpFromCollection(rivalEntry[0]),
          util.getRealHpFromCollection(rivalEntry[1]),
          util.getRealHpFromCollection(rivalEntry[2]),
        ];
      } else {
        attackMonList = userEntry;
        defenseMonList = rivalEntry;
        defenseMonsterHp = [
          util.getRealHpFromCollection(rivalEntry[0]),
          util.getRealHpFromCollection(rivalEntry[1]),
          util.getRealHpFromCollection(rivalEntry[2]),
        ];
        attackMonsterHp = [
          util.getRealHpFromCollection(userEntry[0]),
          util.getRealHpFromCollection(userEntry[1]),
          util.getRealHpFromCollection(userEntry[2]),
        ];
      }
    }
    turnObject = {};
    turnObject.turn = turn;
    turn++;
    turnObject.attacker = attacker;
    turnObject.defender = defender;
    // 공격몬스터 인덱스 추출
    attackMonIdx = Math.floor(Math.random() * 3);
    // 공격몬스터의 HP가 0일경우 다시 추출
    while (attackMonsterHp[attackMonIdx] === 0) {
      attackMonIdx = Math.floor(Math.random() * 3);
    }

    defenseMonIdx = Math.floor(Math.random() * 3);
    while (defenseMonsterHp[defenseMonIdx] === 0) {
      defenseMonIdx = Math.floor(Math.random() * 3);
    }

    attackType = Math.floor(Math.random() * 3);

    // 공격하는 몬스터 추출
    attackMon = attackMonList[attackMonIdx];
    // 방어하는 몬스터 추출
    defenseMon = defenseMonList[defenseMonIdx];

    turnObject.attackMon = attackMonIdx;
    turnObject.attackMonImg = attackMon._mon.img[attackMon.imgIdx];
    turnObject.defenseMon = defenseMonIdx;

    // 피하는지?
    avoidIdx = Math.floor(Math.random() * 100) + 1;
    point = Math.floor(util.getTotalDexFromCollection(defenseMon) * 0.25 - util.getTotalDexFromCollection(attackMon) * 0.15);
    if (point < 5) {
      point = 5;
    } else if (point > 60) {
      point = 60;
    }

    // 기본데미지
    basicDamage = util.getBasicDamage(attackMon, defenseMon);
    // 특수공격이라면
    specialDamage = 0;
    turnObject.attackType = attackType;
    if (attackType === 2) specialDamage = util.getSpecialDamage(attackMon, defenseMon);
    turnObject.skillName = attackMon._mon.skillName;
    damage = specialDamage === 0 ? basicDamage : specialDamage;

    // 가중치
    turnObject.bonus = util.getAttrMatchAdjustedVar(attackMon, defenseMon).toFixed(2);

    avoid = false;
    if (avoidIdx <= point) {
      avoid = true;
      turnObject.avoid = avoid;
      result.push(turnObject);
      if (attacker === 'rival') {
        userMonsterPoint[attackMonIdx] += damage;
        attacker = 'user';
        defender = 'rival';
      } else {
        rivalMonsterPoint[defenseMonIdx] += damage;
        attacker = 'rival';
        defender = 'user';
      }
      tempMonsterHp = attackMonsterHp;
      attackMonsterHp = defenseMonsterHp;
      defenseMonsterHp = tempMonsterHp;
      tempMonList = attackMonList;
      attackMonList = defenseMonList;
      defenseMonList = tempMonList;
      continue;
    }
    turnObject.avoid = avoid;

    // 방어적용
    if (attackType !== 2) {
      armor = util.getTotalArmorFromCollection(defenseMon);
    } else {
      armor = util.getTotalSpecialArmorFromCollection(defenseMon);
    }
    armorPct = util.getArmorPct(armor, util.getTotalDexFromCollection(defenseMon));
    // 최대 80퍼센트 까지만 적용
    if (armorPct > 0.8) {
      armorPct = 0.8;
    }
    finalDamage = Math.floor(damage - damage * armorPct);
    turnObject.damage = finalDamage;

    // 남은 HP 계산
    beforeHp = defenseMonsterHp[defenseMonIdx];
    afterHp = beforeHp - finalDamage;
    if (afterHp < 0) {
      afterHp = 0;
      // finishedMon 기록
      if (attacker === 'user') {
        finishedMon.push(attackMonIdx);
      }
    }
    // HP 적용
    defenseMonsterHp[defenseMonIdx] = afterHp;
    if (attacker === 'rival') {
      if (!avoid) {
        rivalMonsterPoint[attackMonIdx] += damage;
        if (beforeHp < finalDamage) {
          userMonsterPoint[defenseMonIdx] += beforeHp;
        }
      }
      userMonsterPoint[defenseMonIdx] += damage;
    } else {
      if (!avoid) {
        userMonsterPoint[attackMonIdx] += damage;
        if (beforeHp < finalDamage) {
          rivalMonsterPoint[defenseMonIdx] += beforeHp;
        }
      }
      rivalMonsterPoint[defenseMonIdx] += damage;
    }

    // 모든 몬스터의 HP가 0인지 확인
    cnt = 0;
    for (const hp of defenseMonsterHp) {
      if (hp === 0) cnt++;
    }
    if (cnt === 3) {
      finished = true;
      turnObject.finished = true;
      if (attacker === 'rival') {
        turnObject.winner = 'rival';
      } else {
        turnObject.winner = 'user';
      }
      // mon of the match 산출
      let userMaxPoint = 0;
      let userMaxIdx = 0;
      for (let i = 0; i < userMonsterPoint.length; i++) {
        if (userMaxPoint < userMonsterPoint[i]) {
          userMaxPoint = userMonsterPoint[i];
          userMaxIdx = i;
        }
      }
      let rivalMaxPoint = 0;
      let rivalMaxIdx = 0;
      for (let i = 0; i < rivalMonsterPoint.length; i++) {
        if (rivalMaxPoint < rivalMonsterPoint[i]) {
          rivalMaxPoint = rivalMonsterPoint[i];
          rivalMaxIdx = i;
        }
      }
      if (userMaxPoint > rivalMaxPoint) {
        turnObject.mvp = 'user';
        turnObject.mvpMon = userMaxIdx;
      } else {
        turnObject.mvp = 'rival';
        turnObject.mvpMon = rivalMaxIdx;
      }
      // 퍼펙트게임인지 아닌지
      // 아슬아슬인지 아닌지
      perfect = true;
      let sumRestHp = 0;
      for (const hp of attackMonsterHp) {
        if (hp === 0) {
          perfect = false;
        }
        sumRestHp += hp;
      }
      turnObject.perfect = perfect;
      if (attacker === 'user' && sumRestHp <= 30) {
        turnObject.gandang = true;
      } else {
        turnObject.gandang = false;
      }
      // 원몬쇼인지 아닌지
      if (finishedMon.length === 3 && finishedMon[0] === finishedMon[1] && finishedMon[0] === finishedMon[2]) {
        turnObject.oneMonShow = true;
      } else {
        turnObject.oneMonShow = false;
      }
    } else {
      turnObject.finished = false;
      if (attacker === 'rival') {
        attacker = 'user';
        defender = 'rival';
      } else {
        attacker = 'rival';
        defender = 'user';
      }
    }
    turnObject.maxHp = util.getRealHpFromCollection(defenseMon);
    turnObject.restHp = afterHp;
    turnObject.attackMonsterHp = Object.assign([], attackMonsterHp);
    turnObject.defenseMonsterHp = Object.assign([], defenseMonsterHp);
    tempMonsterHp = attackMonsterHp;
    attackMonsterHp = defenseMonsterHp;
    defenseMonsterHp = tempMonsterHp;
    tempMonList = attackMonList;
    attackMonList = defenseMonList;
    defenseMonList = tempMonList;
    result.push(turnObject);
  }
  console.log('result', result);
  return result;
};
