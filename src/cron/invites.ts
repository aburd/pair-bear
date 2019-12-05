import bolt from '@slack/bolt'
import { Invite, User } from '../db/models'
import { IInvite } from '../db/models/Invite'
import { Actions } from '../typings'
import { btnBlock } from '../lib/blocks'

const token = process.env.SLACK_BOT_TOKEN

async function sendCreateReminder(app: bolt.App) {
  const users = await User.find()
  users.forEach(async user => {
    const invites = await user.invitesSent()
    if(!invites.length) {
      app.client.chat.postMessage({
        token,
        channel: user.channel,
        text: `*Reminder:* You haven't set up pair-programming for this week!`,
      })
      app.client.chat.postMessage({
        token,
        channel: user.channel,
        text: '',
        blocks: [btnBlock("Create Invite", "Create", Actions.inviteCreate)],
      })
    }
  })
}

async function remindConfirmed (app: bolt.App) {
  const minDate = new Date()
  const maxDate = new Date(minDate.valueOf() + (1000 * 60 - 1))
  const invites = await Invite.findConfirmedByRange(minDate, maxDate)
  const message = 'You have a pair-programming session now!'
  invites.forEach(async invite => sendReminder(app, invite, message))
}

async function remindFifteenMinutesBefore(app: bolt.App) {
  const now = new Date()
  const minDate = new Date(now.valueOf() + (1000 * 60 * 15))
  const maxDate = new Date(minDate.valueOf() + (1000 * 60 - 1))
  const invites = await Invite.findConfirmedByRange(minDate, maxDate)
  const message = 'You have a pair-programming session fifteen minutes from now.'
  invites.forEach(async invite => sendReminder(app, invite, message))
}

async function sendReminder(app: bolt.App, invite: IInvite, message: string) {
  const to = await User.findOneById(invite.to)
  const from = await User.findOneById(invite.from)
  app.client.chat.postMessage({
    token,
    channel: to.channel,
    text: `Reminder: ${message}`,
  })
  app.client.chat.postMessage({
    token,
    channel: to.channel,
    text: '',
    blocks: await invite.toBlocks(to.userId)
  })
  app.client.chat.postMessage({
    token,
    channel: from.channel,
    text: `Reminder: ${message}`,
  })
  app.client.chat.postMessage({
    token,
    channel: from.channel,
    text: '',
    blocks: await invite.toBlocks(from.userId)
  })
}

export default {
  remindConfirmed,
  sendCreateReminder,
  remindFifteenMinutesBefore,
}