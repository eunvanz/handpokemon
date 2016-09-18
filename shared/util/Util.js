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
