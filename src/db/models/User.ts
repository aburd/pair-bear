import { Schema, model, Document, Model } from 'mongoose'
import Invite, { IInvite } from './Invite'
import { hyphenate } from '../../util'

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

userSchema.methods.invitesSent = function () {
  const now = hyphenate(new Date())
  return Invite.find({
    from: this.userId,
    date: { $gte: now },
  })
}

userSchema.methods.invitesReceived = function () {
  const now = hyphenate(new Date())
  return Invite.find({
    to: this.userId,
    date: { $gte: now },
  })
}

export interface IUser extends IUserSchema {
  convoExpired: boolean
  slackName(): string
  invitesSent(): Promise<IInvite[]>
  invitesReceived(): Promise<IInvite[]>
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