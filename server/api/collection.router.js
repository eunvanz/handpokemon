import { Router } from 'express';
import Collection from '../models/collection.model';
import User from '../models/user.model';
import Monster from '../models/monster.model';

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
      _mon: mon._id,
      _user: req.params.userId,
      condition,
    });
    console.log('추가된콜렉션: ' + collection);
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
    console.log('모든 프로미스 완료');
    return res.json({ success: true });
  }, (reason) => {
    console.log('프로미스 실패: ' + reason);
  });
});

router.get('/api/collections/count-info/:userId', (req, res) => {
  const collectionCountInfo = {};
  Collection.count({ grade: 'b', _user: req.params.userId }, (err, count) => {
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

const _isExistInCollection = (userId, monId) => {
  return new Promise((resolve, reject) => {
    console.log('userId: ' + userId + ', monId: ' + monId);
    Collection.findOne({ _user: userId, _mon: monId }).exec((err, col) => {
      if (err) reject(new Error(err));
      console.log('col:' + col);
      if (col) resolve(true);
      resolve(false);
    });
  });
};

router.get('/api/collections/get-mon', (req, res) => {
  const putMonIntoCollection = (mon) => {
    console.log('베이직포켓몬 삽입중: ' + mon._id);
    _isExistInCollection(req.user._id, mon._id)
    .then((isExist) => {
      if (isExist) { // 이미 가지고 있는 포켓몬의 경우
        console.log('이미 가지고 있는 포켓몬');
        let addedHp = 0;
        let addedPower = 0;
        let addedArmor = 0;
        let addedSpecialPower = 0;
        let addedSpecialArmor = 0;
        let addedDex = 0;
        for (let i = 0; i < mon.point; i++) {
          const abilityIdx = Math.floor((Math.random() * 6));
          if (abilityIdx === 0) {
            addedHp++;
          } else if (abilityIdx === 1) {
            addedPower++;
          } else if (abilityIdx === 2) {
            addedArmor++;
          } else if (abilityIdx === 3) {
            addedSpecialPower++;
          } else if (abilityIdx === 4) {
            addedSpecialArmor++;
          } else if (abilityIdx === 5) {
            addedDex++;
          }
        }
        // 콜렉션 업데이트
        Collection.findOneAndUpdate(
          { _user: req.user._id, _mon: mon._id },
          { $inc: { level: 1, piece: 1, addedHp, addedPower, addedArmor, addedSpecialPower, addedSpecialArmor, addedDex } }
        ).exec((err, col) => {
          console.log('콜렉션: ' + col);
          Collection.findById(col._id).populate('_mon').exec((err2, col2) => {
            res.json({ mon: col2 });
          });
        });
      } else { // 새로운 포켓몬인 경우
        console.log('새로운 포켓몬');
        const condition = Math.floor((Math.random() * 5) + 1);
        const collection = new Collection({
          _mon: mon._id,
          _user: req.user._id,
          condition,
        });
        console.log('콜렉션: ' + collection);
        collection.save().then((err) => {
          Collection.findById(collection._id).populate('_mon').exec((err2, collection2) => {
            User.findByIdAndUpdate(req.user._id, { $push: { _collections: collection._id } }, { upsert: true }, () => {
              res.json({ mon: collection2 });
            });
          });
        });
      }
    })
    .catch(err => {
      return res.status(500).send(err);
    });
  };
  const selectMon = (basicMonSize, basicMons) => {
    console.log('베이직포켓몬 선택중');
    const monNo = Math.floor((Math.random() * basicMonSize));
    putMonIntoCollection(basicMons[monNo]);
  };
  Monster.find({ grade: 'b' }).exec((err, result) => {
    console.log('베이직포켓몬 찾는중');
    if (err) return res.status(500).send(err);
    const basicMonSize = result.length;
    const basicMons = result;
    selectMon(basicMonSize, basicMons);
  });
});

router.get('/api/collections/:collectionId', (req, res) => {
  const collectionId = req.params.collectionId;
  Collection.findById(collectionId)
  .populate('_mon')
  .exec((err, collection) => {
    if (err) return res.status(500).send(err);
    res.json({ collection });
  });
});

router.put('/api/collections/:collectionId', (req, res) => {
  const collectionId = req.params.collectionId;
  const updatedCollection = req.body.collection;
  // Collection.findByIdAndUpdate(collectionId, {
  //   level: updatedCollection.level,
  //   piece: updatedCollection.piece,
  //   addedHp: updatedCollection.addedHp,
  //   addedPower: updatedCollection.addedPower,
  //   addedArmor: updatedCollection.addedArmor,
  //   addedSpecialPower: updatedCollection.addedSpecialPower,
  //   addedSpecialArmor: updatedCollection.addedSpecialArmor,
  //   addedDex: updatedCollection.addedDex,
  //   condition: updatedCollection.condition,
  //   entry: updatedCollection.entry,
  // })
  Collection.findByIdAndUpdate(collectionId, updatedCollection)
  .exec((err, collection) => {
    Collection.findById(collection._id).populate('_mon').exec((err2, col2) => {
      res.json({ collection: col2 });
    });
  });
});

router.delete('/api/collections/:collectionId', (req, res) => {
  const collectionId = req.params.collectionId;
  Collection.findByIdAndRemove(collectionId).exec(err => {
    if (err) res.status(500).send(err);
    res.json({ success: true });
  });
});

router.post('/api/collections', (req, res) => {
  const userId = req.body.userId;
  const monId = req.body.monId;
  const condition = Math.floor((Math.random() * 5) + 1);
  const collection = new Collection({
    _mon: monId,
    _user: userId,
    condition,
  });
  collection.save((err, savedCollection) => {
    if (err) return res.status(500).send(err);
    Collection.findById(savedCollection._id).populate('_mon').exec((err2, col) => {
      res.json({ collection: col });
    });
  });
});

export default router;
