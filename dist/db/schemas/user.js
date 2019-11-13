"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    user: String,
    team: String,
    channel: String,
    // user: { type: String, required: true },
    // team: { type: String, required: true },
    // channel: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now },
    lastMessage: {
        text: String,
        date: { type: Date, default: Date.now },
    },
}, { timestamps: true });
userSchema.static('findByUser', function (user) {
    return this.find({ user });
});
exports.default = userSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9zY2hlbWFzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBaUM7QUFFakMsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUMzQjtJQUNFLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsTUFBTTtJQUNmLDBDQUEwQztJQUMxQywwQ0FBMEM7SUFDMUMsNkNBQTZDO0lBQzdDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDNUMsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3hDO0NBQ0YsRUFDRCxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FDckIsQ0FBQztBQUVGLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQVUsSUFBSTtJQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQzVCLENBQUMsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=