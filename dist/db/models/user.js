"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true, index: true },
    team: { type: String, required: true },
    channel: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now },
    lastMessage: {
        text: { type: String, default: '' },
        date: { type: Date, default: Date.now },
    },
}, { timestamps: true });
userSchema.static('findByUser', function (user) {
    return this.find({ user });
});
userSchema.methods.currentlyTalking = function () {
    return new Date() < this.expiresAt;
};
const User = mongoose_1.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYi9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFrRDtBQUVsRCxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQzNCO0lBQ0UsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtJQUNuRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3pDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDNUMsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ25DLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7S0FDeEM7Q0FDRixFQUNELEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUNyQixDQUFDO0FBRUYsVUFBVSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBVSxJQUFJO0lBQzVDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7QUFDNUIsQ0FBQyxDQUFDLENBQUE7QUFFRixVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHO0lBQ3BDLE9BQU8sSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO0FBQ3BDLENBQUMsQ0FBQTtBQWVELE1BQU0sSUFBSSxHQUFHLGdCQUFLLENBQVUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQy9DLGtCQUFlLElBQUksQ0FBQyJ9