import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  english_name: String,
  arabic_name: String,
  image: {
    file_name: String,
    url: String,
    file: {
      type: String,
      data: Buffer 
    }
  },
  status: { type: String, default: 'Inactive'},
});

export default mongoose.model('category', categorySchema);