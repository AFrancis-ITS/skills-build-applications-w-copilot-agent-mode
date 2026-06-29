import { InferSchemaType, Schema, model, models } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    recommendedForLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = models.Workout || model('Workout', workoutSchema);

export default WorkoutModel;