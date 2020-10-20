import mongoose from 'mongoose';

const { Schema } = mongoose;

const modifiersSchema = new Schema(
  {
    english_name: String,
    arabic_name: String,
    modifiers_items: Array,
    status: { type: String, default: 'Inactive'},
  }
);

export default mongoose.model('modifiers', modifiersSchema);