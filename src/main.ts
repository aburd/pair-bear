require('dotenv').config();

const { App } = require('@slack/bolt');
import connect from './db/connect'
import { handleUsers } from './middleware/handleUsers'
import {
  help,
  greet,
  sendingInvite,
} from './processes'
import { User } from './db/models'

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// middleware
// NOTE: middleware in bolt does not work as documented 
// as listener functions will not wait for `next` function in global middleware
// app.use(handleUsers)

app.message(/help/i, async (args) => {
  await handleUsers(args)
  await help(args)
})

app.message(/^invites?/i, async (args) => {
  const { context } = args;
  await handleUsers(args)
  await sendingInvite(app, context)
})

app.message(/^(hello|hi|こんにちは|こんばんは|hey)$/i, async (args) => {
  await greet(args)
});


(async () => {
  const db = await connect()
  await app.start(process.env.PORT || 3000);
  console.log('Pair bear is alive!');

  // await sendingInvite(app, db)
})();
