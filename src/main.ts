const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message('hello', ({ message, say }) => {
  say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
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

app.action('button_click', ({ body, ack, say }) => {
  // Acknowledge the button
  ack();

  say(`<@${body.user.id}> clicked the button.`)
});



// Sends a section block with datepicker when someone reacts with a 📅 emoji
app.event('reaction_added', ({ event, say }) => {
  if (event.reaction === 'calendar') {
    say({
      blocks: [{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Pick a date for me to remind you"
        },
        "accessory": {
          "type": "datepicker",
          "action_id": "datepicker_remind",
          "initial_date": "2019-04-28",
          "placeholder": {
            "type": "plain_text",
            "text": "Select a date"
          }
        }
      }]
    });
  }
});



(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Pair bear is alive!');
})();