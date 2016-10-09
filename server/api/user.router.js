import { Router } from 'express';
import User from '../models/user.model';
import Collection from '../models/collection.model';
import passport from 'passport';
import gm from 'gm';
import multer from 'multer';
import jwt from 'jwt-simple';
import config from '../config';
import passportService from '../passport'; // eslint-disable-line
import * as constants from '../../shared/util/constants';

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = new Router();

const upload = multer({ dest: './static/img/user/' });

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};

// 이메일 중복 체크
router.get('/api/user-email-check', (req, res) => {
  const email = req.query.email;
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.json(user);
  });
});

// 닉네임 중복 체크
router.get('/api/user-nickname-check', (req, res) => {
  const nickname = req.query.nickname;
  User.findOne({ nickname }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.json(user);
  });
});

const _getColRank = (colPoint) => {
  return User.where({ email: { $ne: 'admin@admin' } }).count({ colPoint: { $gt: colPoint } }).exec();
};

const _getBattleRank = (battlePoint) => {
  return User.where({ email: { $ne: 'admin@admin' } }).count({ battlePoint: { $gt: battlePoint } }).exec();
};

const _updateCredits = (user) => {
  const updateQuery = {};
  let modified = false;
  return new Promise((resolve) => {
    const currentTime = Date.now();
    if (user.getCredit < user.maxGetCredit) {
      const getInterval = currentTime - user.lastGetTime;
      const addGetCredit = Math.floor(getInterval / user.getInterval);
      const restTime = getInterval - (user.getInterval * addGetCredit);
      const finalGetCredit = (user.getCredit + addGetCredit > user.maxGetCredit ? user.maxGetCredit : user.getCredit + addGetCredit);
      updateQuery.getCredit = finalGetCredit;
      updateQuery.lastGetTime = currentTime - restTime;
      modified = true;
    }
    if (user.battleCredit < user.maxBattleCredit) {
      const battleInterval = currentTime - user.lastBattleTime;
      const addBattleCredit = Math.floor(battleInterval / user.battleInterval);
      const restTime = battleInterval - (user.battleInterval * addBattleCredit);
      const finalBattleCredit = (user.battleCredit + addBattleCredit > user.maxBattleCredit ? user.maxBattleCredit : user.battleCredit + addBattleCredit);
      updateQuery.battleCredit = finalBattleCredit;
      updateQuery.lastBattleTime = currentTime - restTime;
      modified = true;
    }
    if (modified) {
      User.findByIdAndUpdate(user._id, updateQuery).exec((updatedUser) => {
        resolve(updatedUser);
      });
    } else {
      resolve(user);
    }
  });
};

const _saveThumbnail = (imagePath) => {
  return new Promise((resolve, reject) => {
    // console.log('썸네일 생성중');
    if (imagePath) {
      gm(imagePath)
      .resize(420)
      .noProfile()
      .write(`${imagePath}`, (err) => {
        if (err) reject(new Error(err));
        gm(imagePath)
        .gravity('Center')
        .thumb(76, 76, `${imagePath}_thumb`, 100, (err2) => {
          if (err2) reject(new Error(err2));
          // console.log('썸네일 생성완료');
          resolve();
        });
      });
    } else {
      resolve();
    }
  });
};

// const _countTotalUser = () => {
//   User.$where('this.email !== "admin@admin"').count({}, (err, count) => {
//     if (err) reject(new Error(err));
//     return count + 1;
//   });
// };

// const _getLeague = (battleRank) => {
//   const countTotalUser = _countTotalUser();
// };

// 회원가입
router.post('/api/users', upload.single('img'), (req, res) => {
  // console.log('유저등록중..');
  const fileName = req.file ? req.file.filename : 'default.png';
  const imagePath = req.file ? req.file.path : null;
  // console.log(JSON.stringify(req.body));
  const colRank = _getColRank(4);
  const battleRank = _getBattleRank(1000);
  Promise.all([colRank, battleRank]).then((ranks) => {
    // console.log('promise.all 완료');
    const user = new User({
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
      img: fileName,
      introduce: req.body.introduce,
      recommender: req.body.recommender,
      colPoint: 4,
      colRank: ranks[0] + 1,
      battleRank: ranks[1] + 1,
    });
    // console.log('user 객체 생성 완료');
    _saveThumbnail(imagePath).then(() => {
      user.save((err, savedUser) => {
        if (err) return res.status(500).send(err);
        res.json({ token: tokenForUser(user), savedUser });
      });
      // User.register(user, user.password, (err, savedUser) => {
      //   if (err) return res.status(500).send(err);
      //   passport.authenticate('local')(req, res, () => {
      //     // console.log('유저등록 완료 : ' + savedUser);
      //     res.json({ savedUser });
      //   });
      // });
    });
  });
});

// router.post('/api/login', passport.authenticate('local'), (req, res) => {
router.post('/api/login', requireSignin, (req, res) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const token = tokenForUser(req.user);
  res.send({ token, user: req.user });
  // if (req.status === 401) {
  //   return res.json({ unauthorized: true });
  // }
  // res.json({ user: req.user });
});

router.get('/api/logout', (req, res) => {
  const _id = req.user._id;
  User.findByIdAndUpdate(_id, { online: false }, { upsert: true }, () => {
    req.logout();
    res.clearCookie('rememberme');
    res.json({ success: true });
  });
});

router.get('/api/session-user', (req, res) => {
  if (req.user) {
    _updateCredits(req.user)
    .then(() => {
      User
      .findById(req.user._id)
      .populate('_collections')
      .exec((err, user) => {
        if (user) {
          Collection.populate(user._collections, { path: '_mon' }, (err2, collections) => {
            user._collections = collections; // eslint-disable-line
            if (err) return res.status(500).send(err);
            res.json({ user });
          });
        } else {
          res.json({ user });
        }
      });
    });
  } else {
    res.json({ user: null });
  }
});

router.get('/api/users/order-by-col-point/:page', (req, res) => {
  User.paginate({ email: { $ne: 'admin@admin' } }, { sort: { colPoint: -1 }, limit: 20, page: req.params.page })
  .then(users => {
    res.json({ users });
  });
});

router.get('/api/users/order-by-battle-point/:page', (req, res) => {
  User.paginate({ email: { $ne: 'admin@admin' } }, { sort: { battlePoint: -1 }, limit: 20, page: req.params.page })
  .then(users => {
    res.json({ users });
  });
});

router.get('/api/users/league/:leagueNo', (req, res) => {
  User.find({ league: req.params.leagueNo, battlePossible: true }, '_id')
  .exec((err, users) => {
    if (err) return res.status(500).send(err);
    res.json({ users });
  });
});

const _updateUserCollectionStatus = user => {
  // user의 collection에서 status가 0과 1인 콜렉션의 lastStatusUpdate를 오늘 날짜와 비교하여 갱신
  // 하루 한번만 갱신하면 되기 때문에 user의 lastStatusUpdate 필드가 오늘 날짜가 아닐경우만 수행
  const today = new Date();
  const lastStatusUpdate = user.lastStatusUpdate;
  const betweenDayOfStatusUpdate = Math.floor((today.getTime() - lastStatusUpdate.getTime()) / 1000 / 60 / 60 / 24);
  if (betweenDayOfStatusUpdate > 0) {
    return Collection.find({ _user: user._id }).or([{ status: 0 }, { status: 1 }]).exec()
    .then(collections => {
      const promiseArr = [];
      for (const collection of collections) {
        let status = collection.status + betweenDayOfStatusUpdate;
        if (status > 2) status = 2;
        promiseArr.push(Collection.findByIdAndUpdate(collection._id, { status }).exec());
      }
      const now = new Date();
      const date = new Date();
      date.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
      date.setHours(0, 0, 0, 0);
      promiseArr.push(User.findByIdAndUpdate(user._id, { lastStatusUpdate: date }));
      return Promise.all(promiseArr);
    });
  }
  return Promise.resolve();
};

const _updateUserCollectionCondition = user => {
  const today = new Date();
  const lastConditionUpdate = user.lastConditionUpdate;
  const betweenDayOfConditionUpdate = Math.floor((today.getTime() - lastConditionUpdate.getTime()) / 1000 / 60 / 60 / 24);
  if (betweenDayOfConditionUpdate > 0) {
    const collections = user._collections;
    const promiseArr = [];
    const updatedCollections = [];
    let conditionIdx = 0;
    let attrIdx = 0;
    let conditionPatternIdx = 0;
    let conditionPattern = [];
    let updatedCollection = {};
    for (const collection of collections) {
      conditionIdx = collection.conditionIdx + betweenDayOfConditionUpdate;
      attrIdx = constants.attrIdx.indexOf(collection._mon.mainAttr);
      conditionPatternIdx = attrIdx % 6;
      conditionPattern = constants.conditionPatterns[conditionPatternIdx];
      if (conditionIdx > conditionPattern.length) conditionIdx = conditionIdx - conditionPattern.length - 1;
      promiseArr.push(Collection.findByIdAndUpdate(collection._id, { conditionIdx, condition: conditionPattern[conditionIdx] }).exec());
      updatedCollection = Object.assign({}, collection, { conditionIdx, condition: conditionPattern[conditionIdx] });
      updatedCollections.push(updatedCollection);
    }
    const now = new Date();
    const date = new Date();
    date.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
    date.setHours(0, 0, 0, 0);
    promiseArr.push(User.findByIdAndUpdate(user._id, { lastConditionUpdate: date }));
    Promise.all(promiseArr)
    .then(() => {
      return Promise.resolve(Object.assign({}, user, { _collections: updatedCollections, lastConditionUpdate: date }));
    });
  }
  return Promise.resolve(user);
};

router.get('/api/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findById(_id).exec((err, user) => {
    if (err) return res.status(500).send(err);
    return _updateCredits(user);
  })
  .then((user) => {
    return Promise.all([_getColRank(user.colPoint), _getBattleRank(user.battlePoint)]);
  })
  .then(ranks => {
    return User.findByIdAndUpdate(_id, { colRank: ranks[0] + 1, battleRank: ranks[1] + 1 }, { upsert: true }).exec();
  })
  .then(user => {
    // 리그 업데이트
    return User.where({ email: { $ne: 'admin@admin' } }).count({}).exec()
    .then(allUsersCount => {
      const userPercentage = user.battleRank / allUsersCount;
      const leaguesCount = constants.leaguePercentage.length;
      let leaguesCutLine = 0;
      for (let i = 0; i < leaguesCount; i++) {
        leaguesCutLine = constants.leaguePercentage[i];
        if (userPercentage >= leaguesCutLine) {
          return User.findByIdAndUpdate(_id, { league: i }, { upsert: true }).exec();
        }
      }
    });
  })
  .then(user => {
    return _updateUserCollectionStatus(user);
  })
  .then(() => {
    return User.findById(_id).populate('_collections _honor1 _honor2');
  })
  .then((populatedUser) => {
    if (populatedUser) {
      Collection.populate(populatedUser._collections, { path: '_mon' }, (err2, collections) => {
        populatedUser._collections = collections; // eslint-disable-line
        _updateUserCollectionCondition(populatedUser)
        .then(conditionUpdatedUser => {
          const honorHp = (conditionUpdatedUser._honor1 ? conditionUpdatedUser._honor1.burf[0] : 0) + (conditionUpdatedUser._honor2 ? conditionUpdatedUser._honor2.burf[0] : 0); // eslint-disable-line
          const honorPower = (conditionUpdatedUser._honor1 ? conditionUpdatedUser._honor1.burf[1] : 0) + (conditionUpdatedUser._honor2 ? conditionUpdatedUser._honor2.burf[1] : 0);
          const honorArmor = (conditionUpdatedUser._honor1 ? conditionUpdatedUser._honor1.burf[2] : 0) + (conditionUpdatedUser._honor2 ? conditionUpdatedUser._honor2.burf[2] : 0);
          const honorSpecialPower = (conditionUpdatedUser._honor1 ? conditionUpdatedUser._honor1.burf[3] : 0) + (conditionUpdatedUser._honor2 ? conditionUpdatedUser._honor2.burf[3] : 0); // eslint-disable-line
          const honorSpecialArmor = (conditionUpdatedUser._honor1 ? conditionUpdatedUser._honor1.burf[4] : 0) + (conditionUpdatedUser._honor2 ? conditionUpdatedUser._honor2.burf[4] : 0); // eslint-disable-line
          const honorDex = (conditionUpdatedUser._honor1 ? conditionUpdatedUser._honor1.burf[5] : 0) + (conditionUpdatedUser._honor2 ? conditionUpdatedUser._honor2.burf[5] : 0);
          const updatedCollections = conditionUpdatedUser._collections.map(item => {
            const collection = item;
            collection.honorHp = honorHp;
            collection.honorPower = honorPower;
            collection.honorArmor = honorArmor;
            collection.honorSpecialPower = honorSpecialPower;
            collection.honorSpecialArmor = honorSpecialArmor;
            collection.honorDex = honorDex;
            return collection;
          });
          const collectionUpdatedUser = conditionUpdatedUser;
          collectionUpdatedUser._collections = updatedCollections;
          res.json({ user: collectionUpdatedUser });
        });
      });
    } else {
      res.json({ user: populatedUser });
    }
  });
});

router.put('/api/users/:id', (req, res) => {
  const user = req.body.user || {}; // user object
  const addedCollections = req.body.addedCollections; // should be an array
  let resultUser = null;
  const ranksPromise = [];
  if (user.colPoint) ranksPromise.push(_getColRank(user.colPoint));
  if (user.battlePoint) ranksPromise.push(_getBattleRank(user.battlePoint));
  Promise.all(ranksPromise)
  .then(ranks => {
    if (user.colPoint) user.colRank = ranks[0] + 1;
    if (user.colPoint && user.battlePoint) user.battleRank = ranks[1] + 1;
    else if (!user.colPoint && user.battlePoint) user.battleRank = ranks[0] + 1;
    return User.findByIdAndUpdate(req.params.id, user, { upsert: true });
  })
  .then(() => {
    if (addedCollections) {
      return User.findByIdAndUpdate(req.params.id, { $push: { _collections: { $each: addedCollections } } }, { upsert: true });
    }
  })
  .then(() => {
    return User.findById(req.params.id).populate('_collections');
  })
  .then(updatedUser => {
    resultUser = updatedUser;
    if (updatedUser) {
      return Collection.populate(updatedUser._collections, { path: '_mon' });
    }
    res.json({ user: updatedUser });
  })
  .then(collections => {
    resultUser._collections = collections;
    res.json({ user: resultUser });
  });
});

export default router;
