const { cmd } = require('../command');
const yts = require('yt-search');
const ddownr = require('denethdev-ytmp3');
const axios = require('axios');

// Fetch configuration from a remote JSON file
async function fetchConfig() {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/MR-LAKSIDU/test-web/refs/heads/main/config.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching config.json:', error.message);
    return null;
  }
}

// Extract YouTube video ID from a URL
function extractYouTubeId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Convert any YouTube link to a standard watch URL
function convertYouTubeLink(url) {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
}

// Command to download and send a song as a voice note
cmd({
  pattern: 'csong',
  alias: 'play4',
  desc: 'To download songs as voice notes and send to a specific WhatsApp JID or newsletter.',
  react: '🎵',
  category: 'download',
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply, sender }) => {
  try {
    // Fetch and validate configuration
    const config = await fetchConfig();
    if (!config || !config.authPassword || config.authPassword !== 'YourSecretPassword123') {
      return reply('*`Authentication failed! Invalid or missing password in config.`*');
    }

    // Validate input
    if (!q) {
      return reply('*`Need song title/URL and WhatsApp JID`* \nExample: .csong Believer 120363395450355640@newsletter');
    }

    const parts = q.split(' ');
    if (parts.length < 2) {
      return reply('*`Please provide both song title/URL and JID`* \nExample: .csong Believer 120363395450355640@newsletter');
    }

    const jid = parts.pop();
    const songQuery = parts.join(' ');

    // Validate JID format
    if (!jid.includes('@s.whatsapp.net') && !jid.includes('@g.us') && !jid.includes('@newsletter')) {
      return reply('*`Invalid JID format. Use a valid WhatsApp JID (e.g., @1234567890@s.whatsapp.net, @1234567890@g.us, or 120363395450355640@newsletter)`*');
    }

    // Search for the song on YouTube
    const query = convertYouTubeLink(songQuery);
    const search = await yts(query);
    const data = search.videos[0];
    if (!data) {
      return reply('*`No results found`*');
    }

    const url = data.url;
    const songDetails = {
      title: data.title || config.songDetails?.title || 'Unknown Title',
      timestamp: data.timestamp || config.songDetails?.timestamp || 'Unknown Duration',
      views: data.views || config.songDetails?.views || 'Unknown Views',
      ago: data.ago || config.songDetails?.ago || 'Unknown Date'
    };

    // Send song details with thumbnail
    await conn.sendMessage(jid, {
      image: { url: data.thumbnail },
      caption: `
「𝐌𝐀𝐍𝐎𝐉-𝐀𝐈 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄」

┏━❮ 🎵𝐌𝐀𝐍𝐎𝐉-𝐀𝐈🎵 ❯━
┃🤖 *Title:* ${songDetails.title}
┃📑 *Duration:* ${songDetails.timestamp}
┃🔖 *Views:* ${songDetails.views}
┃📟 *Uploaded On:* ${songDetails.ago}
┗━━━━━━━━━━━━━━𖣔𖣔

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
`,
      contextInfo: {
        mentionedJid: ['919341378016@s.whatsapp.net'],
        groupMentions: [],
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '--',
          newsletterName: '𝐌𝐀𝐍𝐎𝐉-𝐀𝐈',
          serverMessageId: 999
        }
      }
    }, { quoted: null });

    // Indicate download in progress
    await conn.sendMessage(jid, {
      react: { text: '⬇️', key: { remoteJid: jid, fromMe: true, id: mek.key.id } }
    });

    // Download the audio as MP3
    const result = await ddownr.download(url, 'mp3');
    const downloadLink = result.downloadUrl;

    // Indicate upload in progress
    await conn.sendMessage(jid, {
      react: { text: '⬆️', key: { remoteJid: jid, fromMe: true, id: mek.key.id } }
    });

    // Send the audio as a voice note (PTT)
    await conn.sendMessage(jid, {
      audio: { url: downloadLink },
      mimetype: 'audio/mpeg',
      ptt: true,
      contextInfo: {
        externalAdReply: {
          title: songDetails.title,
          body: data.videoId,
          mediaType: 1,
          sourceUrl: data.url,
          thumbnailUrl: data.thumbnail,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: null });

    // Notify the sender of success
    await reply(`*🤖Song "${songDetails.title}" was successfully sent to ${jid} as a voice note!*\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ`);
  } catch (error) {
    console.error(error);
    reply('*`Error occurred while downloading or sending`* \nDetails: ' + error.message);
  }
});