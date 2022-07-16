const {
  response
} = require('express');
const Discord = require('discord.js')
const client = new Discord.Client
require('dotenv').config()
const axios = require('axios')


client.on('message', async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(process.env.PREFIX)) return;

  var args = message.content.slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g);
  var handler = args.shift()
    .toLowerCase();


  try {
    var cmdlet = require(`./C/${handler}.js`)
    cmdlet.run(client, message, args, dotenv);
  } catch (e) {
    message.reply('comando inexistente!')
    console.log(e);
  }
})

client.on('ready', () => {

  let status = [{
      name: `Criado por Lunx`,
      type: 'STEAMING'
    },
    {
      name: `Apenas um bot para checar o status dos servidores do CSGO`,
      type: 'PLAYING'
    },
    {
      name: `Utilize csgo>ajuda para ver meus comandos `,
      type: 'PLAYING'
    }
  ];

  function setStatus() {
    let randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setPresence({
      game: randomStatus
    });
  }
  setStatus();
  setInterval(() => setStatus(), 10000); //10 segundos

})

client.on('message', message => {
  if (message.content.startsWith('<@989349457726418964>')) {
    message.reply('opa! Quer saber meus comandos? Utilize `csgo>ajuda`')
  }
})
client.on('message', async message => {
  if (message.content.toLowerCase()
    .startsWith('csgo caiu') || message.content.toLowerCase()
    .startsWith('cs caiu')) {
    var req = await axios.get(`https://api.steampowered.com/ICSGOServers_730/GetGameServersStatus/v1/?key=${process.env.KEY}`)
    await message.react("⁉️")
    let filter = (reaction, user) => reaction.emoji.name === "⁉️" && user.id === message.author.id;
    let collector = message.createReactionCollector(filter, {
      time: 300000
    })
    collector.on('collect', em => {
      em.remove(message.author.id)
      em.remove(client.user.id)
      var dc = req.data.result.datacenters

      function te(lugar) { //tradução do ESTADO
        let estados = dc[lugar].load
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
        return traduz
      }

      if (dc.Brazil.load == 'idle') {
        message.reply('Os servidores do Brasil estão inativos!')
      } else {
        message.reply('não! Os servidores do Brasil estão com ' + te('Brazil'))
          .then(msg => {
            setTimeout(() => msg.delete(), 10000)
          })
      }
    }, error => {
      message.reply('não consigo acessar a WebAPI no momento, desculpe! (isso significa que a API caiu!)')
    })
  }
})



client.login(process.env.TOKEN)