
const bot = require('../connect');
module.exports =
    bot.onText(/\/start/,function (msg, match){
    bot.sendMessage(msg.chat.id, msg.from.first_name + ' ' + msg.from.last_name + ' '+ 'hello')
    bot.sendMessage(msg.chat.id, 'Write /help')
});