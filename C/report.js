const Discord = require('discord.js')
exports.run = async (client, message, args, config) => {

  if (!args[0]) {
    return message.reply('utilize `csgo>reportar <bug/sugestão>`')
  }
  let argumentos = args.join(' ');

  try {
    let id = message.id
    client.channels.get('994040224160161932')
      .send(
        'O usuário ' + message.author.username + ' **reportou um bug/sugestão** ' + '\n ID da mensagem: ' + id
      )
    client.channels.get('992172780848156763')
      .send('bug/sugestão enviada: **' + argumentos + '** pelo usuário `' + message.author.username + '`')
    message.reply('Obrigado(a)! Pessoas como você ajudam no meu desenvolvimento! (por favor não abuse deste comando)')
    message.delete()

  } catch (e) {
    console.log(e)
  }
}