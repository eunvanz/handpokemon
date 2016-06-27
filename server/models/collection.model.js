import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  _mon: { type: Schema.Types.ObjectId, ref: 'Monster', required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  getDate: { type: Date, default: Date.now, required: true },
  level: { type: Number, default: 1, required: true },
  addedHp: { type: Number, default: 0, required: true },
  addedPower: { type: Number, default: 0, required: true },
  addedArmor: { type: Number, default: 0, required: true },
  addedSpecialPower: { type: Number, default: 0, requried: true },
  addedSpecialArmor: { type: Number, default: 0, required: true },
  addedDex: { type: Number, default: 0, required: true },
  honorHp: { type: Number, default: 0, required: true },
  honorPower: { type: Number, default: 0, required: true },
  honorArmor: { type: Number, default: 0, required: true },
  honorSpecialPower: { type: Number, default: 0, requried: true },
  honorSpecialArmor: { type: Number, default: 0, required: true },
  honorDex: { type: Number, default: 0, required: true },
  imgIdx: { type: Number, default: 0, required: true },
  piece: { type: Number, default: 1 },
  potentialLevel: { type: Number, default: 0 },
  condition: { type: Number, required: true },
});

export default mongoose.model('Collection', collectionSchema);
