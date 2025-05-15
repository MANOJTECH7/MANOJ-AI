const axios = require('axios');
const { cmd } = require('../command');
const { getBuffer } = require('../lib/functions');

cmd({
  pattern: 'ss',
  alias: ['ssw'],
  react: '🛠️',
  desc: 'Capture a screenshot of a given URL.',
  category: 'other',
  use: '.ss <link>',
  filename: __filename,
},
async (client, message, input, { from: chatId, q: query, reply }) => {
  if (!query) {
    return reply('Please provide a URL to capture the screenshot.');
  }

  try {
    const apiUrl = `https://api.giftedtech.web.id/api/tools/ssweb?apikey=gifted&url=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    const messageOptions = {
      image: imageBuffer,
      caption: '*SCREENSHOT DOWNLOADER*\n\n\n> Zaynix-MD',
      contextInfo: {
        mentionedJid: [message.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363395450355640@newsletter',
          newsletterName: 'Manoj-Ai',
          serverMessageId: 143,
        },
      },
    };

    await client.sendMessage(chatId, messageOptions, { quoted: message });
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    await reply('Failed to capture the screenshot. Please try again later.');
  }
});