import { Router } from 'express';
import Collection from '../models/collection.model';
import User from '../models/user.model';
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

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
  const collectionIds = [];
  for (const collection of collections) {
    collectionIds.push(collection._id);
    proms.push(collection.save());
  }
  proms.push(User.findByIdAndUpdate(req.params.userId, { $pushAll: { _collections: collectionIds } }, { upsert: true }));
  Promise.all(proms).then(() => {
    return res.json({ success: true });
  });
});

router.get('/api/collections/count-info/:userId', (req, res) => {
  const collectionCountInfo = {};
  Collection.count({ grade: 'b', _user: ObjectId(req.params.userId) }, (err, count) => {
    collectionCountInfo.basic = count;
  })
  .then(Collection.count({ grade: 'r', _user: req.params.userId }, (err, count) => {
    collectionCountInfo.rare = count;
  })
  .then(Collection.count({ grade: 'a', _user: req.params.userId }, (err, count) => {
    collectionCountInfo.special = count;
  })
  .then(Collection.count({ grade: 'ar', _user: req.params.userId }, (err, count) => {
    collectionCountInfo.sRare = count;
  })
  .then(Collection.count({ grade: 'e', _user: req.params.userId }, (err, count) => {
    collectionCountInfo.elite = count;
  })
  .then(Collection.count({ grade: 'l', _user: req.params.userId }, (err, count) => {
    collectionCountInfo.legend = count;
  })
  .then(() => {
    res.json({ collectionCountInfo });
  }))))));
});

export default router;
