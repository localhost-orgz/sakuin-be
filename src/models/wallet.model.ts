import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';
import { TransactionModel } from './transaction.model.js';

const schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  currency_id: { type: Schema.Types.ObjectId, ref: 'Currency', required: true },
  wallet_id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
});

schema.pre('findOneAndDelete', async function (this: any) {
  try {
    const query = this.getQuery();
    const wallet = await this.model.findOne(query);

    if (wallet) {
      await TransactionModel.deleteMany({ wallet_id: wallet._id });
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat cascade delete transaksi:', error);
    throw error;
  }
});

export type Wallet = InferSchemaType<typeof schema>;
export type WalletDocument = HydratedDocument<Wallet>;

export const WalletModel = model('Wallet', schema);
