const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
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

    const svr0 = new Discord.RichEmbed()
      .setAuthor('CSGO Servidores Status ⚠️', client.user.avatarURL)
      .setDescription(
        'Utiize os emojis abaixo para navegar pelas páginas.',
        true
      )
      .setColor('#8607ed');

    const svr1 = new Discord.RichEmbed()
      .setColor('#8607ed')
      .addField(
        `🇵🇪 Peru`,
        ` \nCAPACIDADE:  ${tc('Peru')} \nESTADO:  ${te('Peru')}`,
        true
      )
      .addField(
        '🇪🇺 Oeste Europeu',
        'CAPACIDADE: ' + tc('EU West') + '\nESTADO: ' + te('EU West'),
        true
      )
      .addField(
        '🇪🇺 Leste Europeu',
        'CAPACIDADE: ' + tc('EU East') + '\nESTADO: ' + te('EU East'),
        true
      )
      .addField(
        '🇵🇱 Polônia',
        'CAPACIDADE: ' + tc('Poland') + '\nESTADO: ' + te('Poland'),
        true
      )
      .addField(
        '🇮🇳 Leste Indiano',
        'CAPACIDADE: ' + tc('India East') + '\nESTADO: ' + te('India East'),
        true
      )
      .addField(
        '🇭🇰 Hong Kong',
        'CAPACIDADE: ' + tc('Hong Kong') + '\nESTADO: ' + te('Hong Kong'),
        true
      );
    //
    const svr2 = new Discord.RichEmbed()
      .setColor('#8607ed')
      .addField(
        '🇪🇸 Espanha',
        'CAPACIDADE: ' + tc('Spain') + '\nESTADO: ' + te('Spain'),
        true
      )
      .addField(
        '🇨🇱 Chile',
        'CAPACIDADE: ' + tc('Chile') + '\nESTADO: ' + te('Chile'),
        true
      )
      .addField(
        '🇺🇸 Sudoeste dos EUA',
        'CAPACIDADE: ' + tc('US Southwest') + '\nESTADO: ' + te('US Southwest'),
        true
      )
      .addField(
        '🇺🇸 Sudeste dos EUA',
        'CAPACIDADE: ' + tc('US Southeast') + '\nESTADO: ' + te('US Southeast'),
        true
      )
      .addField(
        '🇮🇳 India',
        'CAPACIDADE: ' + tc('India') + '\nESTADO: ' + te('India'),
        true
      )
      .addField(
        '🇪🇺 Norte Europeu',
        'CAPACIDADE: ' + tc('EU North') + '\nESTADO: ' + te('EU North'),
        true
      );
    //
    const svr3 = new Discord.RichEmbed()
      .setColor('#8607ed')
      .addField(
        '🇦🇪 Emirados Árabes',
        'CAPACIDADE: ' + tc('Emirates') + '\nESTADO: ' + te('Emirates'),
        true
      )
      .addField(
        '🇺🇸 Noroeste dos EUA',
        'CAPACIDADE: ' + tc('US Northwest') + '\nESTADO: ' + te('US Northwest'),
        true
      )
      .addField(
        '🇿🇦 África do Sul',
        'CAPACIDADE: ' + tc('South Africa') + '\nESTADO: ' + te('South Africa'),
        true
      )
      .addField(
        '🇧🇷 Brasil',
        'CAPACIDADE: ' + tc('Brazil') + '\nESTADO: ' + te('Brazil'),
        true
      )
      .addField(
        '🇺🇸 Nordeste dos EUA',
        'CAPACIDADE: ' + tc('US Northeast') + '\nESTADO: ' + te('US Northeast'),
        true
      )
      .addField(
        '🇯🇵 Japão',
        'CAPACIDADE: ' + tc('Japan') + '\nESTADO: ' + te('Japan'),
        true
      );
    //
    const svr4 = new Discord.RichEmbed()
      .setColor('#8607ed')
      .addField(
        '🇦🇷 Argentina',
        'CAPACIDADE: ' + tc('Argentina') + '\nESTADO: ' + te('Argentina'),
        true
      )
      .addField(
        '🇰🇷 Coréia do Sul',
        'CAPACIDADE: ' + tc('South Korea') + '\nESTADO: ' + te('South Korea'),
        true
      )
      .addField(
        '🇸🇬 Singapura',
        'CAPACIDADE: ' + tc('Singapore') + '\nESTADO: ' + te('Singapore'),
        true
      )
      .addField(
        '🇦🇺 Austrália',
        'CAPACIDADE: ' + tc('Australia') + '\nESTADO: ' + te('Australia'),
        true
      )
      .addField(
        '🇨🇳 Shanghai',
        'CAPACIDADE: ' +
          tc('China Shanghai') +
          '\nESTADO: ' +
          te('China Shanghai'),
        true
      )
      .addField(
        '🇨🇳 Tianjin',
        'CAPACIDADE: ' +
          tc('China Tianjin') +
          '\nESTADO: ' +
          te('China Tianjin'),
        true
      )
      .addField(
        '🇨🇳 Guangzhou',
        'CAPACIDADE: ' +
          tc('China Guangzhou') +
          '\nESTADO: ' +
          te('China Guangzhou'),
        true
      );

    message.channel.send(svr0).then(async (r) => {
      var ping = r.createdTimestamp - message.createdTimestamp;
      console.log(ping);
      if (ping >= 1000) {
        message.channel.send(
          '> *Hm... Meu ping parece estar elevado... Algumas coisas podem demorar para acontecer....*'
        );
      }
      FLT = 1;
      await r.react('◀️');
      await r.react('⏺');
      await r.react('▶️');

      let filter = (reaction, user) =>
        reaction.emoji.name === '▶️' && user.id === message.author.id;
      let collector = r.createReactionCollector(filter, {
        time: 300000,
      });
      collector.on('collect', (em) => {
        FLT++;
        if (FLT == 2) {
          r.edit(svr1);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 3) {
          r.edit(svr2);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 4) {
          r.edit(svr3);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 5) {
          r.edit(svr4);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 6) {
          FLT--;
          em.remove(message.author.id);
          console.log(FLT);
        }
      });

      let filter2 = (reaction, user) =>
        reaction.emoji.name === '◀️' && user.id === message.author.id;
      let collector2 = r.createReactionCollector(filter2, {
        time: 300000,
      });
      collector2.on('collect', (em) => {
        em.remove(message.author.id);

        if (FLT == -1) {
          return null;
        } else if (FLT == 2) {
          FLT--;
          r.edit(svr0);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 3) {
          FLT--;
          r.edit(svr1);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 4) {
          FLT--;
          r.edit(svr2);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 5) {
          FLT--;
          r.edit(svr3);
          em.remove(message.author.id);
          console.log(FLT);
        } else if (FLT == 6) {
          FLT--;
          r.edit(svr4);
          em.remove(message.author.id);
          console.log(FLT);
        }
      });
      let filter3 = (reaction, user) =>
        reaction.emoji.name === '⏺' && user.id === message.author.id;
      let collector3 = r.createReactionCollector(filter3, {
        time: 300000,
      });
      collector3.on('collect', (em) => {
        r.delete();
      });
    });
  } catch (e) {
    console.log(e);
  }
};
