const bot = require('../connect');
const pool = require('../DB/pool');

module.exports = setInterval(async function () {
    // const date = new Date();
    // console.log(date);
    await pool.query(`SELECT * FROM chat WHERE checked = ${false} AND date <= CURRENT_TIMESTAMP() `, (err, result) =>{
        for (const res of result) {
            bot.sendMessage(res.chatId,`id нагадування: ${res.id}; Текст нагадуваня: ${res.text}` );
            bot.sendMessage(res.chatId, '/done');
            bot.sendMessage(res.chatId, ' Якщо ви хочете відтерінувати дане нагадування то введіть: /postpone <id нагадування>^<date>');

            bot.onText(/\/done/, function (msg, match) {
                pool.query(`UPDATE chat SET checked = true  WHERE id = ${res.id}`)
            } )
        }
    })
}, 10000);