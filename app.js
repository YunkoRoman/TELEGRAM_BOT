const TeleramBot = require('node-telegram-bot-api');
const pool = require('./DB/pool');
const mysql = require('mysql');
const token = require('./token');
const request = require('request');

const bot = new TeleramBot(token, {polling: true});


bot.onText(/\/start/, function (msg, match){
    bot.sendMessage(msg.chat.id, msg.from.first_name + ' ' + msg.from.last_name + ' '+ 'hello')
    bot.sendMessage(msg.chat.id, 'Write /help')
});
bot.onText(/\/help/, function (msg, match){
    bot.sendMessage(msg.chat.id, `/create <date>^<text>`);
    bot.sendMessage(msg.chat.id, `/all `);
    bot.sendMessage(msg.chat.id, `/delete <id> `);
});
bot.onText(/\/create(.+)/, async function (msg, match){

    const authorId = msg.from.id;
   const chatId = msg.chat.id;
   const fullText = match[1].split('^');
   const date = new Date(fullText[0]);
    console.log(date);
    const text = fullText[1];
   const data = {
     text,
     date,
     authorId,
     chatId,
     checked:false
   };

        await pool.query('INSERT INTO chat SET ?',data, (err, result) =>{
                console.log(result);
            }
        );
    bot.sendMessage(chatId, 'Pib created')

});

bot.onText(/\/all/, async function (msg, match){
    await pool.query(`SELECT * FROM chat WHERE authorId = ${msg.from.id} AND checked = ${false}`, (err, result) =>{
       for (const match of result) {
           console.log(match.date);
           bot.sendMessage(msg.from.id,`Id Нагадування: ${match.id};  Текст: ${match.text}; 
            Дата виконання: ${match.date.toLocaleString()}.`)
   }})
});

bot.onText(/\/delete(.+)/, async function (msg, match){
    await  pool.query(`DELETE FROM chat WHERE id = ${match[1]}`);
    bot.sendMessage(msg.chat.id, 'Removed')
});

setInterval(async function () {
    // const date = new Date();
    // console.log(date);
    await pool.query(`SELECT * FROM chat WHERE checked = ${false} AND date <= CURRENT_TIMESTAMP() `, (err, result) =>{
        for (const res of result) {
            bot.sendMessage(res.chatId, res.text)
        pool.query(`UPDATE chat SET checked = true  WHERE id = ${res.id}`)}
    })
}, 5000);