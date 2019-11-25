// Sending Invite
// https://zeals.docbase.io/posts/957871#a-sending-invite
import Bolt from '@slack/bolt';
import Mongoose from 'mongoose';
import { User } from '../db/models'

const token = process.env.SLACK_ACCESS_TOKEN

export default async function sendingInvite(app: Bolt.App, context: any, db?: Mongoose.Connection): Promise<void> {
  function sendMsg(text) {
    return app.client.chat.postMessage({
      token,
      channel: context.user.channel,
      text,
    })
  }

  async function createInvite() {
    await sendMsg(`Hey, let's set up pair programming for this weak! (rawr)`)
    await sendMsg(`Here are the engineers that are available:`)
    await sendMsg(await displayUsers())
  }

  await createInvite()

  // await sendMsg(`You've chosen <engineer>, is that correct?`)
  // await sendMsg(`Bear-y good! (heh)`)
  // await sendMsg(`Can you also choose some date and times for your pair-programming session?\n(the other engineer may ask to change this later)`)
  // await sendMsg(`Ok, so just bear with me (heh), I'm going to confirm your details.`)
  // showInviteDetails()
  // const confirmed = true
  // if (confirmed) {
  //   await sendMsg(`Thanks! I'm so excited, I can't bear it!`)
  // } else {
  //   await sendMsg(`Hmm, let's try that again.`)
  //   await createInvite()
  // }
}

async function displayUsers(): Promise<string> {
  const users = await User.find()
  return users.map(user => user.slackName()).join('\n')
}

//   // Sends a section block with datepicker when someone reacts with a 📅 emoji
  //   app.event('reaction_added', ({ event, say }) => {
  //     if (event.reaction === 'calendar') {
  //       say({
  //         blocks: [{
  //           "type": "section",
  //           "text": {
  //             "type": "mrkdwn",
  //             "text": "Pick a date for me to remind you"
  //           },
  //           "accessory": {
  //             "type": "datepicker",
  //             "action_id": "datepicker_remind",
  //             "initial_date": "2019-04-28",
  //             "placeholder": {
  //               "type": "plain_text",
  //               "text": "Select a date"
  //             }
  //           }
  //         }]
  //       });
  //     }
  //   });