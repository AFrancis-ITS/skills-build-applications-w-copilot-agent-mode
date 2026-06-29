import { InferSchemaType, Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    totalPoints: { type: Number, default: 0 },
    weeklyMinutes: { type: Number, default: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = models.User || model('User', userSchema);

export default UserModel;