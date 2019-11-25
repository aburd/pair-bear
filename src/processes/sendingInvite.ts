// Sending Invite
// https://zeals.docbase.io/posts/957871#a-sending-invite
import { User } from '../db/models'
import { Actions } from '../typings'

export default async function sendingInvite({
  context,
  say,
}): Promise<void> {
  async function createInvite() {
    await say(`Hey, let's set up pair programming for this week, ${context.user.slackName()}! (rawr)`)
    await say(`Please choose the engineer you would like to pair program with.`)
    await say(`Here are the engineers that are available:`)
    await displayUsers(say)
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

async function displayUsers(say): Promise<void> {
  const users = await User.find()
  say({
    blocks: users.map(user => {
      return {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": user.slackName()
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Create invite",
            style: "primary"
          },
          value: user.userId,
          "action_id": Actions.inviteEngineerSelected,
        }
      }
    })
  })
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