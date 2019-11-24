"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const help_1 = __importDefault(require("../processes/help"));
function checkIfRegistered(app) {
    return function ({ payload, context, say, next }) {
        console.log(payload);
        const userId = payload.user;
        models_1.User.findOne({ userId })
            .then(user => {
            if (user) {
                context.user = user;
                user
                    .updateOne({ expiresAt: new Date(Date.now() + (30 * 60 * 1000)) })
                    .then(() => next());
            }
            else {
                console.log('No user found for', payload.user, '!');
                console.log('Creating new User in DB...');
                registerNewUser({ payload, context, say, next }, app);
                return;
            }
        });
    };
}
exports.default = checkIfRegistered;
function registerNewUser({ payload, context, say, next }, app) {
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
    })
        .catch(err => {
        console.error('Uh oh, something is wrong with the DB...');
        console.error(err.message);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tJZlJlZ2lzdGVyZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9jaGVja0lmUmVnaXN0ZXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQyw2REFBb0M7QUFFcEMsU0FBd0IsaUJBQWlCLENBQUMsR0FBRztJQUMzQyxPQUFPLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQzNCLGFBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQzthQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtnQkFDbkIsSUFBSTtxQkFDRCxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQ2pFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO2FBQ3RCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO2dCQUN6QyxlQUFlLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDckQsT0FBTTthQUNQO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUE7QUFDSCxDQUFDO0FBbkJELG9DQW1CQztBQUVELFNBQVMsZUFBZSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRztJQUMzRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzVCLGFBQUksQ0FBQyxNQUFNLENBQUM7UUFDVixNQUFNO1FBQ04sT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtRQUNsQixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRTtLQUNwQyxDQUFDO1NBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1gsR0FBRyxDQUFDLGFBQWEsSUFBSSxDQUFDLE1BQU0sc0JBQXNCLENBQUMsQ0FBQTtRQUNuRCxjQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQ3RDLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQTtRQUN6RCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMifQ==