const bot = require('../connect');
const pool = require('../DB/pool');
module.exports =

bot.onText(/\/all/, async function (msg, match){
    await pool.query(`SELECT * FROM chat WHERE authorId = ${msg.from.id} AND checked = ${false}`, (err, result) =>{
       for (const match of result) {
           console.log(match.date);
           bot.sendMessage(msg.from.id,`Id Нагадування: ${match.id};  Текст: ${match.text};
            Дата виконання: ${match.date.toLocaleString()}.`)
   }})
});