"use strict";

const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();


const pleerParser = require("./pleerparser/pleerparser");
// const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

// bot.setWebHook(`${process.env.HEROKU}/${process.env.BOT_TOKEN}`);

const bot = new TelegramBot(process.env.BOT_TOKEN);
// const bot = TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.setWebHook(`${process.env.HEROKU}/bo`);
// bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null);
// if (process.env.NODE_ENV === 'production') {
//     bot = new TelegramBot(token);
//     bot.setWebHook(`${process.env.HEROKU}/${process.env.BOT_TOKEN}`);
// } else {
//     bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
// }

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