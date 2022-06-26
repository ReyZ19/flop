const { Client, Message } = require("discord.js");
const axios = require('axios');

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg) => {
	msg.reply({ content: 'Bekle bi tane bulayım!', allowedMentions: { repliedUser: false } }).then(message => {
		axios('https://api.jbh.rocks/image', { responseType: 'arraybuffer' }).then((res) => {
			msg.reply({ files: [res.data], allowedMentions: { repliedUser: false } });
			message.delete();
		}).catch(err => {
			msg.reply({ content: 'Bir hata oluştu!', allowedMentions: { repliedUser: false } });
			message.delete();
		});
	});
}

module.exports.help = {
	name: 'floppa',
	aliases: ['karakulak']
};