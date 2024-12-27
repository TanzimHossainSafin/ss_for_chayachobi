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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usermiddleware_1 = require("./Usermiddleware");
const JWT_SECRET = "Code is the real love";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const is_exist = yield db_1.userModel.findOne({
            username
        });
        if (is_exist) {
            console.log(`Sorry This user name is already taken!`);
        }
        const password = req.body.password;
        yield db_1.userModel.create({
            username: username,
            password: password
        });
        res.json(`You are signup`);
    }
    catch (e) {
        console.error(e);
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const is_exist = yield db_1.userModel.findOne({
        username
    });
    if (!is_exist) {
        res.json({ message: "Sorry user is not exist! Try with correct cridentials" });
    }
    else {
        const id = is_exist._id;
        const token = yield jsonwebtoken_1.default.sign({ id: id }, JWT_SECRET);
        res.json({
            message: "You are signed in!",
            token: token
        });
    }
}));
app.post('/api/v1/content', Usermiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = req.body.link;
        const type = req.body.type;
        yield db_1.contentModel.create({
            link,
            type,
            //@ts-ignore
            userId: req.userId,
            tag: []
        });
        res.json({
            message: "Successfully Added Content!"
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/api/v1/content', Usermiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.contentModel.findOne({
        userId,
    }).populate("userId", "username"); // to see the foreign key 
    if (content) {
        res.json({
            content
        });
    }
}));
app.delete('/api/v1/content', Usermiddleware_1.UserMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    console.log('before');
    yield db_1.contentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Your content is Delete successfully"
    });
}));
app.post('/api/v1/share', (req, res) => {
});
app.post('/api/v1/brain:/shareLink', (req, res) => {
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb+srv://tanzimhossainsafin756:f3Q4NRyF8JET4S43@test.qlr5r.mongodb.net/Brainly`);
        console.log(`Detabase is Connected!`);
        app.listen(3000);
        console.log(`Server is Running`);
    });
}
main();
