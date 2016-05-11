import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  monNo: { type: Number, required: true },
  email: { type: String, required: true },
  getDate: { type: Date, default: Date.now, required: true },
  level: { type: Number, default: 1, required: true },
  hp: { type: Number, required: true },
  power: { type: Number, required: true },
  armor: { type: Number, required: true },
  specialPower: { type: Number, requried: true },
  specialArmor: { type: Number, required: true },
  dex: { type: Number, required: true },
  initHp: { type: Number, required: true },
  initPower: { type: Number, required: true },
  initArmor: { type: Number, required: true },
  initSpecialPower: { type: Number, requried: true },
  initSpecialArmor: { type: Number, required: true },
  initDex: { type: Number, required: true },
  honorHp: { type: Number, required: true },
  honorPower: { type: Number, required: true },
  honorArmor: { type: Number, required: true },
  honorSpecialPower: { type: Number, requried: true },
  honorSpecialArmor: { type: Number, required: true },
  honorDex: { type: Number, required: true },
  skillName: { type: String, required: true },
  grade: { type: String, required: true },
  cost: { type: Number, required: true },
  img: { type: Number },
  desc: { type: String },
  requiredPiece: { type: Number },
  designer: { type: String, required: true },
  evolutePiece: { type: Number },
  piece: { type: Number },
});

export default mongoose.model('Collection', collectionSchema);
