const { cmd, commands } = require('../command');
const yts = require('yt-search');
const { fetchJson } = require('../lib/functions');
const ddownr = require('denethdev-ytmp3');

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

// Function to get a random Hindi song
async function getRandomSong() {
    const hindiKeywords = ['Bollywood songs', 'Hindi music', 'Arijit Singh songs', 'Shreya Ghoshal songs', 'Latest Hindi songs', 'Romantic Hindi songs', 'Hindi party songs', '90s Bollywood songs', 'Hindi sad songs', 'Hindi remix songs'];
    const randomKeyword = hindiKeywords[Math.floor(Math.random() * hindiKeywords.length)];
    const search = await yts(randomKeyword);
    const videos = search.videos;
    return videos[Math.floor(Math.random() * videos.length)]; // Select a random song
}

cmd({
    pattern: "song",
    alias: "play",
    desc: "Download songs.",
    react: "🎵",
    category: "Download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        q = convertYouTubeLink(q);
        if (!q) return reply("*`YT_URL or title required`*");

        reply("*_🎵 Song found, starting download..._*");
        const search = await yts(q);
        if (!search.videos || search.videos.length === 0) {
            return reply("❌ No results found for \"" + q + "\".");
        }

        const data = search.videos[0];
        const url = data.url;

        let desc = `
┏「𝐌𝐀𝐍𝐎𝐉-𝐀𝐈」

┏━❮ 𝐌𝐀𝐍𝐎𝐉-𝐀𝐈 ❯━
┃🤖 *Title:* ${data.title}
┃📑 *Duration:* ${data.timestamp}
┃🔖 *Views:* ${data.views}
┃📟 *Uploaded:* ${data.ago}
┗━━━━━━━━━━━━━━𖣔𖣔
╭━━〔🔢 *Reply Number*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | Download Audio 🎧
┃◈┃•2 | Download Document 📁
┃◈┃•3 | Download Voice 🎤
┃◈└───────────┈⊷
╰──────────────┈⊷
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
`;
        let info = `
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc,
            contextInfo: {
                mentionedJid: ['ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ@s.whatsapp.net'],
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: "𝐌𝐀𝐍𝐎𝐉-𝐀𝐈",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const from = mek.key.remoteJid;
            const sender = mek.key.participant || mek.key.remoteJid;

            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                if (messageType === '1' || messageType === '2' || messageType === '3') {
                    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

                    const result = await ddownr.download(url, 'mp3'); // Download in mp3 format
                    const downloadLink = result.downloadUrl;

                    if (messageType === '1') { // Audio
                        await conn.sendMessage(from, {
                            audio: { url: downloadLink },
                            mimetype: "audio/mpeg",
                            contextInfo: {
                                externalAdReply: {
                                    title: data.title,
                                    body: data.videoId,
                                    mediaType: 1,
                                    sourceUrl: data.url,
                                    thumbnailUrl: data.thumbnail,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        }, { quoted: mek });
                    } else if (messageType === '2') { // Document
                        await conn.sendMessage(from, {
                            document: { url: downloadLink },
                            mimetype: "audio/mp3",
                            fileName: `${data.title}.mp3`,
                            caption: info
                        }, { quoted: mek });
                    } else if (messageType === '3') { // Voice
                        await conn.sendMessage(from, {
                            audio: { url: downloadLink },
                            mimetype: "audio/mpeg",
                            ptt: true,
                            contextInfo: {
                                externalAdReply: {
                                    title: data.title,
                                    body: data.videoId,
                                    mediaType: 1,
                                    sourceUrl: data.url,
                                    thumbnailUrl: data.thumbnail,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        }, { quoted: mek });
                    }

                    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
                }
            }
        });
    } catch (e) {
        console.log(e);
        reply("❌ An error occurred while processing your request.");
    }
});

// Auto Song Command for JID
cmd({
    pattern: "startsong",
    alias: "autosong",
    desc: "Start sending Hindi songs automatically every 15 minutes to a JID.",
    category: "Download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply("*`This command is for the owner only`*");

        if (!q) return reply("*`Provide a JID, e.g., .startsong ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ@s.whatsapp.net`*");

        const targetJid = q.trim();

        // Check if JID is valid
        if (!targetJid.includes('@s.whatsapp.net') && !targetJid.includes('@g.us')) {
            return reply("*`Invalid JID! Use a valid WhatsApp JID (e.g., ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ@s.whatsapp.net or group ID)`*");
        }

        reply(`Starting to send Hindi songs every 15 minutes to JID: ${targetJid}! 🎵\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ`);

        // Auto-upload function for JID
        const autoUploadSong = async () => {
            try {
                const data = await getRandomSong();
                const url = data.url;

                let desc = `
┏━❮𝐌𝐀𝐍𝐎𝐉-𝐀𝐈❯━
┃💚 *Title:* ${data.title}
┃💚 *Duration:* ${data.timestamp}
┃💚 *Views:* ${data.views}
┃💚 *Uploaded:* ${data.ago}
┗━━━━━━━━━━━━━━𖣔𖣔
*「🎧 Auto Uploading 🎧」*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
`;

                await conn.sendMessage(targetJid, {
                    image: { url: data.thumbnail },
                    caption: desc
                });

                const result = await ddownr.download(url, 'mp3');
                const downloadLink = result.downloadUrl;

                await conn.sendMessage(targetJid, {
                    audio: { url: downloadLink },
                    mimetype: "audio/mpeg",
                    contextInfo: {
                        externalAdReply: {
                            title: data.title,
                            body: data.videoId,
                            mediaType: 1,
                            sourceUrl: data.url,
                            thumbnailUrl: data.thumbnail,
                            renderLargerThumbnail: true,
                            showAdAttribution: true
                        }
                    }
                });

                console.log(`Auto-uploaded song to JID: ${data.title} -> ${targetJid}`);
            } catch (e) {
                console.error('Auto-upload error:', e);
            }
        };

        // Start auto-upload every 15 minutes
        setInterval(autoUploadSong, 15 * 60 * 1000); // 15 minutes interval

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});