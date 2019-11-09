var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    say(`<@${body.user.id}> clicked the button.`);
});
// Sends a section block with datepicker when someone reacts with a 📅 emoji
app.event('reaction_added', ({ event, say }) => {
    console.log(event.reaction);
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
(() => __awaiter(this, void 0, void 0, function* () {
    yield app.start(process.env.PORT || 3000);
    console.log('Pair bear is alive!');
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO0lBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWU7SUFDbEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CO0NBQ2hELENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUN4QyxHQUFHLENBQUM7UUFDRixNQUFNLEVBQUU7WUFDTjtnQkFDRSxNQUFNLEVBQUUsU0FBUztnQkFDakIsTUFBTSxFQUFFO29CQUNOLE1BQU0sRUFBRSxRQUFRO29CQUNoQixNQUFNLEVBQUUsZUFBZSxPQUFPLENBQUMsSUFBSSxJQUFJO2lCQUN4QztnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLE1BQU0sRUFBRTt3QkFDTixNQUFNLEVBQUUsWUFBWTt3QkFDcEIsTUFBTSxFQUFFLFVBQVU7cUJBQ25CO29CQUNELFdBQVcsRUFBRSxjQUFjO2lCQUM1QjthQUNGO1NBQ0Y7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDaEQseUJBQXlCO0lBQ3pCLEdBQUcsRUFBRSxDQUFDO0lBRU4sR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLHVCQUF1QixDQUFDLENBQUE7QUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFJSCw0RUFBNEU7QUFDNUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0IsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUNqQyxHQUFHLENBQUM7WUFDRixNQUFNLEVBQUUsQ0FBQztvQkFDUCxNQUFNLEVBQUUsU0FBUztvQkFDakIsTUFBTSxFQUFFO3dCQUNOLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixNQUFNLEVBQUUsa0NBQWtDO3FCQUMzQztvQkFDRCxXQUFXLEVBQUU7d0JBQ1gsTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLGNBQWMsRUFBRSxZQUFZO3dCQUM1QixhQUFhLEVBQUU7NEJBQ2IsTUFBTSxFQUFFLFlBQVk7NEJBQ3BCLE1BQU0sRUFBRSxlQUFlO3lCQUN4QjtxQkFDRjtpQkFDRixDQUFDO1NBQ0gsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUlILENBQUMsR0FBUyxFQUFFO0lBQ1YsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==