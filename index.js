const { Discord, Client } = require('discord.js');
const client = new Client({ intents: 3276799 });
require('dotenv').config();

const axios = require('axios');

const prefix = process.env.PREFIX;

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'UNKNOWN') return;

  if (message.content.startsWith('<@989349457726418964>')) {
    message.reply({
      content: `opa! Quer saber meus comandos? Utilize \`${prefix}ajuda\``,
    });
  }

  if (
    message.content.toLowerCase().startsWith('csgo caiu') ||
    message.content.toLowerCase().startsWith('cs caiu')
  ) {
    var req = await axios
      .get(
        `https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${process.env.KEY}`
      )
      .catch(function (error) {
        message.reply(
          'Não consigo acessar a WebAPI, tente novamente mais tarde.'
        );
      });
    await message.react('⁉️');
    let filter = (reaction, user) =>
      reaction.emoji.name === '⁉️' && user.id === message.author.id;
    let collector = message.createReactionCollector({
      filter: filter,
      time: 300000,
    });
    collector.on('collect', (em) => {
      em.remove(message.author.id);
      em.remove(client.user.id);
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
          case 'full':
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

      if (dc.Brazil.load == 'idle') {
        message.reply({ content: 'Os servidores do Brasil estão inativos!' });
      } else {
        message
          .reply({
            content: 'não! Os servidores do Brasil estão com ' + te('Brazil'),
          })
          .then((msg) => {
            setTimeout(() => msg.delete(), 10000);
          });
      }
    });
  }

  if (!message.content.startsWith(prefix)) return;

  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  var handler = args.shift().toLowerCase();

  try {
    var cmdlet = require(`./C/${handler}.js`);
    cmdlet.run(client, message, args, prefix);
  } catch (e) {
    message.reply({ content: 'comando inexistente!' });
    console.log(e);
  }
});

client.login(process.env.TOKEN);
