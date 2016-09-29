import * as constants from './constants';

export const convertCollectionToMonsterForMonsterCard = (col) => {
  const mon = {};
  const baseMon = col._mon;
  mon.img = [baseMon.img[col.imgIdx]];
  mon.level = col.level;
  mon.initHp = baseMon.hp;
  mon.initPower = baseMon.power;
  mon.initArmor = baseMon.armor;
  mon.initSpecialPower = baseMon.specialPower;
  mon.initSpecialArmor = baseMon.specialArmor;
  mon.initDex = baseMon.dex;
  mon.hp = baseMon.hp + col.addedHp;
  mon.power = baseMon.power + col.addedPower;
  mon.armor = baseMon.armor + col.addedArmor;
  mon.specialPower = baseMon.specialPower + col.addedSpecialPower;
  mon.specialArmor = baseMon.specialArmor + col.addedSpecialArmor;
  mon.dex = baseMon.dex + col.addedDex;
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
  mon.designer = baseMon.designer[col.imgIdx];
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
