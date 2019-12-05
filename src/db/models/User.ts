import { Schema, model, Document, Model } from 'mongoose'
import Invite, { Confirmation, IInvite } from './Invite'
import { SlackOption } from '../../typings'

const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    teamId: { type: String, required: true },
    channelId: { type: String, required: true },
    tz: { type: String, required: true, default: 'Asia/Tokyo' },
    tzOffset: String,
    expiresAt: { type: Date, default: Date.now },
    lastMessage: {
      text: { type: String, default: '' },
      date: { type: Date, default: Date.now },
    },
    name: { type: String, required: true },
    realName: { type: String, required: true },
    displayName: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true },
);

interface IUserSchema extends Document {
  userId: string,
  teamId: string,
  channelId: string,
  tz: String,
  tzOffset?: string,
  expiresAt: Date,
  lastMessage: {
    text: string,
    date: Date,
  },
  name: string,
  realName: string,
  displayName: string,
  avatar: string,
  createdAt: string,
  updatedAt: string,
}

// virtuals
userSchema.virtual("convoExpired").get(function (): boolean {
  return new Date() > this.expiresAt
})

// instance methods
userSchema.methods.slackMention = function (): string {
  return `<@${this.userId}>`
}

userSchema.methods.currentInvite = function () {
  return Invite.findOne({
    $and: [
      {
        createdAt: { $gte: new Date() },
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
      text: `${this.displayName} (${this.realName})`,
    },
    value: this.userId
  }
}

userSchema.methods.invitesDenied = function () {
  return Invite.find({
    $and: [
      {
        date: { $gte: new Date() },
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
  return Invite.find({
    from: this.userId,
    date: { $gte: new Date() },
    confirmation: { $in: [Confirmation.confirmed, Confirmation.unconfirmed] }
  })
}

userSchema.methods.invitesReceived = function () {
  return Invite.find({
    to: this.userId,
    date: { $gte: new Date() },
    confirmation: { $in: [Confirmation.confirmed, Confirmation.unconfirmed] }
  })
}

export interface IUser extends IUserSchema {
  convoExpired: boolean
  slackMention(): string
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