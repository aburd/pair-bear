"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    user: String,
    team: String,
    channel: String,
    expiresAt: Date,
    lastMessage: {
        text: String,
        date: Date,
    },
});
exports.userSchema.static('findByUser', function (user) {
    return this.find({ user });
});
exports.default = mongoose_1.model('User', exports.userSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF3QztBQUUzQixRQUFBLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDbkMsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxNQUFNO0lBQ2YsU0FBUyxFQUFFLElBQUk7SUFDZixXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxJQUFJO0tBQ1g7Q0FDRixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBVSxJQUFJO0lBQzVDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7QUFDNUIsQ0FBQyxDQUFDLENBQUE7QUFFRixrQkFBZSxnQkFBSyxDQUFDLE1BQU0sRUFBRSxrQkFBVSxDQUFDLENBQUMifQ==