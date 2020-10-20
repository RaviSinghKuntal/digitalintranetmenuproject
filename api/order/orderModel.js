import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user_name: String,
    order_details: [{
      item_name: String,
      item_description: String,
      quantity: Number,
      image: {
        file_name: String,
        url: String,
        file: {
          type: String,
          data: Buffer 
        }
      }
    }],
    date: { type: Date, default: Date.now },
    location: Schema.Types.Mixed,
    deliveryTimeOfOrder: Date,
    order_comment: String,
    status: { type: String, default: 'Inactive'},
  }
);

export default mongoose.model('order', orderSchema);