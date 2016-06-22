import { Router } from 'express';
import Collection from '../models/collection.model';

const router = new Router();

// const _getEvolutePiece = (monNo) => {
//   return new Promise((resolve, reject) => {
//     let requiredPiece = null;
//     Monster.findOne({ beforeNo: monNo }, 'requiredPiece').exec((err, mon) => {
//       if (err) reject(new Error(err));
//       requiredPiece = mon.requiredPiece;
//     }).then(() => {
//       resolve(requiredPiece);
//     });
//   });
// };

router.post('/api/collections/basic-pick/:userId', (req, res) => {
  const pickedMons = req.body.pickedMons;
  const collections = [];
  let condition = 1;
  for (const mon of pickedMons) {
    condition = Math.floor((Math.random() * 5) + 1);
    const collection = new Collection({
      _monId: mon._id,
      _userId: req.params.userId,
      condition,
    });
    // this log prints right objects
    collections.push(collection);
  }
  const proms = [];
  for (const collection of collections) {
    // collection.save() function returns promise, right?
    proms.push(collection.save());
  }
  Promise.all(proms).then(() => {
    return res.json({ success: true });
  });
});

export default router;
