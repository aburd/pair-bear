require('dotenv').config();

const { App } = require('@slack/bolt');
import connect from './db/connect'
import createHandleUsersMiddleware from './middleware/handleUsers'
import sendingInvite from './processes/sendingInvite'
import help from './processes/help'
import { User } from './db/models'

async function initApp() {
  const db = await connect()
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  });

  // middleware
  app.use(createHandleUsersMiddleware(app, db));

  app.message(/help/i, ({ say }) => {
    help({ say })
  })

  app.message('hello', ({ message, say }) => {
    say({
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Hey there <@${message.user}>`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me"
            },
            "action_id": "button_click"
          }
        }
      ]
    });
  });

  //   app.action('button_click', ({ body, ack, say }) => {
  //     // Acknowledge the button
  //     ack();

  //     say(`<@${body.user.id}> clicked the button.`)
  //   });



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

  return [db, app]
}


(async () => {
  const [db, app] = await initApp()
  await app.start(process.env.PORT || 3000);
  console.log('Pair bear is alive!');

  // await sendingInvite(app, db)
})();
