import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

//! Docs to defining mongoose schema: https://mongoosejs.com/docs/guide.html
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  google_id: { type: String, required: true, unique: true },
  avatar_url: { type: String },
  created_at: { type: Date, default: Date.now() },
});

//! Docs to infer docs type: https://mongoosejs.com/docs/7.x/docs/typescript/schemas.html
export type User = InferSchemaType<typeof schema>;
export type UserDocument = HydratedDocument<User>;

export const UserModel = model('User', schema);
