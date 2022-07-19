const { default: axios } = require('axios');
const Discord = require('discord.js');
const { response } = require('express');
exports.run = async (client, message, args, config) => {
  await message.channel.sendTyping();
  try {
    const S_URL = 'https://store.steampowered.com/';
    const CM_URL = 'https://steammcommunity.com';
    const WAPI =
      'https://api.steampowered.com/ISteamWebAPIUtil/GetServerinfo/v1/';
    const requestUm = await axios.get(S_URL);
    const requestDois = await axios.get(CM_URL);
    const requestTres = await axios.get(WAPI);

    axios.all([requestUm, requestDois, requestTres]).then(
      axios.spread(async (...responses) => {
        let respostaUm = responses[0];
        let respostaDois = responses[1];
        let respostaTres = responses[2];

        function responseObj(res) {
          var CASOS;
          switch (res) {
            case 200:
              CASOS = '`> Normal ☑️`';
              break;
            case 404:
              CASOS = '`> Não encontrado ❓`';
              break;
            case 500:
              CASOS = '`> Erro do Servidor Interno ❌`';
              break;
            case 503:
              CASOS = '`> Serviço não disponível ❌❌`';
              break;
            default:
              CASOS = res;
              break;
          }
          return CASOS;
        }

        const embed = new Discord.MessageEmbed()
          .setAuthor({ name: 'STATUS STEAM' })
          .addFields([
            {
              name: 'Loja',
              value: responseObj(respostaUm.status),
            },
            {
              name: 'WebAPI',
              value: responseObj(respostaTres.status),
            },
            {
              name: 'Comunidade',
              value: responseObj(respostaDois.status),
            },
          ]);
        await message.reply({ embeds: [embed] });

        console.log(
          respostaUm.status,
          respostaDois.status,
          respostaTres.status,
          respostaUm.statusText,
          respostaTres.statusText,
          respostaDois.statusText
        );
      })
    );
  } catch (e) {
    console.log(e);
    message.reply('ERRO 429, muitos pedidos!');
  }
};
