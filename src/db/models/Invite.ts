import { Schema, model, Document, Model } from 'mongoose'
import { hyphenate } from '../../util'

const inviteSchema = new Schema(
  {
    theme: { type: String, required: true },
    date: { type: Date, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    confirmed: { type: Boolean }
  },
  { timestamps: true },
);

interface IInviteSchema extends Document {
  theme: string
  date: Date
  from: string
  to: string
  confirmed: boolean
}

export interface IInvite extends IInviteSchema { }

inviteSchema.static('findByDate', function (date: Date): Promise<IInvite> {
  const current = hyphenate(date)
  const next = hyphenate(new Date(date.valueOf() + (24 * 60 * 60 * 1000)))
  return this.find({
    createdAt: {
      $gte: current,
      $lte: next,
    }
  })
})

export interface IInviteModel extends Model<IInvite> {
  findByDate(inviteId: string): Promise<IInvite>
}

export default model<IInvite, IInviteModel>('Invite', inviteSchema);