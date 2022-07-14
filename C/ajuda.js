const Discord = require('discord.js')
exports.run = async (client, message, args, config) => {
  const embed = new Discord.RichEmbed()
    .setAuthor('COMANDOS', client.user.avatarURL)
    .addField('csgo>geral', 'Mostra o status de outros servidores', true)
    .addField('csgo>status', 'Mostra o status dos datacenters', true)
    .addField('csgo caiu', 'Resposta rápida sobre o servidor do Brasil', true)
    .addField('csgo>sobre', 'Mostra o sobre mim do bot', true)
    .addField('csgo>notas', 'Mostra as notas de atualização do bot', true)
    .addField('csgo>report', 'Comando para reportar bugs ou enviar sugestões', true)
    .addField('csgo>devs', "Mostra se algum desenvolvedor do CSGO e o desenvolvedor está online", true)
    .addField('csgo>perfil', "Mostra o perfil de um usuário", true)
    .addField('csgo>code', 'Mostra o código fonte do bot')
  message.reply(embed)
    .then(MR => {
      var ping = MR.createdTimestamp - message.createdTimestamp
      console.log(ping)
      if (ping >= 1000) {
        message.channel.send('> *Hm... Meu ping parece estar elevado... Algumas coisas podem demorar para acontecer....*')
      }
    })
}