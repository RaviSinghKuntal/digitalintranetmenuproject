import mongoose from "mongoose";

const { Schema } = mongoose;

const menuSchema = new Schema({
  english_name: String,
  arabic_name: String,
  image: String,
  status: { type: String, default: "Inactive" },
});

export default mongoose.model("menu", menuSchema, "menu");
