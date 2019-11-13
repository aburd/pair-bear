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
const help_1 = __importDefault(require("./processes/help"));
const models_1 = require("./db/models");
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});
function checkIfRegistered({ payload, context, say, next }) {
    console.log(payload);
    const userId = payload.user;
    models_1.User.findOne({ userId })
        .then(user => {
        if (user) {
            context.user = user;
            user.updateOne({ expiresAt: new Date(Date.now() + (30 * 60 * 1000)) }).then(() => next());
        }
        else {
            console.log('No user found for', payload.user, '!');
            console.log('Creating new User in DB...');
            registerNewUser({ payload, context, say, next });
            return;
        }
    });
}
function registerNewUser({ payload, context, say, next }) {
    const userId = payload.user;
    models_1.User.create({
        userId,
        channel: payload.channel,
        team: payload.team,
        lastMessage: { text: payload.text }
    })
        .then(user => {
        say(`Oh hey, <@${user.userId}>! Nice to meet you!`);
        help_1.default({ channel: user.channel, app });
        next();
    })
        .catch(err => {
        console.error('Uh oh, something is wrong with the DB...');
        console.error(err.message);
    });
}
app.use(checkIfRegistered);
app.message(/help/i, ({ message, say }) => {
    help_1.default({ say });
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
// app.command('/echo', async ({ command, ack, say }) => {
//   // Acknowledge command request
//   ack();
//   say(`${command.text}`);
// });
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connect_1.default();
    yield app.start(process.env.PORT || 3000);
    console.log('Pair bear is alive!');
    // await sendingInvite(app, db)
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsMkRBQWtDO0FBRWxDLDREQUFtQztBQUNuQyx3Q0FBa0M7QUFFbEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZTtJQUNsQyxhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0I7Q0FDaEQsQ0FBQyxDQUFDO0FBRUgsU0FBUyxpQkFBaUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3BCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDM0IsYUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNYLElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQzFGO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE9B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