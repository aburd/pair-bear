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
const bearFacts_1 = require("../lib/bearFacts");
const token = process.env.SLACK_ACCESS_TOKEN;
function help({ say, app, channel }) {
    return __awaiter(this, void 0, void 0, function* () {
        function sendMsg(text) {
            return __awaiter(this, void 0, void 0, function* () {
                if (say) {
                    return say(text);
                }
                else if (app && channel) {
                    return app.client.chat.postMessage({
                        token,
                        channel,
                        text,
                    });
                }
                else {
                    throw new Error('Cannot execute without method to chat');
                }
            });
        }
        yield sendMsg(`Did you know? ${bearFacts_1.randomFact()}
    Oh sorry, you needed help?
    Maybe you can try this:
    Say:
    \`help\` to see these options again
    \`hello\` for a great bear greeting!
    \`appointments\` to check on, or setup a new appointment
    \`invites\` to see any invites`);
    });
}
exports.default = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzZXMvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLGdEQUE2QztBQUU3QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFBO0FBRTVDLFNBQThCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUlyRDs7UUFDQyxTQUFlLE9BQU8sQ0FBQyxJQUFJOztnQkFDekIsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQ2pCO3FCQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtvQkFDekIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ2pDLEtBQUs7d0JBQ0wsT0FBTzt3QkFDUCxJQUFJO3FCQUNMLENBQUMsQ0FBQTtpQkFDSDtxQkFBTTtvQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7aUJBQ3pEO1lBQ0gsQ0FBQztTQUFBO1FBRUQsTUFBTSxPQUFPLENBQUMsaUJBQWlCLHNCQUFVLEVBQUU7Ozs7Ozs7bUNBT1YsQ0FDaEMsQ0FBQTtJQUNILENBQUM7Q0FBQTtBQTVCRCx1QkE0QkMifQ==