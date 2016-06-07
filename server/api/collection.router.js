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
  // console.log('pickedMons: ' + pickedMons);
  // console.log('userId: ' + req.params.userId);
  const collections = [];
  const condition = Math.floor((Math.random() * 5) + 1);
  for (const mon of pickedMons) {
    const collection = new Collection({
      _monId: mon._id,
      _userId: req.params.userId,
      condition,
    });
    // console.log('collection: ' + collection);
    collections.push(collection);
  }
  const proms = [];
  for (const collection of collections) {
    const saveQuery = () => {
      collection.save();
    };
    proms.push(saveQuery);
  }
  Promise.all(proms).then(() => {
    // console.log('콜렉션 등록 완료');
    return res.json({ success: true });
  });
});

export default router;
