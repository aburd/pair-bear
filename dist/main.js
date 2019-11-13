"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { App } = require('@slack/bolt');
const connect_1 = __importDefault(require("./db/connect"));
const sendingInvite_1 = __importDefault(require("./processes/sendingInvite"));
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
app.action('button_click', ({ body, ack, say }) => {
    // Acknowledge the button
    ack();
    say(`<@${body.user.id}> clicked the button.`);
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
app.command('/echo', ({ command, ack, say }) => __awaiter(void 0, void 0, void 0, function* () {
    // Acknowledge command request
    ack();
    say(`${command.text}`);
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield connect_1.default();
    yield app.start(process.env.PORT || 3000);
    console.log('Pair bear is alive!');
    yield sendingInvite_1.default(app, db);
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsMkRBQWtDO0FBQ2xDLDhFQUFxRDtBQUVyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO0lBQ2xDLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQjtDQUNoRCxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDeEMsR0FBRyxDQUFDO1FBQ0YsTUFBTSxFQUFFO1lBQ047Z0JBQ0UsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE1BQU0sRUFBRTtvQkFDTixNQUFNLEVBQUUsUUFBUTtvQkFDaEIsTUFBTSxFQUFFLGVBQWUsT0FBTyxDQUFDLElBQUksR0FBRztpQkFDdkM7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLE1BQU0sRUFBRSxRQUFRO29CQUNoQixNQUFNLEVBQUU7d0JBQ04sTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLE1BQU0sRUFBRSxVQUFVO3FCQUNuQjtvQkFDRCxXQUFXLEVBQUUsY0FBYztpQkFDNUI7YUFDRjtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2hELHlCQUF5QjtJQUN6QixHQUFHLEVBQUUsQ0FBQztJQUVOLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQyxDQUFDO0FBSUgsNEVBQTRFO0FBQzVFLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQzdDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDakMsR0FBRyxDQUFDO1lBQ0YsTUFBTSxFQUFFLENBQUM7b0JBQ1AsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE1BQU0sRUFBRTt3QkFDTixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsTUFBTSxFQUFFLGtDQUFrQztxQkFDM0M7b0JBQ0QsV0FBVyxFQUFFO3dCQUNYLE1BQU0sRUFBRSxZQUFZO3dCQUNwQixXQUFXLEVBQUUsbUJBQW1CO3dCQUNoQyxjQUFjLEVBQUUsWUFBWTt3QkFDNUIsYUFBYSxFQUFFOzRCQUNiLE1BQU0sRUFBRSxZQUFZOzRCQUNwQixNQUFNLEVBQUUsZUFBZTt5QkFDeEI7cUJBQ0Y7aUJBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ25ELDhCQUE4QjtJQUM5QixHQUFHLEVBQUUsQ0FBQztJQUVOLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFHSCxDQUFDLEdBQVMsRUFBRTtJQUNWLE1BQU0sRUFBRSxHQUFHLE1BQU0saUJBQU8sRUFBRSxDQUFBO0lBQzFCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFbkMsTUFBTSx1QkFBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUMifQ==