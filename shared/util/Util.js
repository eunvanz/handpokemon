import * as constants from './constants';
import { disableUserHonor } from '../service/UserService';

export const convertCollectionToMonsterForMonsterCard = (col) => {
  const mon = {};
  const baseMon = col._mon;
  mon.img = baseMon.img;
  mon.imgIdx = col.imgIdx;
  mon.designer = baseMon.designer;
  mon.level = col.level;
  mon.initHp = baseMon.hp;
  mon.initPower = baseMon.power;
  mon.initArmor = baseMon.armor;
  mon.initSpecialPower = baseMon.specialPower;
  mon.initSpecialArmor = baseMon.specialArmor;
  mon.initDex = baseMon.dex;
  mon.hp = baseMon.hp + col.addedHp + col.honorHp;
  mon.power = baseMon.power + col.addedPower + col.honorPower;
  mon.armor = baseMon.armor + col.addedArmor + col.honorArmor;
  mon.specialPower = baseMon.specialPower + col.addedSpecialPower + col.honorSpecialPower;
  mon.specialArmor = baseMon.specialArmor + col.addedSpecialArmor + col.honorSpecialArmor;
  mon.dex = baseMon.dex + col.addedDex + col.honorDex;
  mon.honorHp = col.honorHp;
  mon.honorHp = col.honorHp;
  mon.honorPower = col.honorPower;
  mon.honorArmor = col.honorArmor;
  mon.honorSpecialPower = col.honorSpecialPower;
  mon.honorSpecialArmor = col.honorSpecialArmor;
  mon.honorDex = col.honorDex;
  mon.evolutePiece = baseMon.evolutePiece;
  mon._id = col._id;
  mon.monNo = baseMon.monNo;
  mon.mainAttr = baseMon.mainAttr;
  mon.subAttr = baseMon.subAttr;
  mon.cost = baseMon.cost;
  mon.grade = baseMon.grade;
  mon.name = baseMon.name;
  mon.desc = baseMon.desc;
  mon.skillName = baseMon.skillName;
  mon.point = baseMon.point;
  mon.condition = col.condition;
  mon.status = col.status;
  mon.entry = col.entry;

  return mon;
};

export const getBattlePowerFromCollection = (col) => {
  let battlePower = 0;
  const baseMon = col._mon;
  battlePower += baseMon.hp + baseMon.power + baseMon.armor + baseMon.specialPower + baseMon.specialArmor + baseMon.dex;
  battlePower += col.honorHp + col.honorPower + col.honorArmor + col.honorSpecialPower + col.honorSpecialArmor + col.honorDex;
  battlePower += col.addedHp + col.addedPower + col.addedArmor + col.addedSpecialPower + col.addedSpecialArmor + col.addedDex;
  return battlePower;
};

export const removeInlineScripts = () => {
  while (document.body.childElementCount !== 2) {
    document.body.removeChild(document.body.lastChild);
  }
};

export const appendInlineScripts = sciptSrcsArr => {
  for (const src of sciptSrcsArr) {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  }
};

export const getTotalAbilityFromCollection = collection => {
  return (
    collection.honorHp + collection.honorPower + collection.honorArmor + collection.honorSpecialPower
    + collection.honorSpecialArmor + collection.honorDex
    + collection.addedHp + collection.addedPower + collection.addedArmor + collection.addedSpecialPower
    + collection.addedSpecialArmor + collection.addedDex
    + collection._mon.hp + collection._mon.power + collection._mon.armor + collection._mon.specialPower
    + collection._mon.specialArmor + collection._mon.dex
  );
};

export const getTotalAbilityFromEntry = entry => {
  return (
    getTotalAbilityFromCollection(entry[0])
    + getTotalAbilityFromCollection(entry[1])
    + getTotalAbilityFromCollection(entry[2])
  );
};

export const getEntryForBattleFromUser = user => {
  const entrySeq = user.entrySeq;
  const entry = user._collections.filter(collection => {
    return collection.entry === entrySeq;
  });
  return entry;
};

export const getTotalHpFromCollection = collection => {
  return collection.honorHp + collection.addedHp + collection._mon.hp;
};

export const getTotalPowerFromCollection = collection => {
  return collection.honorPower + collection.addedPower + collection._mon.power;
};

export const getTotalArmorFromCollection = collection => {
  return collection.honorArmor + collection.addedArmor + collection._mon.armor;
};

export const getTotalSpecialPowerFromCollection = collection => {
  return collection.honorSpecialPower + collection.addedSpecialPower + collection._mon.specialPower;
};

export const getTotalSpecialArmorFromCollection = collection => {
  return collection.honorSpecialArmor + collection.addedSpecialArmor + collection._mon.specialArmor;
};

export const getTotalDexFromCollection = collection => {
  return collection.honorDex + collection.addedDex + collection._mon.dex;
};

export const getTotalAttackFromCollection = collection => {
  return getTotalPowerFromCollection(collection) + getTotalSpecialPowerFromCollection(collection);
};

export const getRealHpFromCollection = collection => {
  return 360 + Math.floor(getTotalHpFromCollection(collection) * 4 * constants.conditionVar[collection.condition]);
};

export const getAttrMatchAdjustedVar = (srcCollection, tgtCollection) => {
  const srcMainAttr = srcCollection._mon.mainAttr;
  const srcSubAttr = srcCollection._mon.subAttr;
  const tgtMainAttr = tgtCollection._mon.mainAttr;
  const tgtSubAttr = tgtCollection._mon.subAttr;
  const srcMainAttrIdx = constants.attrIdx.indexOf(srcMainAttr);
  const srcSubAttrIdx = constants.attrIdx.indexOf(srcSubAttr);
  const tgtMainAttrIdx = constants.attrIdx.indexOf(tgtMainAttr);
  const tgtSubAttrIdx = constants.attrIdx.indexOf(tgtSubAttr);
  let result = 1;
  result = constants.attrMatch[srcMainAttrIdx][tgtMainAttrIdx];
  if (tgtSubAttrIdx !== -1) result = result * constants.attrMatch[srcMainAttrIdx][tgtSubAttrIdx];
  if (srcSubAttrIdx !== -1) {
    result = result * constants.attrMatch[srcSubAttrIdx][tgtMainAttrIdx];
    if (tgtSubAttrIdx !== -1) result = result * constants.attrMatch[srcSubAttrIdx][tgtSubAttrIdx];
  }
  return result;
};

export const getBasicDamage = (attackMon, defenseMon) => {
  const attackRange = Math.floor(Math.random() * 10) * 0.1 + 1.5;
  return (getTotalPowerFromCollection(attackMon) * attackRange
  + getTotalDexFromCollection(attackMon) * 0.1 * attackRange)
  * getAttrMatchAdjustedVar(attackMon, defenseMon);
};

export const getSpecialDamage = (attackMon, defenseMon) => {
  const specialRange = Math.floor(Math.random() * 20) * 0.1 + 3.5;
  return (getTotalSpecialPowerFromCollection(attackMon) * specialRange
  + getTotalDexFromCollection(attackMon) * 0.1 * specialRange)
  * getAttrMatchAdjustedVar(attackMon, defenseMon);
};

export const getArmorPct = (armor, dex) => {
  return (0.001 + armor * 0.003 + dex * 0.0005);
};

export const getConditionAndConditionIdxFromMonster = monster => {
  const { mainAttr } = monster;
  const attrIdx = constants.attrIdx.indexOf(mainAttr);
  const patternNo = attrIdx % 6;
  const conditionPattern = constants.conditionPatterns[patternNo];
  const conditionPatternIdx = Math.floor((Math.random() * conditionPattern.length) + 1);
  return { condition: conditionPattern[conditionPatternIdx], conditionIdx: conditionPatternIdx };
};

export const getCollectionByAttr = (collections, attr) => {
  return collections.filter(collection => {
    return collection._mon.mainAttr === attr || collection._mon.subAttr === attr;
  });
};

export const getAcomplishedHonors = (user, honors) => {
  // 이미 유저가 달성한 미션 제외
  const completedHonorNos = user.completedHonors;
  const uncompletedHonors = honors.filter(honor => {
    return completedHonorNos.indexOf(honor.no) === -1;
  });
  let conditionField = null;
  return uncompletedHonors.filter(honor => {
    if (honor.type === 1) conditionField = user.colPoint;
    else if (honor.type === 2) conditionField = getCollectionByAttr(user._collections, honor.attr).length;
    return honor.condition <= conditionField;
  });
};

export const getMissionNameFromHonor = honor => {
  if (honor.type === 1) return `콜렉션점수 ${honor.condition} 달성`;
  return `${honor.attr}속성 ${honor.condition}마리 보유`;
};

export const getClassNameFromHonor = (honor, disabled) => {
  let className = '';
  if (honor.type === 1) {
    className = `${constants.honorClassName.type1} `;
    if (disabled) className += 'label-default';
    else if (honor.name.indexOf('트레이너') > 0) className += constants.honorClassName['트레이너'];
    else if (honor.name.indexOf('레인저') > 0) className += constants.honorClassName['레인저'];
    else if (honor.name.indexOf('짐리더') > 0) className += constants.honorClassName['짐리더'];
    else if (honor.name.indexOf('챔피언') > 0) className += constants.honorClassName['챔피언'];
    else if (honor.name.indexOf('마스터') > 0) className += constants.honorClassName['마스터'];
  } else if (honor.type === 2) {
    className = `${constants.honorClassName.type2} ${disabled ? 'label-default' : constants.honorClassName[honor.attr]}`;
  }
  return className;
};

export const getDisabledHonors = (user, honors) => {
  // 유저가 달성한 미션중에서
  const completedHonorNos = user.completedHonors;
  const completedHonors = honors.filter(honor => {
    return completedHonorNos.indexOf(honor.no) > 0;
  });
  // 현재 유저의 자격미달인 칭호 추출
  const disabledHonors = completedHonors.filter(honor => {
    let result = false;
    if (honor.type === 1) {
      if (honor.condition > user.colPoint) result = true;
    } else if (honor.type === 2) {
      if (honor.condition > getCollectionByAttr(user._collections, honor.attr).length) result = true;
    }
    return result;
  });
  // 유저가 칭호를 적용중인 경우 칭호 해제
  if (disabledHonors.filter(honor => { return honor.no === user._honor1.no || honor.no === user._honor2.no; }).length > 0) {
    if (disabledHonors.filter(honor => { return honor.no === user._honor1.no; }).length > 0) disableUserHonor(user, 1);
    if (disabledHonors.filter(honor => { return honor.no === user._honor2.no; }).length > 0) disableUserHonor(user, 2);
  }
  return disabledHonors;
};

export const getHonorsByHonorNos = (honorNos, honors) => {
  return honors.filter(honor => { return honorNos.indexOf(honor.no) !== -1; });
};

export const getEnabledHonors = (user, honors) => {
  const completedHonors = getHonorsByHonorNos(user.completedHonors, honors);
  const disabledHonors = getDisabledHonors(user, honors);
  return completedHonors.filter(honor1 => {
    return disabledHonors.filter(honor2 => { return honor1.no === honor2.no; }).length === 0;
  });
};

// honor 배열에 honor가 있는지 검사
export const hasHonorInHonorArray = (honor, honors) => {
  if (honors.length > 0) {
    return honors.filter(item => { return item.no === honor.no; }).length > 0;
  }
  return false;
};
