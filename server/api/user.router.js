import { Router } from 'express';
import User from '../models/user.model';
import passport from 'passport';
import gm from 'gm';
import multer from 'multer';
import $ from 'jquery';

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
      console.log('콜렉션랭킹: ' + resultCnt);
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
      console.log('배틀랭킹: ' + resultCnt);
      resolve(resultCnt);
    });
  });
};

const _saveThumbnail = (imagePath) => {
  return new Promise((resolve, reject) => {
    console.log('썸네일 생성중');
    if (imagePath) {
      gm(imagePath)
      .resize(420)
      .noProfile()
      .write(`${imagePath}`, (err) => {
        if (err) reject(new Error(err));
        gm(imagePath)
        .gravity('Center')
        .thumb(36, 36, `${imagePath}_thumb`, 100, (err) => {
          if (err) reject(new Error(err));
          console.log('썸네일 생성완료');
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
  console.log('유저등록중..');
  const fileName = req.file ? req.file.filename : 'default.png';
  const imagePath = req.file ? req.file.path : null;
  console.log(JSON.stringify(req.body));
  const colRank = _getColRank(4);
  const battleRank = _getBattleRank(1000);
  Promise.all([colRank, battleRank]).then((ranks) => {
    console.log('promise.all 완료');
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
    console.log('user 객체 생성 완료');
    _saveThumbnail(imagePath).then(() => {
      User.register(user, user.password, (err, savedUser) => {
        if (err) return res.status(500).send(err);
        passport.authenticate('local')(req, res, () => {
          console.log('유저등록 완료 : ' + savedUser);
          res.json({ savedUser });
        });
      });
    });
  });
});

router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

router.post('/api/remember-user', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  res.cookie('rememberme', JSON.stringify(req.body));
  // $.cookie('rememberme', JSON.stringify(req.body));
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
  req.logout();
  res.clearCookie('rememberme');
  res.json({ success: true });
});

router.get('/api/session-user', (req, res) => {
  res.json(req.user);
});

router.get('/api/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findOne({ _id })
  .populate('_collections')
  .exec((err, user) => {
    if (err) return res.status(500).send(err);
    console.log('collectionUser: ' + user);
    res.json({ user });
  });
});

export default router;
