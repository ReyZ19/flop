const { Client, Message } = require("discord.js");

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg, map) => {
	var cmds = "";
	for (var entry of map.entries()) {
		if (cmds.includes(' `' + entry[1].help.name + '`')) continue;
		cmds += ' `' + entry[1].help.name + '`';
	}
	msg.reply({ content: 'Komutlar:' + cmds, allowedMentions: { repliedUser: false } });
}

module.exports.help = {
	name: 'cmds',
	aliases: ['komutlar']
};