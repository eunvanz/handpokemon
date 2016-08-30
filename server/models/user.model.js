import mongoose from 'mongoose';
// import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  img: { type: String },
  introduce: { type: String },
  colPoint: { type: Number, default: 0, required: true },
  battlePoint: { type: Number, default: 1000, required: true },
  colRank: { type: Number, required: true },
  battleRank: { type: Number, requried: true },
  lastGetTime: { type: Number, default: 0, required: true },
  lastBattleTime: { type: Number, default: 0, required: true },
  getInterval: { type: Number, default: (10 * 60 * 1000), required: true },
  battleInterval: { type: Number, default: (10 * 60 * 1000), required: true },
  lastLogin: { type: Number, default: Date.now, required: true },
  regDate: { type: Date, default: Date.now },
  totalBattle: { type: Number, default: 0, required: true },
  winBattle: { type: Number, default: 0, required: true },
  loseBattle: { type: Number, default: 0, required: true },
  scratchMode: { type: Number, default: 0, required: true },
  getCredit: { type: Number, default: 20, required: true },
  maxGetCredit: { type: Number, default: 20, required: true },
  battleCredit: { type: Number, default: 20, required: true },
  maxBattleCredit: { type: Number, default: 20, required: true },
  reward: { type: Number, default: 0, required: true },
  getReward: { type: Number, default: 0, required: true },
  winInRow: { type: Number, default: 0, requried: true },
  maxWinInRow: { type: Number, default: 0, required: true },
  league: { type: Number, default: 0, required: true },
  pokemoney: { type: Number, default: 0, required: true },
  _honor1: { type: Schema.Types.ObjectId, ref: 'Honor', default: null },
  _honor2: { type: Schema.Types.ObjectId, ref: 'Honor', default: null },
  _recommender: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  recommenderFlag: { type: Boolean, default: null },
  _collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],
  online: { type: Boolean, default: true, required: true },
  entrySeq: { type: Number, default: 0, required: true }, // 1, 2, 3
});

// userSchema.plugin(passportLocalMongoose, {
//   usernameField: 'email',
//   lastLoginField: 'lastLogin',
//   hashField: 'password',
// });

// Before saving a model, run this function
userSchema.pre('save', function(next) { // eslint-disable-line
  // get access to the user model
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash our password using the salt
    bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) return next(err2);

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) { // eslint-disable-line
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

export default mongoose.model('User', userSchema);
