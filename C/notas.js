const Discord = require('discord.js')
exports.run = async (client, message, args, config, dotenv) => {
  function criar_embed(F1, F2) {
    let embed = new Discord.RichEmbed()
      .setAuthor("CHANGELOG", client.user.avatarURL)
      .addField(F1, F2)
      .setColor("WHITE")
    return embed
  }
  //Melhorar isso...
  try {
    const ch1 = criar_embed('VERSÃO 1.1.0 (13.07.22) :tada:', '[MISC]\n- Já que estamos na 1.1.0 estou liberando o código do bot na github, use csgo>code\n[LINGUAGEM]\n- Erros como "VESÃO" (KKKK EU SOU HORRÍVEL NO PORTUGUÊS) arrumados.')
    const ch2 = criar_embed('VERSÃO 1.0.9 (12.07.22)', '[MISC]\n- Adicionado função de lista no comando csgo>sobre\n- Arrumado problemas com o bot não gostando de responder você')
    const ch3 = criar_embed('VERSÃO 1.0.8 (10.07.22)', '[MISC]\n- Consertado vários problemas envolvendo o comando csgo>perfil\n- Comando csgo>devs agora mostra corretamente quandos devs estão online\n- Removido logs por motivos de spam\n[REWORK]\n- Páginas de comandos retrabalhadas\n- Novo método de manuseio de comandos (Handler)\n- Prefixo alterado')
    const ch4 = criar_embed('VERSÃO 1.0.7 (08.07.22)', '[GERAL]\n- Adicionado o comando !csgo perfil\n- Editado parâmetros de ping para menores chances de alertas')
    const ch5 = criar_embed('VERSÃO 1.0.6 (07.07.22)', '[GERAL]\n- Adicionado o comando !csgo devs')
    const ch6 = criar_embed('VERSÃO 1.0.5 (05.07.22)', '[LINGUAGEM]\n- Edições em algumas mensagens para melhor compreensão do usuário\n[GERAL]\n- Adicionado maior sintaxe para comandos\n[OUTROS]\n- Para maior segurança, foi adicionado um sistema de logs para quando cada usuário executou uma mensagem e junto aparece o link da mensagem.')
    const ch7 = criar_embed('VERSÃO 1.0.4 (01.07.22)', '[GERAL]\n- Adicionado um alerta para quando bot está sofrendo de lentidão.')
    const ch8 = criar_embed('VERSÃO 1.0.3 (30.06.22)', '[GERAL]\n- O comando `csgo caiu` agora aceita letras maiúsculas (Obrigado RbM!)\n- Adicionado Fallbacks para quando a Web API cair o bot não cair junto.\n- Adicionado o comando de report de bugs e sugestões.\n[LINGUAGEM]\n- Pequeno polimento em certas respostas.')
    const ch9 = criar_embed('VERSÃO 1.0.2 (29.06.22)', '[LINGUAGEM]\n- Corrigido pequenos erros de tradução para melhor compreensão.\n[GERAL]\n- Adicionado comando de Notas de Atualização.')
    message.channel.send(ch1)
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
          if (FLT <= 0) {
            em.remove(message.author.id)
            console.log(FLT)
            FLT++
          } else if (FLT == 2) {
            r.edit(ch2)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 3) {
            r.edit(ch3)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 4) {
            r.edit(ch4)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 5) {
            r.edit(ch5)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 6) {
            r.edit(ch6)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 7) {
            r.edit(ch7)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT = 8) {
            r.edit(ch8)
            em.remove(message.author.id)
            console.log(FLT)

          } else if (FLT >= 9) {
            FLT--
            r.edit(ch9)
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

          if (FLT <= 0) {
            em.remove(message.author.id)
            console.log(FLT)
            FLT++
          } else if (FLT == 1) {
            FLT--
            r.edit(ch1)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 2) {
            FLT--
            r.edit(ch2)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 3) {
            FLT--
            r.edit(ch3)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 4) {
            FLT--
            r.edit(ch4)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 5) {
            FLT--
            r.edit(ch5)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 6) {
            FLT--
            r.edit(ch6)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 7) {
            FLT--
            r.edit(ch7)
            em.remove(message.author.id)
            console.log(FLT)
          } else if (FLT == 9) {
            r.edit(ch8)
            em.remove(message.author.id)
            console.log(FLT)

          } else if (FLT == 9) {
            r.edit(ch9)
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
  } catch (e) {
    console.log(e)
  }
}