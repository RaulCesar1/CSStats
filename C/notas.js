const { MessageEmbed } = require('discord.js');
require('dotenv').config();

const aid = '11';

exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
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

  let embed = new MessageEmbed()
    .setColor('YELLOW')
    .setAuthor({ name: 'Notas de Atualização', iconURL: client.user.avatarURL })
    .addFields([
      {
        name: `Versão ${nota.version} (${nota.data})`,
        value: nota.desc,
      },
    ])
    .setFooter(
      `Página ${nota.id} | Caso queira olhar outras notas de atualizações, use: ${prefix}notas <1-${aid}>`
    );

  message.reply({ embeds: [embed] });
};
