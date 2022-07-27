const { MessageEmbed } = require('discord.js')

require('dotenv').config()

const aid = '16'

const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('notas')
		.setDescription('mostra as notas de atualização')
		.addStringOption((option) =>
			option
				.setName('id')
				.setDescription(`Escolha a página utilizando um número de 1 à ${aid}`)
		),

	async execute(interaction, client) {
		const notas = require('./notas/notas.json')

		const numero = interaction.options.getString('id')

		var id

		if (!numero) {
			id = aid
		} else {
			var id = parseInt(numero, 10)

			if (
				id <= 0 ||
				id > parseInt(aid, 10) ||
				!id ||
				id === 'undefined' ||
				id === 'null'
			)
				return interaction.reply('ID não encontrado!')
		}

		const nota = notas.ids.find((it) => it.id == id)

		try {
			let embed = new MessageEmbed()
				.setColor('YELLOW')
				.setAuthor({
					name: 'Notas de Atualização',
					iconURL: client.user.avatarURL(),
				})
				.addFields([
					{
						name: `Versão ${nota.version} (${nota.data})`,
						value: nota.desc,
					},
				])
				.setFooter({
					text: `Página ${nota.id} | Caso queira olhar outras notas de atualizações, use: /notas <1-${aid}>`,
				})

			interaction.reply({ embeds: [embed] })
		} catch (e) {
			console.log(e)
		}
	},
}
