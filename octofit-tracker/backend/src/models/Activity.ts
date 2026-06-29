import { InferSchemaType, Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'strength', 'yoga', 'swim', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, default: 0, min: 0 },
    occurredAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;

const ActivityModel = models.Activity || model('Activity', activitySchema);

export default ActivityModel;