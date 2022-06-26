const { Client, Message } = require("discord.js");

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg) => {
	msg.reply({ content: 'Pong!', allowedMentions: { repliedUser: false } });
}

module.exports.help = {
	name: 'ping',
	aliases: []
};