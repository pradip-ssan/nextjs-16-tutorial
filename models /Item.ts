import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  title: string;
  description: string;
  createdAt: Date;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// The conditional statement safeguards against model re-compilation issues
export default mongoose.models.Item ||
  mongoose.model<IItem>("Item", ItemSchema);
