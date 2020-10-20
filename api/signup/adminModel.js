import mongoose, { Schema } from 'mongoose';

const admin = new Schema({
  name: { type: String, unique: true, required: true, dropDups: true },
  password: String,
  _created_on: { type: Date, default: Date.now} ,
});

export default mongoose.model('admin', admin);