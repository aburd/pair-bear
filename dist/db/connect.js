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
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_USER, DB_PASSWORD, DB_DOMAIN, DB_NAME, } = process.env;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_DOMAIN}/${DB_NAME}`;
        console.log('Connecting to DB...');
        yield mongoose_1.default.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        console.log('DB sucessfully connected!');
        return db;
    });
}
exports.default = connect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9jb25uZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQStCO0FBRS9CLE1BQU0sRUFDSixPQUFPLEVBQ1AsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLEdBQ1IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRWhCLFNBQThCLE9BQU87O1FBQ25DLE1BQU0sS0FBSyxHQUFHLGFBQWEsT0FBTyxJQUFJLFdBQVcsSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFLENBQUE7UUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sa0JBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQzVCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxFQUFFLEdBQUcsa0JBQVEsQ0FBQyxVQUFVLENBQUE7UUFDOUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7UUFDeEMsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQUE7QUFaRCwwQkFZQyJ9