import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  goal_id: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ['Deposit', 'Withdrawal'],
  },
  attachment_url: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});

export type GoalHistory = InferSchemaType<typeof schema>;
export type GoalHistoryDocument = HydratedDocument<GoalHistory>;

export const GoalHistoryModel = model('GoalHistory', schema);
