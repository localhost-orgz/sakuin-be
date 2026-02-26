import { model, Schema, type HydratedDocument, type InferSchemaType, Types } from 'mongoose';

const transactionSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: 'User', required: true },
    category_id: { type: Types.ObjectId, ref: 'Category', required: true },
    wallet_id: { type: Types.ObjectId, ref: 'Wallet', required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    description: { type: String },
    date: { type: Date, required: true },
    input_method: {
      type: String,
      enum: ['manual', 'sakusnap', 'sakutalk', 'sakushare'],
      required: true,
    },
    attachment_url: { type: String },
  },
  {
    timestamps: true,
  },
);

export type Transaction = InferSchemaType<typeof transactionSchema>;
export type TransactionDocument = HydratedDocument<Transaction>;

export const TransactionModel = model('Transaction', transactionSchema);
