// Sending Invite
// https://zeals.docbase.io/posts/957871#a-sending-invite
import Bolt from '@slack/bolt';
import Mongoose from 'mongoose';

const token = process.env.SLACK_ACCESS_TOKEN

export default async function (app: Bolt.App, channel: string, db?: Mongoose.Connection): Promise<void> {
  function sendMsg(text) {
    return app.client.chat.postMessage({
      token,
      channel,
      text,
    })
  }

  async function createInvite() {
    await sendMsg(`Hey, let's set up pair programming for this weak! (rawr)`)
    await sendMsg(`Here are the other engineers that are available:`)
  }

  createInvite()
  displayUsers()

  await sendMsg(`You've chosen <engineer>, is that correct?`)
  await sendMsg(`Bear-y good! (heh)`)
  await sendMsg(`Can you also choose some date and times for your pair-programming session?\n(the other engineer may ask to change this later)`)
  await sendMsg(`Ok, so just bear with me (heh), I'm going to confirm your details.`)
  // showInviteDetails()
  const confirmed = true
  if (confirmed) {
    await sendMsg(`Thanks! I'm so excited, I can't bear it!`)
  } else {
    await sendMsg(`Hmm, let's try that again.`)
    // createInvite()
  }
}

async function displayUsers() {
  return true
}
