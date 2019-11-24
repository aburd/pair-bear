"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const help_1 = __importDefault(require("../processes/help"));
const models_1 = require("../db/models");
function handleNewUsers(app) {
    return function ({ payload, context, say, next }) {
        // console.log(payload);
        // console.log('context', context)
        try {
            const user = context.conversation;
            // console.log('user', user)
            if (!user)
                throw new Error('User not registered');
            // .updateOne({ expiresAt: new Date(Date.now() + (30 * 60 * 1000)) })
            // context.updateConversation(payload.conversationId)
        }
        catch (e) {
            console.error(e.message);
            // console.log('Creating new User in DB...');
            // registerNewUser({ payload, context, say, next }, app);
        }
    };
}
exports.default = handleNewUsers;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlTmV3VXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9oYW5kbGVOZXdVc2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUFvQztBQUNwQyx5Q0FBbUM7QUFFbkMsU0FBd0IsY0FBYyxDQUFDLEdBQUc7SUFDeEMsT0FBTyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO1FBQzlDLHdCQUF3QjtRQUN4QixrQ0FBa0M7UUFDbEMsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUE7WUFDakMsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxJQUFJO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtZQUVqRCxxRUFBcUU7WUFDckUscURBQXFEO1NBQ3REO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN4Qiw2Q0FBNkM7WUFDN0MseURBQXlEO1NBQzFEO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWpCRCxpQ0FpQkM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUc7SUFDM0QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUM1QixhQUFJLENBQUMsTUFBTSxDQUFDO1FBQ1YsTUFBTTtRQUNOLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUU7S0FDcEMsQ0FBQztTQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNYLEdBQUcsQ0FBQyxhQUFhLElBQUksQ0FBQyxNQUFNLHNCQUFzQixDQUFDLENBQUE7UUFDbkQsY0FBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUN0QyxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7UUFDekQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDIn0=