const Discord = require(`discord.js`);
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  const embed = new Discord.MessageEmbed()
    .setAuthor({ name: `COMANDOS`, iconURL: client.user.avatarURL() })
    .setColor('AQUA')
    .addFields([
      {
        name: `${prefix}geral`,
        value: `Mostra o status geral dos servidores do CS:GO`,
        inline: true,
      },
      {
        name: `${prefix}status`,
        value: `Mostra o status dos servidores da Steam`,
        inline: true,
      },
      {
        name: `${prefix}datacenters`,
        value: `Mostra o status dos datacenters`,
        inline: true,
      },
      {
        name: `${prefix}sobre`,
        value: `Mostra o sobre mim do bot`,
        inline: true,
      },
      {
        name: `${prefix}notas`,
        value: `Mostra as notas de atualização do bot`,
        inline: true,
      },
      {
        name: `csgo caiu (ou cs caiu)`,
        value: `Resposta rápida sobre o servidor do Brasil`,
        inline: true,
      },
      {
        name: `${prefix}report`,
        value: `Reportar bugs ou enviar sugestões`,
        inline: true,
      },
      {
        name: `${prefix}devs`,
        value: `Mostra se algum desenvolvedor do CSGO e o criador do bot está online`,
        inline: true,
      },
      {
        name: `${prefix}perfil`,
        value: `Mostra o perfil de um usuário Steam`,
        inline: true,
      },
      {
        name: `${prefix}code`,
        value: `Mostra link do código fonte do bot`,
        inline: true,
      },
    ]);
  message.reply({ embeds: [embed] });
};
