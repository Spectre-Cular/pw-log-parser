// /models/Item.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define TypeScript interface for Item
export interface IItem extends Document {
  guid: string;
  name: string;
  location: {
    x: number;
    y: number;
    z: number;
  };
  platform: 'Steam' | 'Xbox';
  version: string;
}

// Mongoose Schema
const ItemSchema: Schema = new Schema({
  guid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  platform: {
    type: String,
    enum: ['Steam', 'Xbox'],
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
});

// Export the model
export default mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);