const Discord = require('discord.js');
const axios = require('axios');
const dc = require('./datacenters/datacenters.json');
const base = dc.base;
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  try {
    var req = await axios.get(
      `https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${process.env.KEY}`
    );
    var dc = req.data.result.datacenters;

    function te(lugar) {
      //tradução do ESTADO
      let estados = dc[lugar].load;
      var traduz;

      switch (estados) {
        case 'low':
          traduz = '`pouco tráfego`';
          break;
        case 'medium':
          traduz = '`tráfego médio`';
          break;
        case 'high':
          traduz = '`muito tráfego`';
          break;
        case 'idle':
          traduz = '`inativo`';
          break;
        default:
          traduz = estados;
          break;
      }
      return traduz;
    }

    function tc(lugar) {
      //tradução da CAPACIDADE
      let estados = dc[lugar].capacity;
      var traduz;

      switch (estados) {
        case 'full':
          traduz = '`total`';
          break;
        case 'medium':
          traduz = '`quase total`';
          break;
        case 'low':
          traduz = '`quase vazio`';
          break;
        default:
          traduz = estados;
          break;
      }
      return traduz;
    }
    let p0 = new Discord.MessageEmbed()
      .setColor(base.color)
      .setDescription('Utilize os botões abaixo para navegar');
    let p1 = new Discord.MessageEmbed().setColor(base.color).addFields([
      {
        name: '🇵🇪 Peru',
        value: `CAPACIDADE:  ${tc('Peru')} \nESTADO:  ${te('Peru')}`,
        inline: true,
      },
      {
        name: '🇪🇺 Oeste Europeu',
        value: `CAPACIDADE ${tc('EU West')}\nESTADO: ${te('EU West')}`,
        inline: true,
      },
      {
        name: '🇪🇺 Leste Europeu',
        value: `CAPACIDADE ${tc('EU East')}\nESTADO ${te('EU East')}`,
        inline: true,
      },
      {
        name: '🇵🇱 Polônia',
        value: `CAPACIDADE ${tc('Poland')}\nESTADO ${te('Poland')}`,
        inline: true,
      },
      {
        name: '🇮🇳 Leste Indiano',
        value: `CAPACIDADE ${tc('India East')}\nESTADO ${te('India East')}`,
        inline: true,
      },
      {
        name: '🇭🇰 Hong Kong',
        value: `'CAPACIDADE: ${tc('Hong Kong')}\nESTADO: ${te('Hong Kong')}`,
        inline: true,
      },
    ]);
    let p2 = new Discord.MessageEmbed().setColor(base.color).addFields([
      {
        name: '🇪🇸 Espanha',
        value: `CAPACIDADE: ${tc('Spain')}\nESTADO: ${te('Spain')}`,
        inline: true,
      },
      {
        name: '🇨🇱 Chile',
        value: `CAPACIDADE: ${tc('Chile')}\nESTADO: ${te('Chile')}`,
        inline: true,
      },
      {
        name: '🇺🇸 Sudoeste dos EUA',
        value: `CAPACIDADE: ${tc('US Southwest')}\nESTADO: ${te(
          'US Southwest'
        )}`,
        inline: true,
      },
      {
        name: '🇺🇸 Sudeste dos EUA',
        value: `CAPACIDADE: ${tc('US Southeast')}\nESTADO: ${te(
          'US Southeast'
        )}`,
        inline: true,
      },
      {
        name: '🇪🇺 Norte Europeu',
        value: `CAPACIDADE: ${tc('EU North')}\nESTADO: ${te('EU North')}`,
        inline: true,
      },
    ]);
    let p3 = new Discord.MessageEmbed().setColor(base.color).addFields([
      {
        name: '🇦🇪 Emirados Árabes',
        value: `CAPACIDADE: ${tc('Emirates')}\nESTADO: ${te('Emirates')}`,
        inline: true,
      },
      {
        name: '🇺🇸 Noroeste dos EUA',
        value: `CAPACIDADE: ${tc('US Northwest')}\nESTADO: ${te(
          'US Northwest'
        )}`,
        inline: true,
      },
      {
        name: '🇿🇦 África do Sul',
        value: `CAPACIDADE: ${tc('South Africa')}\nESTADO: ${te(
          'South Africa'
        )}`,
        inline: true,
      },
      {
        name: '🇧🇷 Brasil',
        value: `CAPACIDADE: ${tc('Brazil')}\nESTADO: ${te('Brazil')}`,
        inline: true,
      },
      {
        name: '🇺🇸 Nordeste dos EUA',
        value: `CAPACIDADE: ${tc('US Northeast')}\nESTADO: ${te(
          'US Northeast'
        )}`,
        inline: true,
      },
      {
        name: '🇯🇵 Japão',
        value: `CAPACIDADE: ${tc('Japan')}\nESTADO: ${te('Japan')}`,
        inline: true,
      },
    ]);
    let p4 = new Discord.MessageEmbed().setColor(base.color).addFields([
      {
        name: '🇦🇷 Argentina',
        value: `CAPACIDADE: ${tc('Argentina')}\nESTADO: ${te('Argentina')}`,
        inline: true,
      },
      {
        name: '🇰🇷 Coréia do Sul',
        value: `CAPACIDADE: ${tc('South Korea')}\nESTADO: ${te('South Korea')}`,
        inline: true,
      },
      {
        name: '🇸🇬 Singapura',
        value: `${te('Singapore')}\nESTADO: ${te('Singapore')}`,
        inline: true,
      },
      {
        name: '🇦🇺 Austrália',
        value: `CAPACIDADE: ${tc('Australia')}\nESTADO: ${te('Australia')}`,
        inline: true,
      },
      {
        name: '🇨🇳 Shanghai',
        value: `CAPACIDADE: ${tc('China Shanghai')}\nESTADO: ${te(
          'China Shanghai'
        )}`,
        inline: true,
      },
      {
        name: '🇨🇳 Tianjin',
        value: `CAPACIDADE: ${tc('China Tianjin')}\nESTADO: ${te(
          'China Tianjin'
        )}`,
        inline: true,
      },
      {
        name: '🇨🇳 Guangzhou',
        value: `CAPACIDADE: ${tc('China Guangzhou')}\nESTADO: ${te(
          'China Guangzhou'
        )}`,
        inline: true,
      },
    ]);

    const embeds = [p0, p1, p2, p3];
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
