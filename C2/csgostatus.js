const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  data: new SlashCommandBuilder()
      .setName('csgostatus')
      .setDescription('mostra o estado geral dos serviços do CS:GO'),
  async execute(interaction, client) {
    var req = await axios
      .get(
        `https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${process.env.KEY}`
      )
      .catch(function (error) {
        interaction.reply(
          'não consigo acessar a WebAPI no momento, tente novamente mais tarde.'
        );
      });
  
    const embed = new Discord.MessageEmbed()
      .setAuthor({ name: 'Serviços CSGO ⚠️' }) //SURGE - NORMAL
      .setDescription(
        `Sessão de Logon **${req.data.result.services.SessionsLogon}**\n Comunidade **${req.data.result.services.SteamCommunity}**\nMatchmaker ** ${req.data.result.matchmaking.scheduler} **\n *tempo de espera ~${req.data.result.matchmaking.search_seconds_avg}s*`
      );
    interaction.reply({ embeds: [embed], ephemeral: true });

  },
};

