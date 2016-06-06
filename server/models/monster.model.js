import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const monsterSchema = new Schema({
  monNo: { type: Number, required: true },
  name: { type: String, required: true },
  mainAttr: { type: String, required: true },
  subAttr: { type: String, required: true },
  img: { type: [String], required: true },
  hp: { type: Number, required: true },
  power: { type: Number, required: true },
  armor: { type: Number, required: true },
  specialPower: { type: Number, requried: true },
  specialArmor: { type: Number, required: true },
  dex: { type: Number, required: true },
  skillName: { type: String, required: true },
  grade: { type: String, required: true },
  cost: { type: Number, required: true },
  beforeNo: { type: Number },
  desc: { type: String },
  regDate: { type: Date, default: Date.now, required: true },
  designer: { type: [String], required: true },
  requiredPiece: { type: Number },
  point: { type: Number },
});

export default mongoose.model('Monster', monsterSchema);
