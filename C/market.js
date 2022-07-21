const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  let str = args.slice(0).join(' ');
  try {
    if (!args[0]) {
      return message.reply(
        'Utilize `csgo>market <nome da skin/adesivo/agente>'
      );
    }
    //https://steamcommunity.com/market/priceoverview/?appid=730&market_hash_name=StatTrak™ Nova %7C Wood Fired %28Well-Worn%29&currency=7
    const req = await axios.get(
      `https://steamcommunity.com/market/search/render/?&appid=730&query=${str.replace(
        ' ',
        '%20'
      )}&start=0&currency=7&count=5&norender=1`
    );
    var ar = [];
    var id = message.author.id;
    var pages = {};

    pages[id] = pages[id] || 0;
    for (let a = 0; a < req.data.results.length; a++) {
      ar.push(
        req.data.results[a].name,
        req.data.results[a].sell_listings,
        req.data.results[a].sell_price_text,
        req.data.results[a].sale_price_text,
        req.data.results[a].asset_description.icon_url
      );
    }
    function embed_c(
      NOME,
      LISTA_VENDAS,
      VENDA_PRECO,
      VENDA_PRECO_MEDIO,
      ICONE
    ) {
      let embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor({ name: `${NOME}` })
        .addFields(
          {
            name: `\`💲 Preço~\``,
            value: `> **${VENDA_PRECO}**`,
            inline: true,
          },
          {
            name: `\`💲〽️ Preço Mínimo~\``,
            value: `> **${VENDA_PRECO_MEDIO}**`,
            inline: true,
          },
          {
            name: `\`📦 Produtos listados~\``,
            value: `> **${LISTA_VENDAS} Item(s)**`,
            inline: true,
          }
        )
        .setThumbnail(
          'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/730/69f7ebe2735c366c65c0b33dae00e12dc40edbe4.jpg'
        )
        .setImage(
          `https://steamcommunity-a.akamaihd.net/economy/image/${ICONE}`
        );
      return embed;
    }
    var embeds = [
      embed_c(
        ar[0],
        ar[ar.length - 24],
        ar[ar.length - 23],
        ar[ar.length - 22],
        ar[ar.length - 21]
      ),
      embed_c(
        ar[5],
        ar[ar.length - 19],
        ar[ar.length - 18],
        ar[ar.length - 17],
        ar[ar.length - 16]
      ),
      embed_c(
        ar[10],
        ar[ar.length - 14],
        ar[ar.length - 13],
        ar[ar.length - 12],
        ar[ar.length - 11]
      ),
      embed_c(
        ar[15],
        ar[ar.length - 9],
        ar[ar.length - 8],
        ar[ar.length - 7],
        ar[ar.length - 6]
      ),
      embed_c(
        ar[20],
        ar[ar.length - 4],
        ar[ar.length - 3],
        ar[ar.length - 2],
        ar[ar.length - 1]
      ),
    ];
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
