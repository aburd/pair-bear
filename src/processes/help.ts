import Bolt from '@slack/bolt';
import Mongoose from 'mongoose';
import { randomFact } from '../lib/bearFacts'

const token = process.env.SLACK_ACCESS_TOKEN

export default async function help({ say, app, channel }: {
  say?: any,
  app?: Bolt.App,
  channel?: string,
}): Promise<void> {
  async function sendMsg(text) {
    if (say) {
      return say(text)
    } else if (app && channel) {
      return app.client.chat.postMessage({
        token,
        channel,
        text,
      })
    } else {
      throw new Error('Cannot execute without method to chat')
    }
  }

  await sendMsg(`Did you know? ${randomFact()}
    Oh sorry, you needed help?
    Maybe you can try this:
    Say:
    \`help\` to see these options again
    \`hello\` for a great bear greeting!
    \`appointments\` to check on, or setup a new appointment
    \`invites\` to see any invites`
  )
}