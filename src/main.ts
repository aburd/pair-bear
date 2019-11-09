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

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Pair bear is alive!');
})();
