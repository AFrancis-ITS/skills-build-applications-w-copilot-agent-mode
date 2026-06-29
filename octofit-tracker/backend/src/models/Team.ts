import { InferSchemaType, Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;

const TeamModel = models.Team || model('Team', teamSchema);

export default TeamModel;