import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  country: { type: String, required: true },
});

export type Currency = InferSchemaType<typeof schema>;
export type CurrencyDocument = HydratedDocument<Currency>;

export const CurrencyModel = model('Currency', schema);
