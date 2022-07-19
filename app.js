const { Client, ActivityType } = require('discord.js');
const fs = require('fs');
var config = require('./config.json');

const bot = new Client({ intents: ["Guilds", "GuildMessages", 'MessageContent'] });
bot.login(config.token);

bot.commands = new Map();

bot.once('ready', () => {
	console.log(bot.user.tag, 'olarak giriş yapıldı!');

	bot.user.setPresence({ activities: [{ name: '!cmds', type: ActivityType.Watching }], status: 'online' });

	fs.readdir('./cmds/', (error, files) => {
		files.forEach(file => {
			if (!file.endsWith('.js')) return;

			const properties = require(`./cmds/${file}`);

			properties.help.aliases.forEach(alias => {
				bot.commands.set(alias, properties);
			});

			bot.commands.set(properties.help.name, properties);
		})
	})
});

var spam = [];
var PREFIX = "!";

bot.on('messageCreate', (msg) => {
	// Bot ve Spam Kontrolü
	if (msg.author.bot) return;
	if (spam.includes(msg.author.id)) return;

	// Komut kontrolü
	var args = msg.content.substring(1).split(' ');
	var cmd = args[0];
	if (msg.content[0] != PREFIX) return;

	var command = bot.commands.get(cmd);
	if (command) command.run(bot, msg, bot.commands);
	if (!command) return;

	// Anti-Spam
	if (!msg.member.permissions.has('ADMINISTRATOR')) {
		spam.push(msg.author.id);
		setTimeout(() => spam = spam.filter(e => e != msg.author.id), config.spamtime * 1000);
	}

	// Log
	var logtext = `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} | ${msg.author.tag}(${msg.author.id}) ${cmd} komutunu kullandı (guild: ${msg.guildId} - channel: ${msg.channelId})`;
	console.log(logtext);
	fs.appendFileSync('log.txt', '\n' + logtext);
});