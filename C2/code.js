const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
require('dotenv').config();
module.exports = {
  data: new SlashCommandBuilder()
      .setName('code')
      .setDescription('Mostra o código do BOT'),
  async execute(interaction, client) {
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

  interaction.reply({ embeds: [embed], ephemeral: true });
},
};