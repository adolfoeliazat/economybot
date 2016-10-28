const Discord = require('discord.js');
const client = new Discord.Client();

const Database = require('./db.js');

var db = new Database(__dirname + '/db.json');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (!message.author.bot) {
    if (message.content === '$coins') {
      message.reply("You have " + db.hgetValue(message.author.id, "cash"));
      return;
    }
    if (!db.hexists(message.author.id))
      db.hsetValue(message.author.id, "cash", 0);
    if (parseInt(db.hgetValue(message.author.id, "check")) > Date.now())
      return
    db.hincrBy(message.author.id, "cash", randomInt(1,5));
    db.hsetValue(message.author.id, "check", Date.now() + 60000);
  }
});

client.login('MjIzMDQyOTM0NjA0MzAwMjg5.Cu07bA.cXifbK9X3Y8OWa1tn8suwlOLosI');