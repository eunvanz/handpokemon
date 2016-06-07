import { Router } from 'express';
import Monster from '../models/monster.model';
const multer = require('multer');

const router = new Router();
const upload = multer({ dest: './static/img/monsters/' });

const _updateEvolutePiece = (_beforeId, requiredPiece) => {
  return new Promise((resolve, reject) => {
    if (_beforeId) {
      Monster.findOneAndUpdate({ _id: _beforeId }, { evolutePiece: requiredPiece }).exec((err) => {
        if (err) reject(new Error(err));
      }).then(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

router.post('/api/monsters', upload.single('img'), (req, res) => {
  const fileName = req.file.filename;
  _updateEvolutePiece(req.body._beforeId, req.body.requiredPiece).then(() => {
    const monster = new Monster({
      monNo: req.body.monNo,
      name: req.body.name,
      mainAttr: req.body.mainAttr,
      subAttr: req.body.subAttr,
      img: fileName,
      hp: req.body.hp,
      power: req.body.power,
      armor: req.body.armor,
      specialPower: req.body.specialPower,
      specialArmor: req.body.specialArmor,
      dex: req.body.dex,
      skillName: req.body.skillName,
      grade: req.body.grade,
      cost: req.body.cost,
      _beforeId: req.body._beforeId,
      desc: req.body.desc,
      designer: req.body.designer,
      requiredPiece: req.body.requiredPiece,
      point: req.body.point,
    });
    monster.save((err, savedMonster) => {
      if (err) return res.status(500).send(err);
      return res.json(savedMonster);
    });
  });
});

router.put('/api/monsters', upload.single('img'), (req, res) => {
  let fileName = null;
  _updateEvolutePiece(req.body._beforeId, req.body.requiredPiece).then(() => {
    if (req.file) {
      fileName = req.file.filename;
    }
    const monster = new Monster({
      _id: req.body._id,
      monNo: req.body.monNo,
      name: req.body.name,
      mainAttr: req.body.mainAttr,
      subAttr: req.body.subAttr,
      img: fileName,
      hp: req.body.hp,
      power: req.body.power,
      armor: req.body.armor,
      specialPower: req.body.specialPower,
      specialArmor: req.body.specialArmor,
      dex: req.body.dex,
      skillName: req.body.skillName,
      grade: req.body.grade,
      cost: req.body.cost,
      _beforeId: req.body._beforeId,
      desc: req.body.desc,
      designer: req.body.designer,
      requiredPiece: req.body.requiredPiece,
      point: req.body.point,
    });
    const execUpdate = (updatedMon) => {
      Monster.findByIdAndUpdate(updatedMon._id, updatedMon, (err) => {
        if (err) return res.status(500).send(err);
        return res.json(updatedMon);
      });
    };
    if (!monster.img) {
      Monster.findOne({ _id: monster._id }, 'img').exec((err, originMon) => {
        monster.img = originMon.img;
        execUpdate(monster);
      });
    } else {
      execUpdate(monster);
    }
  });
});

router.get('/api/monsters/base-type', (req, res) => {
  Monster.find({}, 'monNo name').sort({ monNo: 'asc' }).exec((err, baseMons) => {
    if (err) return res.status(500).send(err);
    return res.json({ baseMons });
  });
});

router.get('/api/monsters/all', (req, res) => {
  Monster.find({}).sort({ monNo: 'asc' }).exec((err, allMons) => {
    if (err) return res.status(500).send(err);
    return res.json({ allMons });
  });
});

router.get('/api/monsters/register-pick', (req, res) => {
  // 랜덤으로 베이직 포켓몬 4개 선택
  const selectMons = (basicMonSize, basicMons) => {
    const selectedMonNo = new Set();
    let monNo = 0;
    while (selectedMonNo.size < 4) {
      monNo = Math.floor((Math.random() * basicMonSize));
      selectedMonNo.add(monNo);
    }
    const pickedMons = [];
    for (const no of selectedMonNo) {
      pickedMons.push(basicMons[no]);
    }
    return res.json({ pickedMons });
  };
  // 베이직 포켓몬의 수를 구함
  let basicMonSize = 0;
  let basicMons = [];
  Monster.find({ grade: 'b' }).exec((err, result) => {
    if (err) return res.status(500).send(err);
    basicMonSize = result.length;
    basicMons = result;
    selectMons(basicMonSize, basicMons);
  });
});

router.get('/api/monsters/:monNo', (req, res) => {
  const monNo = req.params.monNo;
  Monster.findOne({ monNo }, (err, mon) => {
    if (err) return res.status(500).send(err);
    return res.json({ mon });
  });
});

router.delete('/api/monsters/:_id', (req, res) => {
  const _id = req.params._id;
  Monster.findByIdAndRemove(_id, (err) => {
    if (err) return res.status(500).send(err);
    return res.redirect('/mon-list');
  });
});


export default router;
