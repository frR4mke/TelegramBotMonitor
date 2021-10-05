"use strict";
require('dotenv').config();
const TelegramBot = require("node-telegram-bot-api");
const commands = ['price,help'];
const pleerParser = require("./pleerparser/pleerparser");


const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// const bot = new TelegramBot(process.env.BOT_TOKEN);
// bot.setWebHook(`${process.env.HEROKU}/${process.env.BOT_TOKEN}`);


bot.on('message', msg => {    

    console.log(msg.text)

    if (!isCommand(msg)) {
        bot.sendMessage(msg.chat.id, 'Для вывода обрабатываемых команд, введи /help')
    }
});


bot.onText(/\/price (.+)/ , (msg, match) => {         

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
