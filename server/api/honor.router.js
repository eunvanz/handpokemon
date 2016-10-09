import { Router } from 'express';
import Honor from '../models/honor.model';

const router = new Router();

const _saveHonor = saveFunc => {
  return new Promise((resolve) => {
    saveFunc((err, savedHonor) => {
      resolve(savedHonor);
    });
  });
};

// 일괄 등록을 위한 router
router.post('/api/honors', (req, res) => {
  const honors = req.body.honors;
  let type1No = 1;
  let type2No = 101;
  const proms = [];
  honors.forEach(item => {
    const honor = new Honor(item);
    if (honor.type === 1) {
      honor.no = type1No++;
    } else if (honor.type === 2) {
      honor.no = type2No++;
    }
    proms.push(_saveHonor(honor.save));
  });
  Promise.all(proms)
  .then(results => {
    res.send(results);
  });
});

router.get('/api/honors', (req, res) => {
  Honor.find({}).sort({ no: 'asc' }).exec((err, honors) => {
    if (err) return res.status(500).send(err);
    return res.json({ honors });
  });
});

export default router;
