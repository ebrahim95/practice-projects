"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
//const cors = require('cors');
const app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
//app.use(cors());
app.get('/api/ping', (_req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    return res.send('pong');
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is connected to PORT ${PORT}`);
});
