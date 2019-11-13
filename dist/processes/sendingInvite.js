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
function default_1(app, channel, db) {
    return __awaiter(this, void 0, void 0, function* () {
        function sendMsg(text) {
            return app.client.chat.postMessage({
                token,
                channel,
                text,
            });
        }
        function createInvite() {
            return __awaiter(this, void 0, void 0, function* () {
                yield sendMsg(`Hey, let's set up pair programming for this weak! (rawr)`);
                yield sendMsg(`Here are the other engineers that are available:`);
            });
        }
        createInvite();
        displayUsers();
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
function displayUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return true;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZGluZ0ludml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzZXMvc2VuZGluZ0ludml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUE7QUFFNUMsbUJBQStCLEdBQWEsRUFBRSxPQUFlLEVBQUUsRUFBd0I7O1FBQ3JGLFNBQVMsT0FBTyxDQUFDLElBQUk7WUFDbkIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2pDLEtBQUs7Z0JBQ0wsT0FBTztnQkFDUCxJQUFJO2FBQ0wsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVELFNBQWUsWUFBWTs7Z0JBQ3pCLE1BQU0sT0FBTyxDQUFDLDBEQUEwRCxDQUFDLENBQUE7Z0JBQ3pFLE1BQU0sT0FBTyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7WUFDbkUsQ0FBQztTQUFBO1FBRUQsWUFBWSxFQUFFLENBQUE7UUFDZCxZQUFZLEVBQUUsQ0FBQTtRQUVkLE1BQU0sT0FBTyxDQUFDLDRDQUE0QyxDQUFDLENBQUE7UUFDM0QsTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUNuQyxNQUFNLE9BQU8sQ0FBQywrSEFBK0gsQ0FBQyxDQUFBO1FBQzlJLE1BQU0sT0FBTyxDQUFDLG9FQUFvRSxDQUFDLENBQUE7UUFDbkYsc0JBQXNCO1FBQ3RCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQTtRQUN0QixJQUFJLFNBQVMsRUFBRTtZQUNiLE1BQU0sT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7U0FDMUQ7YUFBTTtZQUNMLE1BQU0sT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUE7WUFDM0MsaUJBQWlCO1NBQ2xCO0lBQ0gsQ0FBQztDQUFBO0FBN0JELDRCQTZCQztBQUVELFNBQWUsWUFBWTs7UUFDekIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0NBQUEifQ==