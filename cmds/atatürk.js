const { Client, Message } = require("discord.js");
const axios = require('axios');

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg) => {
	await msg.reply({ content: 'Bekle...', allowedMentions: { repliedUser: false } }).then(message => {
		axios('https://ataturk.vercel.app/tr').then((res) => {
			var random = Math.floor(Math.random() * 100) + 1;
			axios(`https://ataturk-resimleri-api.herokuapp.com/images/${random}.png`, { responseType: 'arraybuffer' }).then((res1) => {
				msg.reply({ content: '> ' + res.data.quote, files: [res1.data], allowedMentions: { repliedUser: false } });
				message.delete();
			});
		});
	})
}

module.exports.help = {
	name: 'atatürk',
	aliases: ['ataturk']
};