import bolt from '@slack/bolt'
import { Invite, User } from '../db/models'
import { formatDate } from '../lib/helpers'

const token = process.env.SLACK_BOT_TOKEN

async function remindConfirmed (app: bolt.App) {
  const minDate = new Date()
  const maxDate = new Date(minDate.valueOf() + (1000 * 60 - 1))
  const invites = await Invite.findConfirmedByRange(minDate, maxDate)
  invites.forEach(async invite => sendReminder(app, invite))
}

async function sendReminder(app, invite) {
  const to = await User.findOneById(invite.to)
  const from = await User.findOneById(invite.from)
  app.client.chat.postMessage({
    token,
    channel: to.channel,
    text: `Reminder: You have pair programming today at ${formatDate(invite.date)}`,
  })
  app.client.chat.postMessage({
    token,
    channel: to.channel,
    blocks: await invite.toBlocks(to.userId)
  })
  app.client.chat.postMessage({
    token,
    channel: from.channel,
    text: `Reminder: You have pair programming today at ${formatDate(invite.date)}`,
  })
  app.client.chat.postMessage({
    token,
    channel: from.channel,
    blocks: await invite.toBlocks(from.userId)
  })
}

export default {
  remindConfirmed
}