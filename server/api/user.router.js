import { Router } from 'express';
import User from '../models/user';

const router = new Router();

router.get('/user', (req, res) => {
  const email = req.query.email;
  // select email from db
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return status(500).send(err);
    } else {
      res.json(user);
    }
  });
});

export default router;
