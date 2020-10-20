import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    prefix: String,
    preference_description: String,
    total_orders: Number,
    last_order_date: Date,
    status: { type: String, default: 'Inactive'},
  }
);

export default mongoose.model('user', userSchema);