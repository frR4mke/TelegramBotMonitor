"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
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
const telegraf_1 = require("telegraf");
const pleerParser = __importStar(require("../TG/pleerparser/pleerparser"));
const bot = new telegraf_1.Telegraf('2034784132:AAGMPPO1rciFpIZC9dfU8c_npMTblDIGDhs');
bot.command('price', (ctx) => {
    pleerParser.getPrices().catch(e => {
        console.log(e);
    }).then(message => {
        if (message) {
            ctx.reply(message);
        }
    });
});
bot.help((ctx) => ctx.reply('Показываю актуальные цены с сайта https://www.pleer.ru/ \nКомманды: \n /price - цены на iphone 12'));
bot.on('text', ctx => ctx.reply('Для вывода обрабатываемых команд, введите /help'));
bot.launch();
function getCommandArg(text, command) {
    return text.split(command)[1].replace(/\s/g, "");
}
//# sourceMappingURL=bot.js.map