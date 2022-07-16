const Discord = require('discord.js')
const axios = require('axios')
exports.run = async (client, message, args, prefix, dotenv) => {
  let user = client.users.find(u => u.tag === 'lunx#6699')
  var req = await axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v0001/?appid=710&key=${process.env.KEY}`)
  var status
  switch (user.presence.status) {
    case 'online':
      status = 'online'
      break;
    case 'idle':
      status = 'inativo'
      break;
    case 'dnd':
      status = 'não perturbe'
      break;
    default:
      status = 'offline'
      break;
  }
  const embed = new Discord.RichEmbed()
    .setAuthor('DESENVOLVEDORES', client.user.avatarURL)
    .addField('Desenvolvedores do CSGO:',
      req.data.response.player_count > 0 ? `\`${req.data.response.player_count}\` desenvolvedor(es) online.` : 'Nenhum desenvolvedor online.')
    .addField(
      'Desenvolvedor do bot:',
      'Lunx está `' + status + '`'
    )
  message.reply(embed)
  console.log(user.presence)

}