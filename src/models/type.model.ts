import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

export type WalletType = InferSchemaType<typeof schema>;
export type WalletTypeDocument = HydratedDocument<WalletType>;

export const TypeModel = model('Type', schema);
