const Discord = require('discord.js');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  if (!args[0]) {
    return message.reply('utilize `csgo>reportar <bug/sugestão>`');
  }
  let argumentos = args.join(' ');

  try {
    client.channels.get('992172780848156763').send(
      `bug/sugestão enviada: ${argumentos} pelo usuário ${message.author.username}`
    );
    message.reply(
      'Obrigado(a)! Pessoas como você ajudam no meu desenvolvimento! (por favor não abuse deste comando)'
    );
    message.delete();
  } catch (e) {
    console.log(e);
  }
};
