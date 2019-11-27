// Sending Invite
// https://zeals.docbase.io/posts/957871#a-sending-invite
import { User, IUser } from '../db/models'
import { Actions } from '../typings'

export async function showInviteOptions(args): Promise<void> {
  await listOptions(args)
}

async function listOptions({ say, context }) {
  const sentInvites = await context.user.invitesSent()
  const blocks = [
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Show Received Invites"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Show",
        },
        "action_id": Actions.inviteShowReceived,
      }
    },
  ]
  if (sentInvites && sentInvites.length) {
    blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Show Sent Invite"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Show",
        },
        "action_id": Actions.inviteShowSent,
      }
    })
    blocks.push({ "type": "divider" })
  } else {
    blocks.push({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Create Invite"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Show",
        },
        "action_id": Actions.inviteCreateInvite,
      }
    })
    blocks.push({ "type": "divider" })
  }
  await say({ blocks })
}

export async function showReceived({ say, context }) {
  const { user }: { user: IUser } = context
  const invites = await user.invitesReceived()
  if (invites && invites.length) {
    say('Invites Received:')
    invites.forEach(async (invite) => say({ blocks: await invite.toBlocks() }))
  } else {
    say("You have no invites at the moment!")
  }
}

export async function showSent({ say, context }) {
  const { user }: { user: IUser } = context
  const invites = await user.invitesSent()
  if (invites && invites.length) {
    say('Invites Sent:')
    invites.forEach(async (invite) => say({ blocks: await invite.toBlocks() }))
  } else {
    say("You don't have any invites, or the invites you have sent are too old. Say `invites` if you want to create a new one!")
  }
}

async function createInvite({ say, context }) {
  await say(`Hey, let's set up pair programming for this week, ${context.user.slackName()}! (rawr)`)
  await say(`Please choose the engineer you would like to pair program with.`)
  await say(`Here are the engineers that are available:`)
  await displayUsers(say)
}

async function temp(args) {
  const { say } = args;
  await say(`You've chosen <engineer>, is that correct?`)
  await say(`Bear-y good! (heh)`)
  await say(`Can you also choose some date and times for your pair-programming session?\n(the other engineer may ask to change this later)`)
  await say(`Ok, so just bear with me (heh), I'm going to confirm your details.`)
  // showInviteDetails()
  const confirmed = true
  if (confirmed) {
    await say(`Thanks! I'm so excited, I can't bear it!`)
  } else {
    await say(`Hmm, let's try that again.`)
    await createInvite(args)
  }
}

async function displayUsers(say): Promise<void> {
  const users = await User.find()
  say({
    blocks: users.map(user => ({
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
    }))
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