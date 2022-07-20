const Discord = require('discord.js');
const axios = require('axios');
const { Message } = require('protobufjs');
const skins = require('./skins/skins.js').skins;
const armas = require('./skins/skins.js').armas;
require('dotenv').config();
exports.run = async (client, message, args, prefix) => {
  await message.channel.sendTyping();
  let str = args.slice(2).join('%20');
  let words = str.replace(/(^\w{1})|(\%20\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
  const hash_1 = args[0];
  var autocorrect1 = require('autocorrect')({ words: armas });
  var autocorrect2 = require('autocorrect')({ words: skins });
  var hash_1_correct = autocorrect1(hash_1);
  const hash_2 = args[1]
    .toUpperCase()
    .replace('FT', 'Field-Tested')
    .replace('MW', 'Minimal Wear')
    .replace('FN', 'Factory New')
    .replace('WW', 'Well-Worn')
    .replace('BS', 'Battle-Scarred');
  const hash_2_correct = hash_2.replace(' ', '%20');
  const hash_3 = words;
  const hash_3_correct = autocorrect2(hash_3).replace(' ', '%20');
  console.log(hash_1_correct, hash_2, hash_3_correct);
  const hash_name = `${hash_1_correct}%20%7C%20${hash_3_correct}%20%28${hash_2_correct}%29`;

  const req = await axios
    .get(
      `https://steamcommunity.com/market/priceoverview/?appid=730&market_hash_name=${hash_name}&currency=7`
    )
    .catch(function (e) {
      console.log(e);
      message.reply(
        'Hm, tem algo errado, você está digitando corretamente? (sintaxe: csgo>marketcheck <nome da arma> <desgaste> <skin>)'
      );
    });
  var embed = new Discord.MessageEmbed()
    .setAuthor({
      name: `MERCADO STEAM - ${hash_1_correct} | ${autocorrect2(
        hash_3
      )} (${hash_2})`,
      iconURL: client.user.avatarURL,
    })
    .setImage(`https://api.steamapis.com/image/item/730/${hash_name}`)
    .addFields([
      {
        name: `Preço Médio~`,
        value: `> ${req.data.median_price} 💰`,
      },
      {
        name: `Menor Preço~`,
        value: `> ${req.data.lowest_price} 💰`,
      },
      {
        name: `Média de vendas~`,
        value: `> ${req.data.volume} Items :part_alternation_mark:`,
      },
    ])
    .setFooter(`success: ${req.data.success} <!>`)
    .setThumbnail(client.user.avatarURL);
  console.log(req);
  message.reply({ embeds: [embed] });
};
