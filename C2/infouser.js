const { MessageEmbed } = require('discord.js');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
module.exports = {
  data: new ContextMenuCommandBuilder().setName('Informações').setType(2),
  async execute(interaction, client) {
    try {
      const target = await interaction.guild.members.fetch(
        interaction.targetId
      );

      const embed = new MessageEmbed()
        .setAuthor({
          name: target.user.tag,
          iconURL: target.user.avatarURL({ dynamic: true, size: 512 }),
        })
        .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
        .addFields(
          {
            name: 'ID',
            value: `${target.user.id}`,
            inline: true,
          },
          {
            name: 'Membro desde',
            value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
            inline: true,
          },
          {
            name: 'Membro do Discord desde',
            value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`,
            inline: true,
          },
          {
            name: 'Cargos',
            value: `${
              target.roles.cache
                .map((r) => r)
                .join('\n')
                .replace('@everyone', ' ') || 'Nenhum'
            }`,
            inline: true,
          }
        );
      interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (e) {
      interaction.reply({
        content:
          'Se você se chama Luar, por favor, pare. Caso contrário, isso é um erro.',
      });
    }
  },
};
