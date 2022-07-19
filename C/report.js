const Discord = require('discord.js');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  if (!args[0]) {
    return message.reply('utilize `csgo>reportar <bug/sugestão>`');
  }
  let argumentos = args.join(' ');

  try {
    message.reply(
      'Obrigado(a)! Pessoas como você ajudam no meu desenvolvimento.'
    );
    client.channels.cache
      .get('992172780848156763')
      .send(
        `bug/sugestão enviada: \n**${argumentos}**\n pelo usuário ${message.author.username}`
      );
  } catch (e) {
    console.log(e);
  }
};
