const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  var req = await axios
    .get(
      `https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${process.env.KEY}`
    )
    .catch(function (error) {
      message.reply(
        'não consigo acessar a WebAPI no momento, tente novamente mais tarde.'
      );
    });

  const embed = new Discord.MessageEmbed()
    .setAuthor({ name: '⚠️ Steam CSGO Status ⚠️' }) //SURGE - NORMAL
    .setDescription(
      `Sessão de Logon **${req.data.result.services.SessionsLogon}**\n Comunidade (CSGO) **${req.data.result.services.SteamCommunity}**\nMatchmaker ** ${req.data.result.matchmaking.scheduler} **\n *tempo de espera ~${req.data.result.matchmaking.search_seconds_avg}s*`
    );
  message.reply({ embeds: [embed] });
};
