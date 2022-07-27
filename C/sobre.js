const Discord = require('discord.js')
const package = require('../package.json')
require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('sobre')
		.setDescription('mostra o sobre mim do BOT'),
	async execute(interaction, client) {
		try {
			const embed1 = new Discord.MessageEmbed()
				.setAuthor({ name: 'Sobre mim', iconURL: client.user.avatarURL() })
				.setColor('AQUA')
				.addFields([
					{
						name: 'Criado por:',
						value: 'Lunixyz',
						inline: true,
					},
					{
						name: 'Versão do bot:',
						value: `${package.version}`,
						inline: true,
					},
					{
						name: 'Sobre o bot:',
						value: `discord.js ${
							package.dependencies['discord.js']
						}\naxios ${package.dependencies['axios'].substring(1)}`,
						inline: true,
					},
					{
						name: 'Contato do Desenvolvedor',
						value:
							'Discord: lunx 月#6699\nTwitter: [@akaLunx](https://twitter.com/akaLunx)\nSteam: [/id/Lunixyz](https://steamcommunity.com/id/Lunixyz/)',
					},
				])

			const embed2 = new Discord.MessageEmbed()
				.setAuthor({
					name: 'Sobre o Desenvolvedor',
					iconURL: client.user.avatarURL(),
				})
				.setColor('AQUA')
				.setDescription('Olá, desde já, obrigado por utilizar meu bot!')
				.addFields([
					{
						name: 'Propósito do bot?',
						value:
							'Originalmente criei esse BOT com a ideia de ajudar quem não curte sair do conforto do Discord para checar o steamstat.us\n(a ideia não é de forma alguma diminuir o acesso ao steamstat.us, mas sim facilitar acesso ao status dos servidores.)',
					},
					{
						name: 'Quem sou eu?',
						value:
							'Eu sou um garoto homosexual Brasileiro que sempre está indo atrás de conhecimento e respostas.',
					},
				])
			const embeds = [embed1, embed2]
			const pages = {}
			const user = interaction.user
			const id = user.id
			pages[id] = pages[id] || 0

			const filter = (message) => message.user.id === user.id
			const time = 1000 * 60 * 5
			const getRow = (id) => {
				const row = new Discord.MessageActionRow()
				row.addComponents(
					new Discord.MessageButton()
						.setCustomId('ret_b')
						.setStyle('SECONDARY')
						.setEmoji('◀️')
						.setDisabled(pages[id] === 0)
				)
				row.addComponents(
					new Discord.MessageButton()
						.setCustomId('pro_b')
						.setStyle('SECONDARY')
						.setEmoji('▶️')
						.setDisabled(pages[id] === embeds.length - 1)
				)
				return row
			}
			const embed = embeds[pages[id]]
			let collector
			interaction.reply({
				ephemeral: true,
				embeds: [embed],
				components: [getRow(id)],
			})
			collector = interaction.channel.createMessageComponentCollector({
				filter,
				time,
			})
			collector.on('collect', (botao) => {
				if (!botao) {
					return
				}
				botao.deferUpdate()
				if (botao.customId !== 'ret_b' && botao.customId !== 'pro_b') {
					return
				}
				if (botao.customId == 'ret_b' && pages[id] > 0) {
					--pages[id]
				} else if (
					botao.customId === 'pro_b' &&
					pages[id] < embeds.length - 1
				) {
					++pages[id]
				}
				interaction.editReply({
					embeds: [embeds[pages[id]]],
					components: [getRow(id)],
				})
			})
		} catch (e) {
			console.log(e)
		}
	},
}
