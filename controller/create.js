const bot = require('../connect');
const pool = require('../DB/pool');
module.exports =
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
