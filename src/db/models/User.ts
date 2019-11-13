import { Schema, model, Document } from 'mongoose'

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

userSchema.static('findByUser', function (user) {
  return this.find({ user })
})

userSchema.methods.currentlyTalking = function (): boolean {
  return new Date() < this.expiresAt
}

export interface UserDoc extends Document {
  userId: string,
  team: string,
  channel: string,
  expiresAt: Date,
  lastMessage: {
    text: string,
    date: Date,
  },
  // methods
  currentlyTalking: () => boolean,
}

const User = model<UserDoc>('User', userSchema)
export default User;