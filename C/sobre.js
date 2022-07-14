const Discord = require('discord.js')
const package = require("../package.json");
exports.run = async (client, message, args, config, dotenv) => {
  let user = client.users.find(u => u.tag === 'lunx#6699')
  const embed1 = new Discord.RichEmbed()
    .setAuthor('Sobre mim', client.user.avatarURL)
    .addField('Criado por:', 'Lunx *(amiga do Luar)*', true)
    .addField('Versão do bot:', 'RELEASE 1.1.0', true)
    .addField('Sobre o bot:', `discord.js ${package.dependencies["discord.js"].substring(1)}\naxios ${package.dependencies["axios"].substring(1)}`, true)
    .addField('Contato do Desenvolvedor:', 'Discord: Lunx#6699\nTwitter: [@akaLunx](https://twitter.com/akaLunx)\nSteam: [/id/Lunixyz](https://steamcommunity.com/id/Lunixyz/)', true)

  const embed2 = new Discord.RichEmbed()
    .setAuthor('Sobre o Desenvolvedor', client.user.avatarURL)
    .setDescription('Olá, desde já, obrigado por utilizar meu bot!')
    .addField('Propósito do bot?',
      'Originalmente criei esse BOT com a ideia de ajudar quem não curte sair do conforto do Discord para checar o steamstat.us' +
      '(a ideia não é de forma alguma diminuir o acesso ao steamstat.us, mas sim facilitar acesso ao status dos servidores.)'
    )
    .addField('Quem sou eu?',
      'Eu sou um garoto homosexual Brasileiro que sempre está indo atrás de conhecimento e respostas.'
    )
  message.reply(embed1)
    .then(async r => {
      var ping = r.createdTimestamp - message.createdTimestamp
      console.log(ping)
      if (ping >= 1000) {
        message.channel.send('> *Hm... Meu ping parece estar elevado... Algumas coisas podem demorar para acontecer....*')
      }
      FLT = 1
      await r.react("◀️")
      await r.react("⏺")
      await r.react("▶️")

      let filter = (reaction, user) => reaction.emoji.name === "▶️" && user.id === message.author.id;
      let collector = r.createReactionCollector(filter, {
        time: 300000
      })
      collector.on('collect', em => {
        FLT++
        if (FLT == 2) {
          r.edit(embed2)
          em.remove(message.author.id)
          console.log(FLT)
        } else if (FLT == 3) {
          FLT--
          em.remove(message.author.id)
          console.log(FLT)
        }
      })

      let filter2 = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
      let collector2 = r.createReactionCollector(filter2, {
        time: 300000
      })
      collector2.on('collect', em => {
        em.remove(message.author.id)

        if (FLT == -1) {
          return null
        } else if (FLT == 2) {
          FLT--
          r.edit(embed1)
          em.remove(message.author.id)
          console.log(FLT)
        }

      })
      let filter3 = (reaction, user) => reaction.emoji.name === "⏺" && user.id === message.author.id;
      let collector3 = r.createReactionCollector(filter3, {
        time: 300000
      })
      collector3.on('collect', em => {
        r.delete()

      })
    })
}