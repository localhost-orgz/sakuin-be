import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  flag: { type: String, required: true },
});

export type Currency = InferSchemaType<typeof schema>;
export type CurrencyDocument = HydratedDocument<Currency>;

export const CurrencyModel = model('Currency', schema);
