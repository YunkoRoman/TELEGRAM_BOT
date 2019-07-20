const bot = require('../connect');
const pool = require('../DB/pool');

module.exports =
bot.onText(/\/delete(.+)/, async function (msg, match){
    await  pool.query(`DELETE FROM chat WHERE id = ${match[1]}`);
    bot.sendMessage(msg.chat.id, 'Removed')
});