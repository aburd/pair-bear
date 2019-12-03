require('dotenv').config();

const { App } = require('@slack/bolt');
import connect from './db/connect'
import { handleUsers } from './middleware/handleUsers'
import {
  help,
  greet,
} from './processes'
import {
  showInviteOptions,
  showReceived,
  showSent,
} from './processes/invites'
import { createInviteModal } from './processes/inviteModal'
import { User, Invite } from './db/models'
import { Confirmation } from './db/models/Invite'
import { Actions, Views } from './typings'


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: { events: '/slack/events', commands: '/slack/commands', actions: '/slack/actions' }
});

// middleware
// NOTE: middleware in bolt does not work as documented 
// as listener functions will not wait for `next` function in global middleware
// app.use(handleUsers)

// help
app.message(/help|who are you\??/i, async (args) => {
  await handleUsers(args)
  await help(args)
})

// hello
app.message(/^(hello|hi|こんにちは|こんばんは|hey)$/i, async (args) => {
  await greet(args)
});

// invites
app.command(`/invites`, async (args) => {
  args.ack()
  await handleUsers(args)
  switch (args.payload.text) {
    case 'received':
      return await showReceived(args)
    case 'show':
      return await showSent(args)
    default:
      await showInviteOptions(args)
  }
})

app.message(/^invites?/i, async (args) => {
  await handleUsers(args)
  await showInviteOptions(args)
})

app.action(Actions.inviteShowReceived, async (args) => {
  args.ack()
  await handleUsers(args)
  await showReceived(args)
})

app.action(Actions.inviteShowSent, async (args) => {
  args.ack()
  await handleUsers(args)
  await showSent(args)
})

app.action(Actions.inviteConfirm, async ({ ack, payload, say }) => {
  const invite = await Invite.findById(payload.value)
  invite.confirmation = Confirmation.confirmed
  await invite.save()
  ack()
  say("Invite has been confirmed!")
  say({ blocks: await invite.toBlocks() })
})

app.action(Actions.inviteDeny, async ({ ack, payload, say }) => {
  const invite = await Invite.findById(payload.value)
  invite.confirmation = Confirmation.denied
  await invite.save()
  ack()
  say("Invite has been denied")
  say({ blocks: await invite.toBlocks() })
})

app.action(Actions.inviteCreateInvite, async ({ ack, payload, body, context }) => {
  // Acknowledge the command request
  ack();
  const inviteModal = await createInviteModal()
  console.log(JSON.stringify(inviteModal, null, 2))
  try {
    const result = app.client.views.open({
      token: context.botToken,
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: inviteModal,
    });
    console.log(result)
  }
  catch (error) {
    console.error(error)
  }
});

app.view(Views.inviteCreated, async args => {
  args.ack();
  await handleUsers(args)  
  console.log('args from invite_created', args)
});

(async () => {
  const db = await connect()
  await app.start(process.env.PORT || 3000);
  console.log('Pair bear is alive!');

  // await sendingInvite(app, db)
})();
