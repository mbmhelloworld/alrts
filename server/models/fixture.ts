import {Document, model, Schema} from 'mongoose';

const fixtureSchema = new Schema<IFixture>({
  league: { type: String},
  awayTeam: { type: String },
  homeTeam: { type: String },
  time: { type: String },
  date: { type: String },
  channel: {
      type: [String],
      required: true,
      default: [],
      },
});

export interface IFixture extends Document {
  league: string;
  awayTeam: string|null|undefined;
  homeTeam: string|null|undefined;
  time: string|null|undefined;
  date: string|null|undefined;
  channel: [];
  _id: any;
}

fixtureSchema.path('league').required(true, 'league cannot be blank');
fixtureSchema.path('homeTeam').required(true, 'homeTeam cannot be blank');
fixtureSchema.path('awayTeam').required(true, 'awayTeam cannot be blank');
fixtureSchema.path('time').required(true, 'time cannot be blank');
fixtureSchema.path('date').required(true, 'date cannot be blank');


// eslint-disable-next-line @typescript-eslint/naming-convention
const Fixture = model<IFixture>('Fixture', fixtureSchema);

export default Fixture;
