import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  firebaseId: string;
  email: string;
  name: string;
  provider: string; // 'google' or 'email'
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  firebaseId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  provider: { type: String, required: true, enum: ['google', 'email'] },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
