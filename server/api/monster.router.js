import { Router } from 'express';
import Monster from '../models/monster.model';
const multer = require('multer');

const router = new Router();
const upload = multer({ dest: '/img/monsters/' });

router.post('/api/monsters', upload.single('img'), (req, res) => {
  const fileName = req.file.originalname;
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
    beforeNo: req.body.beforeNo,
    desc: req.body.desc,
    designer: req.body.designer,
    requiredPiece: req.body.requiredPiece,
  });
  monster.save((err, monster) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send(monster);
    }
  });
});

router.get('/api/monsters/base-type', (req, res) => {
  Monster.find({ beforeNo: null }, (err, monster) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      res.send(monster);
    }
  });

  router.get('/api/monsters/register-pick', (req, res) => {
    Monster.find({ grade: 'b'});
  });
});

export default router;
