import mongoose from 'mongoose';

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    english_name: String,
    arabic_name: String,
    english_description: String,
    arabic_description: String,
    menu_name: String,
    category_name: String,
    preparation_time: Number,
    calegories_count: Number,
    english_modifiers: Array,
    arabic_modifiers: Array,
    image: {
      file_name: String,
      url: String,
      file: {
        type: String,
        data: Buffer 
      }
    },
    video: {
      file_name: String,
      url: String,
      file: {
        type: String,
        data: Buffer 
      }
    },
    status: { type: String, default: 'Inactive'},
  }
);

export default mongoose.model('item', itemSchema);