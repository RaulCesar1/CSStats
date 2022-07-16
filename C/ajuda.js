const Discord = require(`discord.js`)
exports.run = async (client, message, args, prefix, dotenv) => {
  const embed = new Discord.RichEmbed()
    .setAuthor(`COMANDOS`, client.user.avatarURL)
    .addField(`${prefix}geral`, `Mostra o status de outros servidores`, true)
    .addField(`${prefix}status`, `Mostra o status dos datacenters`, true)
    .addField(`csgo caiu`, `Resposta rápida sobre o servidor do Brasil`, true)
    .addField(`${prefix}sobre`, `Mostra o sobre mim do bot`, true)
    .addField(`${prefix}notas`, `Mostra as notas de atualização do bot`, true)
    .addField(`${prefix}report`, `Comando para reportar bugs ou enviar sugestões`, true)
    .addField(`${prefix}devs`, "Mostra se algum desenvolvedor do CSGO e o desenvolvedor está online", true)
    .addField(`${prefix}perfil`, "Mostra o perfil de um usuário", true)
    .addField(`${prefix}code`, `Mostra o código fonte do bot`)
  message.reply(embed)
    .then(MR => {
      var ping = MR.createdTimestamp - message.createdTimestamp
      console.log(ping)
      if (ping >= 1000) {
        message.channel.send(`> *Hm... Meu ping parece estar elevado... Algumas coisas podem demorar para acontecer....*`)
      }
    })
}