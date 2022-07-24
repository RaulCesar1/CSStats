const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
  data: new SlashCommandBuilder()
      .setName('perfil')
      .setDescription('mostra o perfil de um usuário da Steam')
      .addBooleanOption(option => option.setName('escolha').setDescription('True para procurar perfil utilizando ID e False para utilizar URL customizada.'))
      .addStringOption(option => option.setName('pesquisa').setDescription('Digite a URL customizada ou ID')),
  async execute(interaction, client) {
  try {
    const boolean = interaction.options.getBoolean('escolha');
    const string = interaction.options.getString('pesquisa');
    console.log(boolean, string)

    function criar_embed(
      Autor,
      nac,
      criada_em,
      ultima_online,
      level,
      thumbnail,
      steam_id,
      vac,
      cban
    ) {
      let embed = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setAuthor({
          name: !Autor || Autor === 'undefined' ? 'Perfil inexistente!' : Autor,
        })
        .addFields([
          {
            name: 'Nacionalidade',
            value:
              `${!nac || nac === 'undefined'
                ? 'Indefinido'
                : `:flag_${nac.toLowerCase()}: ${nac}`}`,
          },
          {
            name: 'Criada em:',
            value: `
              ${!criada_em || criada_em === 'Invalid Date'
                ? 'Data Inválida/Privada'
                : criada_em}`,
          },
          {
            name: 'Última vez Online:',
            value:
              `${!ultima_online || ultima_online === 'Invalid Date'
                ? 'Data inválida/Privada'
                : ultima_online}`,
          },
          {
            name: 'Level:',
            value: `${!level || level === 'undefined' ? 'Indefinido' : level}`,
          },
        ])
        .setThumbnail(
          !thumbnail || thumbnail === 'undefined'
            ? 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg'
            : thumbnail
        )
        .setFooter({
          text: `Steam ID: ${steam_id}\nVAC? ${
            !vac || vac === 'false' ? 'Não' : 'Sim'
          }\nBanido da Comunidade? ${
            !cban || cban === 'false' ? 'Não' : 'Sim'
          }`,
        });

      return embed;
    }

    if (boolean === true) {
      var req1 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v1/?steamids=${string}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          interaction.reply(
            'Não consigo acessar o `GetPlayerSummaries`, tente usar esse comando mais tarde.'
          );
        });
      var req2 = await axios
        .get(
          `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?steamid=${string}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          interaction.reply(
            'Não consigo acessar o `GetSteamLevel`, tente usar esse comando mais tarde.'
          );
        });
      var req3 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1?steamids=${string}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          interaction.reply(
            'Não consigo acessar o `GetPlayerBans`, tente usar esse comando mais tarde.'
          );
        });

      if (req1.data.response.players.player[0].personaname === 'undefined') {
        return interaction.reply('Este perfil é inexistente!');
      } else {
        const EpochTime =
          req1.data.response.players.player[0].timecreated * 1000;
        const EpochTime2 =
          req1.data.response.players.player[0].lastlogoff * 1000;
        const d2 = new Date(EpochTime2);
        const d = new Date(EpochTime);
        const dataCorreta = d.toLocaleString();
        const dataCorreta2 = d2.toLocaleString();
        console.log(
          'nome\n',
          req1.data.response.players.player[0].personaname,
          'country\n',
          req1.data.response.players.player[0].loccountrycode,
          'criado\n',
          dataCorreta,
          'logoff\n',
          dataCorreta2,
          'level\n',
          req2.data.response.player_level,
          'avatar\n',
          req1.data.response.players.player[0].avatarfull,
          'id\n',
          string,
          'banv\n',
          req3.data.players[0].VACBanned,
          'banc\n',
          req3.data.players[0].CommunityBanned
        );
        await interaction.reply({
          embeds: [
            criar_embed(
              req1.data.response.players.player[0].personaname,
              req1.data.response.players.player[0].loccountrycode,
              dataCorreta,
              dataCorreta2,
              req2.data.response.player_level,
              req1.data.response.players.player[0].avatarfull,
              string,
              req3.data.players[0].VACBanned,
              req3.data.players[0].CommunityBanned
            ),
          ],
        });
      }
    } else if (boolean === false) {
      var req1 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?vanityurl=${string}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          interaction.reply(
            'Não consigo acessar o `ResolveVanityURL`, tente usar esse comando mais tarde.'
          );
        });
      var steamidfetch = req1.data.response.steamid;
      let req2 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v1/?steamids=${steamidfetch}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          interaction.reply(
            'Não consigo acessar o `GetPlayerSummaries`, tente usar esse comando mais tarde.'
          );
        });
      let req3 = await axios
        .get(
          `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?steamid=${steamidfetch}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          interaction.reply(
            'Não consigo acessar o `GetSteamLevel`, tente usar esse comando mais tarde.'
          );
        });
      let req4 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1?steamids=${steamidfetch}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          interaction.reply(
            'Não consigo acessar o `GetPlayerBans`, tente usar esse comando mais tarde.'
          );
        });

      const EpochTime = req2.data.response.players.player[0].timecreated * 1000;
      const EpochTime2 = req2.data.response.players.player[0].lastlogoff * 1000;
      const d2 = new Date(EpochTime2);
      const d = new Date(EpochTime);
      const dataCorreta = d.toLocaleString();
      const dataCorreta2 = d2.toLocaleString();
      console.log(req2.data.response);
      await interaction.reply({
        embeds: [
          criar_embed(
            req2.data.response.players.player[0].personaname,
            req2.data.response.players.player[0].loccountrycode,
            dataCorreta,
            dataCorreta2,
            req3.data.response.player_level,
            req2.data.response.players.player[0].avatarfull,
            steamidfetch,
            req4.data.players[0].VACBanned,
            req4.data.players[0].CommunityBanned
          ),
        ],
        ephemeral: true
      });
    }
  } catch (e) {
    console.log(e);
  }
},
}
