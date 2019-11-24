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
const ConversationStore_1 = __importDefault(require("./middleware/ConversationStore"));
const handleNewUsers_1 = __importDefault(require("./middleware/handleNewUsers"));
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connect_1.default();
        const app = new App({
            token: process.env.SLACK_BOT_TOKEN,
            signingSecret: process.env.SLACK_SIGNING_SECRET,
            convoStore: new ConversationStore_1.default(db),
        });
        // middleware
        app.use(handleNewUsers_1.default(app));
        //   app.message(/help/i, ({ say }) => {
        //     help({ say })
        //   })
        //   app.message('hello', ({ message, say }) => {
        //     say({
        //       blocks: [
        //         {
        //           "type": "section",
        //           "text": {
        //             "type": "mrkdwn",
        //             "text": `Hey there <@${message.user}>`
        //           },
        //           "accessory": {
        //             "type": "button",
        //             "text": {
        //               "type": "plain_text",
        //               "text": "Click Me"
        //             },
        //             "action_id": "button_click"
        //           }
        //         }
        //       ]
        //     });
        //   });
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
        return [db, app];
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const [db, app] = yield initApp();
    yield app.start(process.env.PORT || 3000);
    console.log('Pair bear is alive!');
    // await sendingInvite(app, db)
}))();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdkMsMkRBQWtDO0FBQ2xDLHVGQUE4RDtBQUM5RCxpRkFBd0Q7QUFLeEQsU0FBZSxPQUFPOztRQUNwQixNQUFNLEVBQUUsR0FBRyxNQUFNLGlCQUFPLEVBQUUsQ0FBQTtRQUMxQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlO1lBQ2xDLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQjtZQUMvQyxVQUFVLEVBQUUsSUFBSSwyQkFBaUIsQ0FBQyxFQUFFLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsYUFBYTtRQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTdCLHdDQUF3QztRQUN4QyxvQkFBb0I7UUFDcEIsT0FBTztRQUVQLGlEQUFpRDtRQUNqRCxZQUFZO1FBQ1osa0JBQWtCO1FBQ2xCLFlBQVk7UUFDWiwrQkFBK0I7UUFDL0Isc0JBQXNCO1FBQ3RCLGdDQUFnQztRQUNoQyxxREFBcUQ7UUFDckQsZUFBZTtRQUNmLDJCQUEyQjtRQUMzQixnQ0FBZ0M7UUFDaEMsd0JBQXdCO1FBQ3hCLHNDQUFzQztRQUN0QyxtQ0FBbUM7UUFDbkMsaUJBQWlCO1FBQ2pCLDBDQUEwQztRQUMxQyxjQUFjO1FBQ2QsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsUUFBUTtRQUVSLHlEQUF5RDtRQUN6RCxnQ0FBZ0M7UUFDaEMsYUFBYTtRQUViLG9EQUFvRDtRQUNwRCxRQUFRO1FBSVIsaUZBQWlGO1FBQ2pGLHNEQUFzRDtRQUN0RCwyQ0FBMkM7UUFDM0MsY0FBYztRQUNkLHFCQUFxQjtRQUNyQiwrQkFBK0I7UUFDL0Isc0JBQXNCO1FBQ3RCLGdDQUFnQztRQUNoQyx5REFBeUQ7UUFDekQsZUFBZTtRQUNmLDJCQUEyQjtRQUMzQixvQ0FBb0M7UUFDcEMsZ0RBQWdEO1FBQ2hELDRDQUE0QztRQUM1QywrQkFBK0I7UUFDL0Isc0NBQXNDO1FBQ3RDLHdDQUF3QztRQUN4QyxnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGFBQWE7UUFDYixZQUFZO1FBQ1osUUFBUTtRQUNSLFFBQVE7UUFFUixPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7Q0FBQTtBQUdELENBQUMsR0FBUyxFQUFFO0lBQ1YsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLE9BQU8sRUFBRSxDQUFBO0lBQ2pDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFbkMsK0JBQStCO0FBQ2pDLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyJ9