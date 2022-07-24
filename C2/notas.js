const { MessageEmbed } = require('discord.js');
require('dotenv').config();

const aid = '14';

const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  data: new SlashCommandBuilder()
      .setName('notas')
      .setDescription('mostra as notas de atualização')
      .addIntegerOption(option => 
        option.setName('nmr')
        .setDescription(`Escolha a página utilizando um número de 1 - ${aid}`)
        .setRequired(true)),
  async execute(interaction, client) {
  let notas = require('./notas/notas.json');
  const numero = interaction.options.getInteger('nmr');
  console.log(numero)
  var id;
  if (!numero) {
    id = `${aid}`; //aid = id da última nota de atualização (./notas.json)
  } else {
    var id = parseInt(numero, 10)
    if (
      id <= 0 ||
      id > parseInt(aid, 10) ||
      !id ||
      id === 'undefined' ||
      id === 'null'
    )
      return interaction.reply('ID não encontrado!');
  }
  let nota = notas.ids.find((it) => it.id === numero.toString());
  console.log(nota)

  let embed = new MessageEmbed()
    .setColor('YELLOW')
    .setAuthor({ name: 'Notas de Atualização', iconURL: client.user.avatarURL })
    .addFields([
      {
        name: `Versão ${nota.version} (${nota.data})`,
        value: nota.desc,
      },
    ])
    .setFooter({
      text: `Página ${nota.id} | Caso queira olhar outras notas de atualizações, use: /notas <1-${aid}>`
  });

  interaction.reply({ embeds: [embed], ephemeral: true });
}
}
