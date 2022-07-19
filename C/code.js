const Discord = require('discord.js');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  let embed = new Discord.MessageEmbed()
    .setAuthor({ name: 'CÓDIGO-FONTE', iconURL: client.user.avatarURL() })
    .setColor('AQUA')
    .addFields([
      {
        name: `Você quer saber como eu funciono? \nDê uma olhada no meu código fonte então.`,
        value: `Github: [LINK](https://github.com/Lunixyz/CSStats)`,
      },
    ])
    .setColor('WHITE');

  message.reply({ embeds: [embed] });
};
