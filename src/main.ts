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
import { User, Invite } from './db/models'
import { Confirmation } from './db/models/Invite'
import { Actions } from './typings'


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// middleware
// NOTE: middleware in bolt does not work as documented 
// as listener functions will not wait for `next` function in global middleware
// app.use(handleUsers)

// help
app.message(/help/i, async (args) => {
  await handleUsers(args)
  await help(args)
})

// invites
app.message(/^invites?/i, async (args) => {
  await handleUsers(args)
  await showInviteOptions(args)
})

app.action(Actions.inviteShowReceived, async (args) => {
  args.ack()
  const { context, body } = args;
  context.user = await User.findOneById(body.user.id)
  await showReceived(args)
})

app.action(Actions.inviteShowSent, async (args) => {
  args.ack()
  const { context, body } = args;
  context.user = await User.findOneById(body.user.id)
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

app.event(Actions.inviteEngineerSelected, async (args) => {
  const { event, context, ack } = args;
  ack()
})

// hello
app.message(/^(hello|hi|こんにちは|こんばんは|hey)$/i, async (args) => {
  await greet(args)
});


(async () => {
  const db = await connect()
  await app.start(process.env.PORT || 3000);
  console.log('Pair bear is alive!');

  // await sendingInvite(app, db)
})();
