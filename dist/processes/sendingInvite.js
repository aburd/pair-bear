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
Object.defineProperty(exports, "__esModule", { value: true });
const token = process.env.SLACK_ACCESS_TOKEN;
function default_1(app, db) {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = 'DQC9E2QH3';
        function sendMsg(text) {
            return app.client.chat.postMessage({
                token,
                channel,
                text,
            });
        }
        yield sendMsg(`Hey, let's set up pair programming for this weak! (rawr)`);
        yield sendMsg(`Here are the other engineers that are available:`);
        // displayUsers()
        yield sendMsg(`You've chosen <engineer>, is that correct?`);
        yield sendMsg(`Bear-y good! (heh)`);
        yield sendMsg(`Can you also choose some date and times for your pair-programming session?\n(the other engineer may ask to change this later)`);
        yield sendMsg(`Ok, so just bear with me (heh), I'm going to confirm your details.`);
        // showInviteDetails()
        const confirmed = true;
        if (confirmed) {
            yield sendMsg(`Thanks! I'm so excited, I can't bear it!`);
        }
        else {
            yield sendMsg(`Hmm, let's try that again.`);
            // createInvite()
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZGluZ0ludml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzZXMvc2VuZGluZ0ludml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUE7QUFFNUMsbUJBQStCLEdBQWEsRUFBRSxFQUF1Qjs7UUFDbkUsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFBO1FBQzNCLFNBQVMsT0FBTyxDQUFDLElBQUk7WUFDbkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2pDLEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJO2FBQ0wsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELE1BQU0sT0FBTyxDQUFDLDBEQUEwRCxDQUFDLENBQUE7UUFDekUsTUFBTSxPQUFPLENBQUMsa0RBQWtELENBQUMsQ0FBQTtRQUNqRSxpQkFBaUI7UUFDakIsTUFBTSxPQUFPLENBQUMsNENBQTRDLENBQUMsQ0FBQTtRQUMzRCxNQUFNLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ25DLE1BQU0sT0FBTyxDQUFDLCtIQUErSCxDQUFDLENBQUE7UUFDOUksTUFBTSxPQUFPLENBQUMsb0VBQW9FLENBQUMsQ0FBQTtRQUNuRixzQkFBc0I7UUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxPQUFPLENBQUMsMENBQTBDLENBQUMsQ0FBQTtTQUMxRDthQUFNO1lBQ0wsTUFBTSxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtZQUMzQyxpQkFBaUI7U0FDbEI7SUFDSCxDQUFDO0NBQUE7QUF4QkQsNEJBd0JDIn0=