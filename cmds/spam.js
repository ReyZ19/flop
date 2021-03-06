const { Client, Message } = require("discord.js");
const fs = require('fs');
var config = require('../config.json');

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg) => {
	var num = msg.content.split(' ')[1];
	if (!isNaN(num) && num > 0 && num < 180 && msg.member.permissions.has('ADMINISTRATOR')) {
		if (num == config.spamtime) {
			msg.reply({ content: `Zaten Anti-Spam süresi  \`${config.spamtime}\` saniye.`, allowedMentions: { repliedUser: false } });
			return;
		}
		config.spamtime = num;
		fs.writeFileSync('config.json', JSON.stringify(config, null, "\t"), 'utf-8');
		msg.reply({ content: `Anti-Spam süresi değişti artık \`${config.spamtime}\` saniye.`, allowedMentions: { repliedUser: false } });
	} else {
		msg.reply({ content: `Anti-Spam süresi: \`${config.spamtime}\` saniye.`, allowedMentions: { repliedUser: false } });
	}
}

module.exports.help = {
	name: 'spam',
	aliases: []
};