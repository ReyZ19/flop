const { Client, MessageEmbed, Message } = require("discord.js");
const { getAverageColor } = require('fast-average-color-node');

/**
 * @param {Client} bot
 * @param {Message} msg
 * @param {Map} map
 */
module.exports.run = async (bot, msg) => {
	async function reply(user) {
		var color = await getAverageColor(user.avatarURL({ dynamic: true, size: 1024, format: 'png' }));
		msg.reply({
			embeds: [new MessageEmbed()
				.setColor(color.hex)
				.setDescription(
					`${user}\r\n` +
					`[[PNG](${user.avatarURL({ dynamic: true, size: 1024, format: 'png' })})] ` +
					`[[GIF](${user.avatarURL({ dynamic: true, size: 1024, format: 'gif' })})] ` +
					`[[JPG](${user.avatarURL({ dynamic: true, size: 1024, format: 'jpg' })})]`
				)
				.setImage(user.avatarURL({ dynamic: true, size: 1024 }))],
			allowedMentions: { repliedUser: false }
		})
	}
	function hata(message) {
		msg.reply({
			embeds: [new MessageEmbed()
				.setColor('RED')
				.setTitle("⚠️ Hata!")
				.setDescription(message)]
			, allowedMentions: { repliedUser: false }
		});
	}

	if (msg.mentions.users.first() == undefined || msg.mentions.users.first() == msg.author) {
		if (msg.content.split(' ')[1] == undefined || isNaN(msg.content.split(' ')[1]) || msg.content.split(' ')[1].length != 18) {
			await reply(msg.author);
		}
		else {
			bot.users.fetch(msg.content.split(' ')[1]).then((user) => {
				if (user.avatarURL({ dynamic: true }) == null) {
					hata(`${user} kullanıcısının avatarı yok!`);
				}
				else {
					reply(user);
				}
			}).catch(err => {
				hata("Bu ID'ye sahip bir kullanıcı yok!");
			})
		}
	}
	else {
		if (msg.mentions.users.first().avatarURL({ dynamic: true }) == null) {
			hata(`${msg.mentions.users.first()} kullanıcısının avatarı yok!`);
		}
		else {
			reply(msg.mentions.users.first());
		}
	}
}

module.exports.help = {
	name: 'pp',
	aliases: ['avatar']
};