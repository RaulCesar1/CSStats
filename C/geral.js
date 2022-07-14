const Discord = require('discord.js')
const axios = require('axios')
exports.run = async (client, message, args, config) => {

  var req = await axios.get(`https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${config.key}`)


  const embed = new Discord.RichEmbed()
    .setAuthor('⚠️ Steam CSGO Status ⚠️') //SURGE - NORMAL
    .setDescription(`Sessão de Logon **${req.data.result.services.SessionsLogon}**\n Comunidade **${req.data.result.services.SteamCommunity}**\nMatchmaker ** ${req.data.result.matchmaking.scheduler} **\n *tempo de espera ~${req.data.result.matchmaking.search_seconds_avg}s*`)
  message.channel.send(embed)
    .then(MR => {
      var ping = MR.createdTimestamp - message.createdTimestamp
      console.log(ping)
      if (ping >= 1000) {
        message.channel.send('> *Hm... Meu ping parece estar elevado... Algumas coisas podem demorar para acontecer....*')
      }
    })

}, error => {
  message.reply('não consigo acessar a WebAPI no momento, desculpe! (isso significa que a API caiu!)')
}