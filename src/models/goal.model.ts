import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  emoticon: { type: String, required: true },
  target_amount: { type: Number, required: true },
  color: { type: String, required: false },
});

export type Goal = InferSchemaType<typeof schema>;
export type GoalDocument = HydratedDocument<Goal>;

export const GoalModel = model('Goal', schema);
