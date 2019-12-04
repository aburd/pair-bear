require('dotenv').config();

const { App } = require('@slack/bolt')
import connect from './db/connect'
import greetingHandler from './handlers/greeting'
import helpHandler from './handlers/help'
import invitesHandler from './handlers/invites'
import startCron from './cron'

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: { events: '/slack/events', commands: '/slack/commands', actions: '/slack/actions' }
});

// middleware
// NOTE: middleware in bolt does not work as documented 
// as listener functions will not wait for `next` function in global middleware
// app.use(async args => await handleUsers(args))
greetingHandler(app);
helpHandler(app);
invitesHandler(app);

(async () => {
  const db = await connect()
  await app.start(process.env.PORT || 3000)
  console.log('Pair bear is alive!')
  startCron(app)
})();
