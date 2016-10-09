import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const honorSchema = new Schema({
  no: { type: Number, required: true },
  name: { type: String, requried: true },
  type: { type: Number, required: true },
  attr: { type: String },
  condition: { type: Number, required: true },
  reward: { type: Number, required: true },
  burf: { type: Array, required: true },
});

export default mongoose.model('Honor', honorSchema);
