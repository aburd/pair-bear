import { Schema, model, Document, Model } from 'mongoose'
import User from './User'
import { hyphenate } from '../../util'

const inviteSchema = new Schema(
  {
    theme: { type: String, required: true },
    date: { type: Date, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    confirmed: { type: Boolean, default: false }
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

inviteSchema.methods.toBlocks = async function () {
  const from = await User.findOneById(this.from)
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Invite from ${from.slackName()}`
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": `*Theme:*\n${this.theme}`
        },
        {
          "type": "mrkdwn",
          "text": `*When:*\n${hyphenate(this.date, true)}`
        },
        {
          "type": "mrkdwn",
          "text": `*Created At:*\n${hyphenate(this.createdAt, true)}`
        },
      ]
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Approve"
          },
          "style": "primary",
          "value": "click_me_123"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Deny"
          },
          "style": "danger",
          "value": "click_me_123"
        }
      ]
    }
  ]
}

export interface IInvite extends IInviteSchema {
  toBlocks(): any
}

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