import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  img: { type: String },
  introduce: { type: String },
  colPoint: { type: Number, default: 0, required: true },
  battlePoint: { type: Number, default: 1000, required: true },
  colRank: { type: Number, required: true },
  battleRank: { type: Number, requried: true },
  lastGetTime: { type: Number, default: 0, required: true },
  lastGameTime: { type: Number, default: 0, required: true },
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
  honor1: { type: Number },
  honor2: { type: Number },
  recommender: { type: String },
  recommenderFlag: { type: Boolean },
});

export default mongoose.model('User', userSchema);