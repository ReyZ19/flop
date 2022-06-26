const { Client, Message } = require("discord.js");

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg) => {
	msg.reply({ content: `Seçime **${Math.ceil(Math.abs(new Date() - new Date('2023-06-18')) / 86400000)}** gün kaldı!`, allowedMentions: { repliedUser: false } });
}

module.exports.help = {
	name: '2023',
	aliases: ['secim']
};