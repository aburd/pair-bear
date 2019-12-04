// Sending Invite
// https://zeals.docbase.io/posts/957871#a-sending-invite
import { IUser } from '../db/models'
import { Actions } from '../typings'

export async function showInviteOptions(args): Promise<void> {
  await listOptions(args)
}

async function listOptions({ say, context }) {
  const blocks = [
    { "type": "divider" },
    btnBlock("Show Denied Invites", "Show All Denied", Actions.inviteShowDenied),
    { "type": "divider" },
    btnBlock("Show Received Invites", "Show Received", Actions.inviteShowReceived),
  ]
  const sentInvites = await context.user.invitesSent()
  if (sentInvites && sentInvites.length) {
    const sentBtn = btnBlock("Show Sent Invites", "Show Sent", Actions.inviteShowSent)
    blocks.push(sentBtn)
    blocks.push({ "type": "divider" })
  } else {
    const createBtn = btnBlock("Create Invite", "Create", Actions.inviteCreate)
    blocks.push(createBtn)
    blocks.push({ "type": "divider" })
  }
  await say({ blocks })
}

export async function showDenied({ say, context }) {
  const { user }: { user: IUser } = context
  const invites = await user.invitesDenied()
  if (invites && invites.length) {
    say('All denied invites to/from:')
    invites.forEach(async (invite) => say({ blocks: await invite.toBlocks(user.userId) }))
  } else {
    say("You have no denied invites!")
  }
}

export async function showReceived({ say, context }) {
  const { user }: { user: IUser } = context
  const invites = await user.invitesReceived()
  if (invites && invites.length) {
    say('Invites Received:')
    invites.forEach(async (invite) => say({ blocks: await invite.toBlocks(user.userId) }))
  } else {
    say("You have no invites at the moment!")
  }
}

export async function showSent({ say, context }) {
  const { user }: { user: IUser } = context
  const invites = await user.invitesSent()
  if (invites && invites.length) {
    say('Invites Sent:')
    invites.forEach(async (invite) => say({ blocks: await invite.toBlocks(user.userId) }))
  } else {
    say("You don't have any invites, or the invites you have sent are too old. Say `invites` if you want to create a new one!")
  }
}

function btnBlock(label, text, actionId) {
  return {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": label,
    },
    "accessory": {
      "type": "button",
      "text": {
        "type": "plain_text",
        "text": text,
      },
      "action_id": actionId,
    }
  }
}
