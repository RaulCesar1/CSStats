
const Discord = require('discord.js')
exports.run = async (client, message, args, config) => {
    let embed = new Discord.RichEmbed()
      .setAuthor("CÓDIGO-FONTE", client.user.avatarURL)
      .addField(`Você quer saber como eu funciono? \nDê uma olhada no meu código fonte então.`, `Github:`)
      .setColor("WHITE")
      .setDescription("https://github.com/Lunixyz/CSGOStats")

  message.reply(embed)
}