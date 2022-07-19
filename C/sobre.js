const Discord = require('discord.js');
const package = require('../package.json');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  try {
    const embed1 = new Discord.MessageEmbed()
      .setAuthor({ name: 'Sobre mim', iconURL: client.user.avatarURL })
      .setColor('AQUA')
      .addFields([
        {
          name: 'Criado por:',
          value: 'Lunx *(amigo do Luar)*',
          inline: true,
        },
        {
          name: 'Versão do bot:',
          value: 'RELEASE 1.2.0',
          inline: true,
        },
        {
          name: 'Sobre o bot:',
          value: `discord.js ${
            package.dependencies['discord.js']
          }\naxios ${package.dependencies['axios'].substring(1)}`,
          inline: true,
        },
        {
          name: 'Contato do Desenvolvedor',
          value:
            'Discord: lunx 月#6699\nTwitter: [@akaLunx](https://twitter.com/akaLunx)\nSteam: [/id/Lunixyz](https://steamcommunity.com/id/Lunixyz/)',
        },
      ]);

    const embed2 = new Discord.MessageEmbed()
      .setAuthor('Sobre o Desenvolvedor', client.user.avatarURL)
      .setDescription('Olá, desde já, obrigado por utilizar meu bot!')
      .addFields([
        {
          name: 'Propósito do bot?',
          value:
            'Originalmente criei esse BOT com a ideia de ajudar quem não curte sair do conforto do Discord para checar o steamstat.us\n(a ideia não é de forma alguma diminuir o acesso ao steamstat.us, mas sim facilitar acesso ao status dos servidores.)',
        },
        {
          name: 'Quem sou eu?',
          value:
            'Eu sou um garoto homosexual Brasileiro que sempre está indo atrás de conhecimento e respostas.',
        },
      ]);
    const embeds = [embed1, embed2];
    const id = message.author.id;
    const pages = {};

    pages[id] = pages[id] || 0;
    const embed = embeds[pages[id]];
    const user = message.author;

    const filter = (message) => message.user.id === user.id;
    const time = 1000 * 60 * 5;
    const getRow = (id) => {
      const row = new Discord.MessageActionRow();
      row.addComponents(
        new Discord.MessageButton()
          .setCustomId('ret_b')
          .setStyle('SECONDARY')
          .setEmoji('◀️')
          .setDisabled(pages[id] === 0)
      );
      row.addComponents(
        new Discord.MessageButton()
          .setCustomId('pro_b')
          .setStyle('SECONDARY')
          .setEmoji('▶️')
          .setDisabled(pages[id] === embeds.length - 1)
      );
      return row;
    };
    reply = await message.reply({
      embeds: [embed],
      components: [getRow(id)],
    });
    collector = reply.createMessageComponentCollector({ filter, time });
    collector.on('collect', (botao) => {
      if (!botao) {
        return;
      }
      botao.deferUpdate();
      if (botao.customId !== 'ret_b' && botao.customId !== 'pro_b') {
        return;
      }
      if (botao.customId == 'ret_b' && pages[id] > 0) {
        --pages[id];
      } else if (botao.customId === 'pro_b' && pages[id] < embeds.length - 1) {
        ++pages[id];
      }
      if (reply) {
        reply.edit({
          embeds: [embeds[pages[id]]],
          components: [getRow(id)],
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
