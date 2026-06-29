import { InferSchemaType, Schema, model, models } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekOf: { type: Date, required: true },
  },
  { timestamps: true },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = models.Leaderboard || model('Leaderboard', leaderboardSchema);

export default LeaderboardModel;