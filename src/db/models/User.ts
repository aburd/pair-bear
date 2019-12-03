import { Schema, model, Document, Model } from 'mongoose'
import Invite, { Confirmation, IInvite } from './Invite'
import { hyphenate } from '../../lib/hyphenate'
import { SlackOption } from '../../typings'

const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    team: { type: String, required: true },
    channel: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now },
    lastMessage: {
      text: { type: String, default: '' },
      date: { type: Date, default: Date.now },
    },
  },
  { timestamps: true },
);

interface IUserSchema extends Document {
  userId: string,
  team: string,
  channel: string,
  expiresAt: Date,
  lastMessage: {
    text: string,
    date: Date,
  },
}

// virtuals
userSchema.virtual("convoExpired").get(function (): boolean {
  return new Date() > this.expiresAt
})

// instance methods
userSchema.methods.slackName = function (): string {
  return `<@${this.userId}>`
}

userSchema.methods.currentInvite = function () {
  const date = new Date()
  const current = hyphenate(date)
  return Invite.findOne({
    $and: [
      {
        createdAt: { $gte: current },
        confirmation: Confirmation.confirmed,
      },
      {
        $or: [
          { to: this.userId },
          { from: this.userId },
        ]
      }
    ]
  })
}

userSchema.methods.toSlackOption = function (): SlackOption {
  return {
    text: {
      type: "plain_text",
      text: this.slackName(),
    },
    value: this.userId
  }
}

userSchema.methods.invitesDenied = function () {
  const now = hyphenate(new Date())
  return Invite.find({
    $and: [
      {
        date: { $gte: now },
        confirmation: Confirmation.denied,
      },
      {
        $or: [
          { from: this.userId },
          { to: this.userId },
        ]
      }
    ]
  })
}

userSchema.methods.invitesSent = function () {
  const now = hyphenate(new Date())
  return Invite.find({
    from: this.userId,
    date: { $gte: now },
    confirmation: { $in: [Confirmation.confirmed, Confirmation.unconfirmed] }
  })
}

userSchema.methods.invitesReceived = function () {
  const now = hyphenate(new Date())
  return Invite.find({
    to: this.userId,
    date: { $gte: now },
    confirmation: { $in: [Confirmation.confirmed, Confirmation.unconfirmed] }
  })
}

export interface IUser extends IUserSchema {
  convoExpired: boolean
  slackName(): string
  toSlackOption(): SlackOption
  invitesDenied(): Promise<IInvite[]>
  invitesSent(): Promise<IInvite[]>
  invitesReceived(): Promise<IInvite[]>
  currentInvite(): Promise<IInvite>
}

userSchema.static('findOneById', function (userId) {
  return this.findOne({ userId })
})

userSchema.static('findOneByChannel', function (channel) {
  return this.findOne({ channel })
})

export interface IUserModel extends Model<IUser> {
  findOneById(userId: string): Promise<IUser>
  findOneByChannel(channel: string): Promise<IUser>
}

export default model<IUser, IUserModel>('User', userSchema);