import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  emoticon: { type: String, required: false, default: null },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: false, default: null },
});

export type Category = InferSchemaType<typeof schema>;
export type CategoryDocument = HydratedDocument<Category>;

export const CategoryModel = model('Category', schema);
