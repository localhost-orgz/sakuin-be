import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  currency_id: { type: Schema.Types.ObjectId, ref: 'Currency', required: true },
  type_id: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
  wallet_id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
});

export type Wallet = InferSchemaType<typeof schema>;
export type WalletDocument = HydratedDocument<Wallet>;

export const WalletModel = model('Wallet', schema);
