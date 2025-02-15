import mongoose, {Schema, Document} from 'mongoose';

interface IDrama extends Document {
  id: number;
  title: string;
  year: number;
  rating: number;
  createdOn: string;
  modifiedOn: string;
  deleted: boolean;
}

const dramaSchema: Schema = new Schema(
  {
    title: {type: String, required: true},
    year: {type: Number},
    rating: {type: Number},
  },
  {
    timestamps: true,
  },
);

const Drama = mongoose.model<IDrama>('Drama', dramaSchema);

export {Drama, IDrama};
