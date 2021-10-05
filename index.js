"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const pleerParser = __importStar(require("../TG/pleerparser/pleerparser"));
const bot = new TelegramBot('2034784132:AAGMPPO1rciFpIZC9dfU8c_npMTblDIGDhs', { polling: true });

const commands = ['price,help'];

bot.on('message', msg => { 

    if (!isCommand(msg) || !commands.includes(msg)) {
        bot.sendMessage(msg.chat.id, 'Для вывода обрабатываемых команд, введи /help')
    }
});


bot.onText(/\/price (.+)/ , (msg, match) => {       

    console.log(match[1])

    pleerParser.getPrices(match[1]).catch(e => {
        bot.sendMessage(msg.chat.id, 'Что-то разъебалось');
    }).then(message => {
        if (message) {
            bot.sendMessage(msg.chat.id, message);
        }
    })
});
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Показываю актуальные цены с сайта https://www.pleer.ru/ \nКомманды: \n /price "НОМЕР МОДЕЛИ"');
});


bot.on("polling_error", console.log);

function isCommand(msg) {
    return msg.text.indexOf("/") == 0;
}
function getCommandArg(text, command) {
    return text.split(command)[1].replace(/\s/g, "");
}
//# sourceMappingURL=bot.js.map