import { Router } from 'express';
import User from '../models/user.model';
import Collection from '../models/collection.model';
import passport from 'passport';
import gm from 'gm';
import multer from 'multer';

const router = new Router();

const upload = multer({ dest: './static/img/user/' });

// 이메일 중복 체크
router.get('/api/user-email-check', (req, res) => {
  const email = req.query.email;
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.json(user);
  });
});

// 닉네임 중복 체크
router.get('/api/user-nickname-check', (req, res) => {
  const nickname = req.query.nickname;
  User.findOne({ nickname }, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.json(user);
  });
});

const _getColRank = (colPoint) => {
  return new Promise((resolve, reject) => {
    let resultCnt = 0;
    User.$where('this.email !== "admin@admin"').count({ colPoint: { $gt: colPoint } }, (err, count) => {
      if (err) reject(new Error(err));
      resultCnt = count + 1;
    }).then(() => {
      resolve(resultCnt);
    });
  });
};

const _getBattleRank = (battlePoint) => {
  return new Promise((resolve, reject) => {
    let resultCnt = 0;
    User.$where('this.email !== "admin@admin"').count({ battlePoint: { $gt: battlePoint } }, (err, count) => {
      if (err) reject(new Error(err));
      resultCnt = count + 1;
    }).then(() => {
      resolve(resultCnt);
    });
  });
};

const _updateCredits = (user) => {
  console.log('updating credits');
  const updatedUser = user;
  let modified = false;
  return new Promise((resolve) => {
    if (user.getCredit < user.maxGetCredit) {
      const getInterval = Date.now() - user.lastGetTime;
      const addGetCredit = Math.floor(getInterval / user.getInterval);
      const finalGetCredit = (user.getCredit + addGetCredit > user.maxGetCredit ? user.maxGetCredit : user.getCredit + addGetCredit);
      updatedUser.getCredit = finalGetCredit;
      modified = true;
    }
    if (user.battleCredit < user.maxBattleCredit) {
      const battleInterval = Date.now() - user.lastGameTime;
      const addBattleCredit = Math.floor(battleInterval / user.battleInterval);
      const finalBattleCredit = (user.battleCredit + addBattleCredit > user.maxBattleCredit ? user.maxBattleCredit : user.battleCredit + addBattleCredit);
      updatedUser.getCredit = finalBattleCredit;
      modified = true;
    }
    if (modified) {
      User.findByIdAndUpdate(user._id, updatedUser).exec(() => {
        resolve(updatedUser);
      });
    } else {
      resolve(updatedUser);
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
        .thumb(36, 36, `${imagePath}_thumb`, 100, (err2) => {
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
      colRank: ranks[0],
      battleRank: ranks[1],
    });
    // console.log('user 객체 생성 완료');
    _saveThumbnail(imagePath).then(() => {
      User.register(user, user.password, (err, savedUser) => {
        if (err) return res.status(500).send(err);
        passport.authenticate('local')(req, res, () => {
          // console.log('유저등록 완료 : ' + savedUser);
          res.json({ savedUser });
        });
      });
    });
  });
});

router.post('/api/login', passport.authenticate('local'), (req, res) => {
  // User
  // .findById(req.user._id)
  // .populate('_collections')
  // .exec((err, user) => {
  //   if (user) {
  //     Collection.populate(user._collections, { path: '_mon' }, (err2, collections) => {
  //       user._collections = collections; // eslint-disable-line
  //       if (err) return res.status(500).send(err);
  //       res.json({ user });
  //     });
  //   } else {
  //     res.json({ user });
  //   }
  // });
  res.json({ user: req.user });
});

router.post('/api/remember-user', (req, res) => {
  res.cookie('rememberme', JSON.stringify(req.body));
  res.json({ success: true });
});

router.get('/api/cookie-user', (req, res) => {
  if (req.cookies.rememberme) {
    res.json(JSON.parse(req.cookies.rememberme));
  } else {
    res.json({ nouser: true });
  }
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
        console.log('session-user: ' + user);
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

router.get('/api/users/:id', (req, res) => {
  const _id = req.params.id;
  console.log('_id: ' + _id);
  User
  .findById(_id)
  .populate('_collections')
  .exec((err, user) => {
    console.log('user: ' + user);
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

router.put('/api/users/:id', (req, res) => {
  const userObject = JSON.parse(req.body.user);
  const user = {
    _id: userObject._id,
    email: userObject.email,
    nickname: userObject.nickname,
    img: userObject.img,
    introduce: userObject.introduce,
    recommenderFlag: userObject.recommenderFlag,
    _honor1: userObject._honor1,
    _honor2: userObject._honor2,
    pokemoney: userObject.pokemoney,
    league: userObject.league,
    maxWinInRow: userObject.maxWinInRow,
    winInRow: userObject.winInRow,
    getReward: userObject.getReward,
    reward: userObject.reward,
    maxBattleCredit: userObject.maxBattleCredit,
    battleCredit: userObject.battleCredit,
    maxGetCredit: userObject.maxGetCredit,
    getCredit: userObject.getCredit,
    scratchMode: userObject.scratchMode,
    loseBattle: userObject.loseBattle,
    winBattle: userObject.winBattle,
    totalBattle: userObject.totalBattle,
    lastLogin: userObject.lastLogin,
    battleInterval: userObject.battleInterval,
    getInterval: userObject.getInterval,
    lastGameTime: userObject.lastGameTime,
    lastGetTime: userObject.lastGetTime,
    battlePoint: userObject.battlePoint,
    colPoint: userObject.colPoint,
  };
  User
  .findByIdAndUpdate(user._id, user)
  .exec((err) => {
    console.log('updatedUser: ' + JSON.stringify(user));
    res.json(user);
  });
});

export default router;
