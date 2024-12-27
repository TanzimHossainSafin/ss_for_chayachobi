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
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "Code is the real love";
const UserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const password=req.body.password;
    const header = req.headers["authorization"];
    if (header) {
        try {
            const is_verify = jsonwebtoken_1.default.verify(header, JWT_SECRET);
            if (is_verify) {
                //@ts-ignore
                req.userId = is_verify.id;
                next();
            }
        }
        catch (err) {
            res.status(401).send("Unauthorized");
        }
    }
    else {
        res.status(401).send("Unauthorized");
    }
});
exports.UserMiddleware = UserMiddleware;
