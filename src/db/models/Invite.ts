import { Schema, model, Document, Model } from 'mongoose'
import { uniq } from 'lodash'
import User, { IUser } from './User'
import { hyphenate } from '../../util'
import { Actions } from '../../typings'

export enum Confirmation {
  unconfirmed = 'unconfirmed',
  confirmed = 'confirmed',
  denied = 'denied',
}

const inviteSchema = new Schema(
  {
    theme: { type: String, required: true },
    date: { type: Date, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    confirmation: { type: String, default: Confirmation.unconfirmed }
  },
  { timestamps: true },
);

interface IInviteSchema extends Document {
  theme: string
  date: Date
  from: string
  to: string
  confirmation: Confirmation
}

inviteSchema.methods.toBlocks = async function () {
  const [from, to] = await Promise.all([
    User.findOneById(this.from),
    User.findOneById(this.to),
  ])
  return [
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Invite from ${from.slackName()}`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Invite to ${to.slackName()}`
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
          "text": `*Confirmed:*\n${this.confirmation}`
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
          "value": this.id,
          action_id: Actions.inviteConfirm,
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "emoji": true,
            "text": "Deny"
          },
          "style": "danger",
          "value": this.id,
          action_id: Actions.inviteDeny,
        }
      ]
    },
    {
      "type": "divider"
    },
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

inviteSchema.static('notInvitedUsers', async function (): Promise<IUser[]> {
  const date = new Date()
  const current = hyphenate(date)
  const confirmed = await this.find({
    createdAt: { $gte: current },
    confirmation: Confirmation.confirmed,
  }) as IInvite[]
  const confirmedUsers = confirmed.reduce((users, invite) => [...users, ...[invite.to, invite.from]], [])
  return await User.find({ userId: { $nin: confirmedUsers } })
})

export interface IInviteModel extends Model<IInvite> {
  findByDate(inviteId: string): Promise<IInvite>
  notInvitedUsers(): Promise<IUser[]>
}

export default model<IInvite, IInviteModel>('Invite', inviteSchema);