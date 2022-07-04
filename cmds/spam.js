const { Client, Message } = require("discord.js");
const fs = require('fs');
var CONFIG = require('../config.json');

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg) => {
	var num = msg.content.split(' ')[1];
	if (!isNaN(num) && num > 0 && num < 180 && msg.member.permissions.has('ADMINISTRATOR')) {
		if (num == CONFIG['spamtime']) {
			msg.reply({ content: `Zaten Anti-Spam süresi  \`${CONFIG['spamtime']}\` saniye.`, allowedMentions: { repliedUser: false } });
			return;
		}
		CONFIG['spamtime'] = num;
		fs.writeFileSync('config.json', JSON.stringify(CONFIG, null, "\t"), 'utf-8');
		msg.reply({ content: `Anti-Spam süresi değişti artık \`${CONFIG['spamtime']}\` saniye.`, allowedMentions: { repliedUser: false } });
	} else {
		msg.reply({ content: `Anti-Spam süresi: \`${CONFIG.spamtime}\` saniye.`, allowedMentions: { repliedUser: false } });
	}
}

module.exports.help = {
	name: 'spam',
	aliases: []
};