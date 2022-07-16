const { RichEmbed } = require('discord.js');
require('dotenv').config();

const aid = '10';

exports.run = async (client, message, args, prefix) => {
  let notas = require('./notas/notas.json');

  var id;

  if (!args[0]) {
    id = `${aid}`; //aid = id da última nota de atualização (./notas.json)
  } else {
    var id = parseInt(args[0], 10);
    if (
      id <= 0 ||
      id > parseInt(aid, 10) ||
      !id ||
      id === 'undefined' ||
      id === 'null'
    )
      return message.reply('ID não encontrado!');
    var id = args[0];
  }

  let nota = notas.ids.find((it) => it.id === id);

  let embed = new RichEmbed()
    .setColor('YELLOW')
    .setAuthor('Notas de Atualização', client.user.avatarURL)
    .addField(`Versão ${nota.version} (${nota.data})`, `${nota.desc}`)
    .setFooter(
      `ID${nota.id}|Caso queira olhar outras notas de atualizações, use: ${prefix}notas <1-${aid}>`
    );

  message.reply(embed);
};
