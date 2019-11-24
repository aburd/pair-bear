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
const models_1 = require("../db/models");
// A simple implementation of a conversation store with a Firebase-like database
class ConversationStore {
    constructor(db) {
        this.db = db;
    }
    set(channel, value, expiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOneByChannel(channel);
            return user.updateOne({ lastMessage: value, expiresAt });
        });
    }
    get(channel) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('channel', channel);
            const user = yield models_1.User.findOneByChannel(channel);
            console.log('user', user);
            if (user) {
                if (user.convoExpired)
                    throw new Error('Conversation expired!');
                return user;
            }
            else {
                throw new Error('Conversation not found!');
            }
        });
    }
}
exports.default = ConversationStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVyc2F0aW9uU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZS9Db252ZXJzYXRpb25TdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHlDQUFtQztBQUVuQyxnRkFBZ0Y7QUFDaEYsTUFBcUIsaUJBQWlCO0lBRXBDLFlBQVksRUFBRTtRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ2QsQ0FBQztJQUVLLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVM7O1lBQ2pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sYUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2pELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxDQUFDO0tBQUE7SUFFSyxHQUFHLENBQUMsT0FBTzs7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUMvQixNQUFNLElBQUksR0FBRyxNQUFNLGFBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN6QixJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLElBQUksQ0FBQyxZQUFZO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtnQkFDL0QsT0FBTyxJQUFJLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUE7YUFDM0M7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQXRCRCxvQ0FzQkMifQ==