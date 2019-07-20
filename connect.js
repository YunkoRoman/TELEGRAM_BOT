const TeleramBot = require('node-telegram-bot-api');
const token = require('./token');

module.exports  =  new TeleramBot(token, {polling: true});