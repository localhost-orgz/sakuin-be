import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  goal_id: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // Jumlah uang yang dimasukkan/dikurangi
  type: { type: String, enum: ['saving', 'withdraw'], required: true }, // Jenis aktivitas
});

export type GoalHistory = InferSchemaType<typeof schema>;
export type GoalHistoryDocument = HydratedDocument<GoalHistory>;

export const GoalHistoryModel = model('GoalHistory', schema);
