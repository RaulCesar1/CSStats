const Discord = require('discord.js')
require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Reporta um bug ou envia uma sugestão para o criador')
		.addStringOption((option) =>
			option
				.setName('report')
				.setDescription('Escreva seu report/sugestão')
				.setRequired(true)
		),
	async execute(interaction, client) {
		const string = interaction.options.getString('report')
		var channel = client.channels.cache.get('992172780848156763')
		channel.send(
			`bug/sugestão enviada: \n**${string}**\n pelo usuário ${interaction.user.tag}`
		)
		interaction.reply({ content: 'Obrigado por contribuir.', ephemeral: true })
	},
}
