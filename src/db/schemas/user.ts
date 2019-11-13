import { Schema } from 'mongoose'

export const userSchema = new Schema({
  user: String,
  team: String,
  channel: String,
  expiresAt: Date,
  lastMessage: {
    text: String,
    date: Date,
  },
});

userSchema.static('findByUser', function (user) {
  return this.find({ user })
})

export default userSchema;