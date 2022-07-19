const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  try {
    await message.channel.sendTyping();
    if (!args[0]) {
      return message.reply(
        'utilize `csgo>perfil <custom / id> <URL customizada/ID da Steam do usuário>`'
      );
    }

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
          name: !Autor || Autor === ' ' ? 'Perfil inexistente!' : Autor,
        })
        .addFields([
          {
            name: 'Nacionalidade',
            value:
              !nac || nac === 'undefined'
                ? 'Indefinido'
                : `:flag_${nac.toLowerCase()}: ${nac}`,
          },
          {
            name: 'Criada em:',
            value:
              !criada_em || criada_em === 'Invalid Date'
                ? 'Data Inválida/Privada'
                : criada_em,
          },
          {
            name: 'Última vez Online:',
            value:
              !ultima_online || ultima_online === 'Invalid Date'
                ? 'Data inválida/Privada'
                : ultima_online,
          },
          {
            name: 'Level:',
            value: !level || level === 'undefined' ? 'Indefinido' : level,
          },
        ])
        .setThumbnail(
          !thumbnail || thumbnail === 'undefined'
            ? 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg'
            : thumbnail
        )
        .setFooter(
          `Steam ID: ${steam_id}\nVAC? ${
            !vac || vac === 'false' ? 'Não' : 'Sim'
          }\nBanido da Comunidade? ${!cban || cban === 'false' ? 'Não' : 'Sim'}`
        );

      return embed;
    }

    if (args[0].toLowerCase() === 'id') {
      var req1 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v1/?steamids=${args[1]}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          message.reply(
            'Não consigo acessar o `GetPlayerSummaries`, tente usar esse comando mais tarde.'
          );
        });
      var req2 = await axios
        .get(
          `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?steamid=${args[1]}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          message.reply(
            'Não consigo acessar o `GetSteamLevel`, tente usar esse comando mais tarde.'
          );
        });
      var req3 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1?steamids=${args[1]}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          message.reply(
            'Não consigo acessar o `GetPlayerBans`, tente usar esse comando mais tarde.'
          );
        });

      if (req1.data.response.players.player[0].personaname === 'undefined') {
        return message.reply('Este perfil é inexistente!');
      } else {
        const EpochTime =
          req1.data.response.players.player[0].timecreated * 1000;
        const EpochTime2 =
          req1.data.response.players.player[0].lastlogoff * 1000;
        const d2 = new Date(EpochTime2);
        const d = new Date(EpochTime);
        const dataCorreta = d.toLocaleString();
        const dataCorreta2 = d2.toLocaleString();
        await message.reply({
          embeds: [
            criar_embed(
              req1.data.response.players.player[0].personaname,
              req1.data.response.players.player[0].loccountrycode,
              dataCorreta,
              dataCorreta2,
              req2.data.response.player_level,
              req1.data.response.players.player[0].avatarfull,
              args[1],
              req3.data.players[0].VACBanned,
              req3.data.players[0].CommunityBanned
            ),
          ],
        });
      }
    } else if (args[0].toLowerCase() === 'custom') {
      var req1 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?vanityurl=${args[1]}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          message.reply(
            'Não consigo acessar o `ResolveVanityURL`, tente usar esse comando mais tarde.'
          );
        });
      var steamidfetch = req1.data.response.steamid;
      let req2 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v1/?steamids=${steamidfetch}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          message.reply(
            'Não consigo acessar o `GetPlayerSummaries`, tente usar esse comando mais tarde.'
          );
        });
      let req3 = await axios
        .get(
          `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?steamid=${steamidfetch}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          message.reply(
            'Não consigo acessar o `GetSteamLevel`, tente usar esse comando mais tarde.'
          );
        });
      let req4 = await axios
        .get(
          `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1?steamids=${steamidfetch}&key=${process.env.KEY}`
        )
        .catch(function (error) {
          message.reply(
            'Não consigo acessar o `GetPlayerBans`, tente usar esse comando mais tarde.'
          );
        });

      const EpochTime = req2.data.response.players.player[0].timecreated * 1000;
      const EpochTime2 = req2.data.response.players.player[0].lastlogoff * 1000;
      const d2 = new Date(EpochTime2);
      const d = new Date(EpochTime);
      const dataCorreta = d.toLocaleString();
      const dataCorreta2 = d2.toLocaleString();
      await message.reply({
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
      });
    }
  } catch (e) {
    console.log(e);
  }
};
