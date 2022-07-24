const { default: axios } = require('axios');
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  data: new SlashCommandBuilder()
      .setName('steamstatus')
      .setDescription('mostra o estado geral dos serviços da Steam'),
  async execute(interaction, client) {
    const S_URL = 'https://store.steampowered.com/';
    const CM_URL = 'https://steammcommunity.com';
    const WAPI =
      'https://api.steampowered.com/ISteamWebAPIUtil/GetServerinfo/v1/';
    const PLRS = 'https://www.valvesoftware.com/es/about/stats'
    const requestUm = await axios.get(S_URL);
    const requestDois = await axios.get(CM_URL);
    const requestTres = await axios.get(WAPI);
    const requestQuatro = await axios.get(PLRS);

    axios.all([requestUm, requestDois, requestTres, requestQuatro]).then(
      axios.spread(async (...responses) => {
        let respostaUm = responses[0];
        let respostaDois = responses[1];
        let respostaTres = responses[2];
        let respostaQuatro = responses[3];

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
          .setAuthor({ name: 'Serviços Steam ⚠️' })
          .addFields([
            {
              name: 'Usuários online na Steam',
              value: `${responseObj(respostaQuatro.data.users_online)}`
            },
            {
              name: 'Usuários jogando na Steam',
              value: `${responseObj(respostaQuatro.data.users_ingame)}`
            },
            {
              name: 'Loja',
              value: `${responseObj(respostaUm.status)}`,
            },
            {
              name: 'WebAPI',
              value: `${responseObj(respostaTres.status)}`,
            },
            {
              name: 'Comunidade',
              value: `${responseObj(respostaDois.status)}`,
            },
          ]);
        interaction.reply({ embeds: [embed], ephemeral: true });
      })
    );
},
};
