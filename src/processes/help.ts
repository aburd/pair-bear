import Bolt from '@slack/bolt';

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

  await sendMsg(`I'm Pair-Bear, a bear that helps out with pair-programming (it's best not to think about it).
    My primary function is to manage "invites" to pair-programming from your fellow programmers.
    
    Usage:
    1. Create an invite to invite someone else to pair-programming
    2. Or wait for someone else to invite you
    3. Accept an invitation, and I'll remind you when it's time to pair program
    4. After pair-programming, be sure to leave feedback!

    Maybe you can try these commands:
    Say:
    \`help\` to see these options again
    \`hello\` for a great bear greeting!
    \`invites\` or \`/invites\` to see any information associated with "invites"`
  )
}