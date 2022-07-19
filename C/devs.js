const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  const member = await message.guild.members.fetch({
    user: '434360273726341160',
    withPresences: true,
    force: true,
  });
  var req = await axios.get(
    `http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=710&key=${process.env.KEY}`
  );
  var status;
  switch (member.presence.status) {
    case 'online':
      status = 'online';
      break;
    case 'idle':
      status = 'inativo';
      break;
    case 'dnd':
      status = 'ocupado';
      break;
    default:
      status = 'offline';
      break;
  }
  const embed = new Discord.MessageEmbed()
    .setAuthor({ name: 'DESENVOLVEDORES', iconURL: client.user.avatarURL })
    .addFields([
      {
        name: 'Desenvolvedores do CSGO:',
        value:
          req.data.response.player_count > 0
            ? `\`${req.data.response.player_count}\` desenvolvedor(es) online.`
            : 'Nenhum desenvolvedor online.',
      },
    ])
    .addFields([
      {
        name: 'Desenvolvedor do bot:',
        value: `Lunx está ${status} `,
      },
    ]);
  message.reply({ embeds: [embed] });
  console.log(member.presence);
};
