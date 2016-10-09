import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const workshopSchema = new Schema({
  title: { type: String, requried: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nickname: { type: String, required: true },
  img: { type: String, required: true },
  regDateString: { type: String, required: true },
  redDate: { type: Date, default: Date.now(), required: true },
  likes: { type: [Schema.Types.ObjectId], default: [], required: true },
  registered: { type: Boolean, default: false, required: true },
});

export default mongoose.model('Workshop', workshopSchema);
