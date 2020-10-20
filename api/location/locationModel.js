import mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    name: String,
    description: String,
    status: { type: String, default: 'Inactive'},
  }
);

export default mongoose.model('location', locationSchema);