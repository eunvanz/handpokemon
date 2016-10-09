import { Router } from 'express';
import Monster from '../models/monster.model';
const multer = require('multer');

const router = new Router();
const upload = multer({ dest: './static/img/monsters/' });

const _updateEvolutePiece = (_beforeId, requiredPiece) => {
  return new Promise((resolve, reject) => {
    if (_beforeId !== '0') {
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
      _before: req.body._beforeId,
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
  _updateEvolutePiece(req.body._before, req.body.requiredPiece)
  .then(() => {
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
      _before: req.body._before,
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
    if (!monster.img || req.body.addImgFlag === 'true') {
      Monster.findOne({ _id: monster._id }, 'img designer').exec((err, originMon) => {
        if (req.body.addImgFlag === 'true') {
          originMon.img.push(monster.img[0]);
          originMon.designer.push(req.body.addDesigner);
          if (monster.img) {
            monster.img = originMon.img;
            monster.designer = originMon.designer;
          }
        } else {
          monster.img = originMon.img;
        }
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

router.get('/api/monsters/count-info', (req, res) => {
  const monsterCountInfo = { totalPoint: 0 };
  // console.log('counting monsters');
  Monster.count({ grade: 'b' }, (err, count) => {
    monsterCountInfo.basic = count;
  })
  .then(Monster.count({ grade: 'r' }, (err, count) => {
    monsterCountInfo.rare = count;
  })
  .then(Monster.count({ grade: 'a' }, (err, count) => {
    monsterCountInfo.special = count;
  })
  .then(Monster.count({ grade: 'ar' }, (err, count) => {
    monsterCountInfo.sRare = count;
  })
  .then(Monster.count({ grade: 'e' }, (err, count) => {
    monsterCountInfo.elite = count;
  })
  .then(Monster.count({ grade: 'l' }, (err, count) => {
    monsterCountInfo.legend = count;
  })
  .then(Monster.find({}, (err, monsters) => {
    for (const monster of monsters) {
      monsterCountInfo.totalPoint += monster.point;
    }
  })
  .then(() => {
    // console.log('monsterCountInfo: ' + JSON.stringify(monsterCountInfo));
    res.json({ monsterCountInfo });
  })))))));
});

router.get('/api/monsters/get-mon', (req, res) => {
  const selectMon = (basicMonSize, basicMons) => {
    const monNo = Math.floor((Math.random() * basicMonSize));
    res.json({ mon: basicMons[monNo] });
  };
  Monster.find({ grade: 'b' }).exec((err, result) => {
    if (err) return res.status(500).send(err);
    const basicMonSize = result.length;
    const basicMons = result;
    selectMon(basicMonSize, basicMons);
  });
});

router.get('/api/monsters/:param', (req, res) => {
  const param = req.params.param;
  let query = {};
  const grades = ['b', 'r', 's', 'ar', 'e', 'l'];
  if (grades.includes(param)) {
    query = { grade: param };
    Monster.find(query).exec((err, mons) => {
      if (err) return res.status(500).send(err);
      res.json({ mons });
    });
  } else if (param === 'reward') {
    query = { $or: [{ grade: 'b' }, { grade: 'r' }] };
    Monster.find(query).exec((err, mons) => {
      if (err) return res.status(500).send(err);
      res.json({ mons });
    });
  } else {
    query = { monNo: param };
    Monster.findOne(query).exec((err, mon) => {
      if (err) return res.status(500).send(err);
      res.json({ mon });
    });
  }
});

router.get('/api/monsters/:beforeId/evolution', (req, res) => {
  const beforeId = req.params.beforeId;
  Monster.find({ _before: beforeId }).exec((err, mons) => {
    if (err) return res.status(500).send(err);
    res.json({ mons });
  });
});

router.delete('/api/monsters/:_id', (req, res) => {
  const _id = req.params._id;
  Monster.findByIdAndRemove(_id, (err) => {
    if (err) return res.status(500).send(err);
    return res.redirect('/mon-list');
  });
});

router.get('/api/designers', (req, res) => {
  const designers = new Set();
  Monster.find({})
  .select('designer')
  .exec((err, monsters) => {
    for (const monster of monsters) {
      for (const designer of monster.designer) {
        designers.add(designer);
      }
    }
    res.json({ designers });
  });
});

router.get('/api/monsters/mix/:mixLimit', (req, res) => {
  const mixLimit = req.params.mixLimit;
  const findCondition = [{ grade: 'b' }, { grade: 'r' }];
  if (mixLimit === 'e') {
    findCondition.push({ grade: 'e' });
  } else if (mixLimit === 'l') {
    findCondition.push({ grade: 'e' });
    findCondition.push({ grade: 'l' });
  }
  Monster.find({ $or: findCondition }).exec((err, mons) => {
    if (err) return res.status(500).send(err);
    res.json({ mons });
  });
});

export default router;
