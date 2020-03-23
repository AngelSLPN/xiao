const Command = require('../../structures/Command');
const { loadImage } = require('canvas');
const request = require('node-superfetch');
const { hasAlpha } = require('../../util/Canvas');

module.exports = class HasTransparencyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'has-transparency',
			aliases: ['has-alpha', 'transparency', 'transparent', 'alpha'],
			group: 'meme-gen',
			memberName: 'has-transparency',
			description: 'Determines if an image has transparency in it.',
			throttling: {
				usages: 1,
				duration: 10
			},
			args: [
				{
					key: 'image',
					prompt: 'What image would you like to test?',
					type: 'image',
					default: msg => msg.author.displayAvatarURL({ format: 'png', size: 512 })
				}
			]
		});
	}

	async run(msg, { image }) {
		try {
			const { body } = await request.get(image);
			const data = await loadImage(body);
			return msg.say(`This image **${hasAlpha(data) ? 'has' : 'does not have'}** transparency.`);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
