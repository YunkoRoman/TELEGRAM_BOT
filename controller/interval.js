const bot = require('../connect');
const pool = require('../DB/pool');

module.exports = setInterval(async function () {
    // const date = new Date();
    // console.log(date);
    await pool.query(`SELECT * FROM chat WHERE checked = ${false} AND date <= CURRENT_TIMESTAMP() `, (err, result) =>{
        for (const res of result) {
            bot.sendMessage(res.chatId, res.text)
        pool.query(`UPDATE chat SET checked = true  WHERE id = ${res.id}`)}
    })
}, 5000);