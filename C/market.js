const Discord = require('discord.js')
const axios = require('axios')
require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('market')
		.setDescription('mostra itens do mercado da do CS:GO')
		.addStringOption((option) =>
			option.setName('item').setDescription('Enter a string')
		),
	async execute(interaction, client) {
		const str = interaction.options.getString('item')
		try {
			//https://steamcommunity.com/market/priceoverview/?appid=730&market_hash_name=StatTrak™ Nova %7C Wood Fired %28Well-Worn%29&currency=7
			const req = await axios.get(
				`https://steamcommunity.com/market/search/render/?&appid=730&query=${str.replace(
					' ',
					'%20'
				)}&start=0&currency=7&count=5&norender=1`
			)
			var ar = []
			const user = interaction.user
			const id = user.id
			var pages = {}

			pages[id] = pages[id] || 0
			for (let a = 0; a < req.data.results.length; a++) {
				ar.push(
					req.data.results[a].name,
					req.data.results[a].sell_listings,
					req.data.results[a].sell_price_text,
					req.data.results[a].sale_price_text,
					req.data.results[a].asset_description.icon_url
				)
			}
			function embed_c(
				NOME,
				LISTA_VENDAS,
				VENDA_PRECO,
				VENDA_PRECO_MEDIO,
				ICONE
			) {
				let embed = new Discord.MessageEmbed()
					.setColor('GREEN')
					.setAuthor({ name: `${NOME}` })
					.addFields(
						{
							name: `\`💲 Preço~\``,
							value: `> **${VENDA_PRECO}**`,
							inline: true,
						},
						{
							name: `\`💲〽️ Preço Mínimo~\``,
							value: `> **${VENDA_PRECO_MEDIO}**`,
							inline: true,
						},
						{
							name: `\`📦 Produtos listados~\``,
							value: `> **${LISTA_VENDAS} Item(s)**`,
							inline: true,
						}
					)
					.setThumbnail(
						'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/730/69f7ebe2735c366c65c0b33dae00e12dc40edbe4.jpg'
					)
					.setImage(
						`https://steamcommunity-a.akamaihd.net/economy/image/${ICONE}`
					)
				return embed
			}
			var embeds = [
				embed_c(
					!ar[0] || ar[0] === 'undefined' ? 'indefinido' : ar[0],
					!ar[ar.length - 24] || ar[ar.length - 24] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 24],
					!ar[ar.length - 23] || ar[ar.length - 23] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 23],
					!ar[ar.length - 22] || ar[ar.length - 22] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 22],
					!ar[ar.length - 21] || ar[ar.length - 21] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 21]
				),
				embed_c(
					!ar[5] || ar[5] === 'undefined' ? 'indefinido' : ar[5],
					!ar[ar.length - 19] || ar[ar.length - 19] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 19],
					!ar[ar.length - 18] || ar[ar.length - 18] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 18],
					!ar[ar.length - 17] || ar[ar.length - 17] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 17],
					!ar[ar.length - 16] || ar[ar.length - 16] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 16]
				),
				embed_c(
					!ar[10] || ar[10] === 'undefined' ? 'indefinido' : ar[10],
					!ar[ar.length - 14] || ar[ar.length - 14] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 14],
					!ar[ar.length - 13] || ar[ar.length - 13] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 13],
					!ar[ar.length - 12] || ar[ar.length - 12] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 12],
					!ar[ar.length - 11] || ar[ar.length - 11] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 11]
				),
				embed_c(
					!ar[15] || ar[15] === 'undefined' ? 'indefinido' : ar[15],
					!ar[ar.length - 9] || ar[ar.length - 9] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 9],
					!ar[ar.length - 8] || ar[ar.length - 8] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 8],
					!ar[ar.length - 7] || ar[ar.length - 7] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 7],
					!ar[ar.length - 6] || ar[ar.length - 6] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 6]
				),
				embed_c(
					!ar[20] || ar[20] === 'undefined' ? 'indefinido' : ar[20],
					!ar[ar.length - 4] || ar[ar.length - 4] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 4],
					!ar[ar.length - 3] || ar[ar.length - 3] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 3],
					!ar[ar.length - 2] || ar[ar.length - 2] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 2],
					!ar[ar.length - 1] || ar[ar.length - 1] === 'undefined'
						? 'indefinido'
						: ar[ar.length - 1]
				),
			]
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
