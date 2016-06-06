import { Router } from 'express';
import Collection from '../models/collection.model';
import Monster from '../models/monster.model';

const router = new Router();

const _getEvolutePiece = (monNo) => {
  return new Promise((resolve, reject) => {
    Monster.findOne({ beforeNo: monNo }, 'requiredPiece').exec((err, mon) => {
      if (err) reject(new Error(err));
      return mon.requiredPiece;
    }).then((requiredPiece) => {
      resolve(requiredPiece);
    });
  });
};

router.post('/api/collections/basic-pick/:userId', (req, res) => {
  const pickedMons = req.body.pickedMons;
  const getCollections = (mons) => {
    return new Promise((resolve) => {
      mons.map((mon) => {
        _getEvolutePiece(mon.monNo)
        .then((requiredPiece) => {
          const collection = new Collection({
            monId: mon._id,
            userId: req.params.userId,
            monNo: mon.monNo,
            email: req.body.email,
            name: mon.name,
            hp: mon.hp,
            power: mon.power,
            armor: mon.armor,
            specialPower: mon.specialPower,
            specialArmor: mon.specialArmor,
            dex: mon.dex,
            initHp: mon.hp,
            initPower: mon.power,
            initArmor: mon.armor,
            intiSpecialPower: mon.specialPower,
            initSpecialArmor: mon.specialArmor,
            initDex: mon.dex,
            honorHp: 0,
            honorPower: 0,
            honorArmor: 0,
            honorSpecialPower: 0,
            honorSpecialArmor: 0,
            honorDex: 0,
            skillName: mon.skillName,
            grade: mon.grade,
            cost: mon.cost,
            img: mon.img[0],
            desc: mon.desc,
            requiredPiece: mon.requiredPiece,
            designer: mon.designer[0],
            evolutePiece: requiredPiece,
            piece: 1,
          });
          return collection;
        });
      });
      resolve(mons);
    });
  };
  getCollections(pickedMons).then((collections) => {
    const proms = [];
    for (const collection of collections) {
      const saveQuery = () => {
        collection.save();
      };
      proms.push(saveQuery);
    }
    Promise.all(proms).then(() => {
      return res.json({ success: true });
    });
  });
});

export default router;
