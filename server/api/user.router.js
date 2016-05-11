import { Router } from 'express';
import User from '../models/user.model';
const multer = require('multer');

const router = new Router();
// const upload = multer({ dest: '/img/user/'});

router.get('/user-email-check', (req, res) => {
  const email = req.query.email;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return status(500).send(err);
    } else {
      res.json(user);
    }
  });
});

router.get('/user-nickname-check', (req, res) => {
  const nickname = req.query.nickname;
  User.findOne({ nickname: nickname }, (err, user) => {
    if (err) {
      return status(500).send(err);
    } else {
      res.json(user);
    }
  });
});

router.post('/users', (req, res) => {

});

export default router;
