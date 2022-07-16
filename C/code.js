const Discord = require('discord.js');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  let embed = new Discord.RichEmbed()
    .setAuthor('CÓDIGO-FONTE', client.user.avatarURL)
    .addField(
      `Você quer saber como eu funciono? \nDê uma olhada no meu código fonte então.`,
      `Github: [LINK](https://github.com/Lunixyz/CSStats)`
    )
    .setColor('WHITE');

  message.reply(embed);
};
