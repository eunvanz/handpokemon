import { Router } from 'express';
import Workshop from '../models/workshop.model';
const multer = require('multer');
import * as constants from '../../shared/util/constants';

const upload = multer({ dest: `${constants.workshopImgUploadRoute}` });

const router = new Router();

// 모든 공작소 아이템 리턴
router.get('/api/workshops', (req, res) => {
  Workshop.find({}).sort({ redDate: 'desc' }).populate('_user', 'nickname').exec()
  .then(workshops => {
    res.json({ workshops });
  });
});

router.get('/api/workshops/:id', (req, res) => {
  Workshop.findById(req.params.id).populate('_user', 'nickname').exec()
  .then(workshop => {
    res.json({ workshop });
  });
});

router.delete('/api/workshops/:id', (req, res) => {
  Workshop.findByIdAndRemove(req.params.id).exec(err => {
    if (err) res.status(500).send(err);
    res.json({ success: true });
  });
});

router.post('/api/workshops', upload.single('img'), (req, res) => {
  const filename = req.file.filename;
  const now = new Date();
  const regDateString = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
  const workshop = new Workshop({
    title: req.body.title,
    _user: req.body._user,
    nickname: req.body.nickname,
    img: filename,
    likes: [req.body._user],
    regDateString,
    regDate: new Date(),
  });
  workshop.save((err, savedWorkshop) => {
    if (err) return res.status(500).send(err);
    res.json({ savedWorkshop });
  });
});

router.put('/api/workshops/:id', (req, res) => {
  const _id = req.params.id;
  const workshop = req.body.workshop;
  Workshop.findByIdAndUpdate(_id, workshop, (err) => {
    if (err) return res.status(500).send(err);
    return res.json(workshop);
  });
});

export default router;
