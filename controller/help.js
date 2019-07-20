const bot = require('../connect');

module.exports =
    bot.onText(/\/help/, function (msg, match){
    bot.sendMessage(msg.chat.id, `/create <date>^<text>`);
    bot.sendMessage(msg.chat.id, `/all `);
    bot.sendMessage(msg.chat.id, `/delete <id> `);
});