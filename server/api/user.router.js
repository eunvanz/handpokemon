import { Router } from 'express';
import User from '../models/user.model';
const multer = require('multer');
const crypto = require('crypto');

const router = new Router();
const upload = multer({ dest: './static/img/user/' });

const hmac = crypto.createHmac('sha256', 'hash password');

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
  // 입력받은 회원 정보로 user객체 생성
  const fileName = req.file ? req.file.filename : 'default.png';

  const colRank = _getColRank(4);
  const battleRank = _getBattleRank(1000);
  // const league = _getLeague(battleRank);
  Promise.all([colRank, battleRank]).then((ranks) => {
    const user = new User({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hmac.update(req.body.password).digest('hex'),
      img: fileName,
      introduce: req.body.introduce,
      recommender: req.body.recommender,
      colPoint: 4,
      colRank: ranks[0],
      battleRank: ranks[1],
    });
    user.save((err, savedUser) => {
      if (err) return res.status(500).send(err);
      return res.json(savedUser);
    });
  });
});

export default router;
