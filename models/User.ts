import mongoose, { Schema, Document, Model } from "mongoose";

// Define interfaces for clarity and type safety
export interface IChatData {
  myTextList: {
    text: string;
    createdAt: string;
    updatedAt: string;
  }[];
  aiTextList: {
    text: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface IUser extends Document {
  username: string;
  password: string;
  profileUrl: string;
  chatData: {
    sarcastic: IChatData;
    lovely: IChatData;
    exhausted: IChatData;
    translation: IChatData;
    dictionary: IChatData;
  };
}

// Create Mongoose schemas with type annotations
const chatDataSchema = new Schema<IChatData>({
  myTextList: [
    {
      text: { type: String, required: true },
      createdAt: { type: String, default: Date.now },
      updatedAt: { type: String, default: Date.now },
    },
  ],
  aiTextList: [
    {
      text: { type: String, required: true },
      createdAt: { type: String, default: Date.now },
      updatedAt: { type: String, default: Date.now },
    },
  ],
});

const allChatDataSchema = new Schema({
  sarcastic: chatDataSchema,
  lovely: chatDataSchema,
  exhausted: chatDataSchema,
  translation: chatDataSchema,
  dictionary: chatDataSchema,
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileUrl: { type: String },
  chatData: allChatDataSchema,
});

// Define the Mongoose model with type safety
export interface UserModel extends Model<IUser> {}
export const User: UserModel = mongoose.model<IUser>("User", userSchema);
