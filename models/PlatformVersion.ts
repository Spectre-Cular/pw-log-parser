// /models/PlatformVersion.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPlatformVersion extends Document {
    platform: string;
    versions: string[];
}

const PlatformVersionSchema: Schema = new Schema({
    platform: { type: String, required: true },
    versions: { type: [String], required: true },
});

export default mongoose.models.PlatformVersion ||
    mongoose.model<IPlatformVersion>('PlatformVersion', PlatformVersionSchema);