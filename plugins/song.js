const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require("axios");

cmd({
    pattern: "song",
    alias: "play",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        q = q ? q : ''; // Ensure q is not undefined
        if (!q) return reply("*`Need YT_URL or Title`*");

       
        reply("*_🎵 Song found, uploading please wait..._*");
        const search = await yts(q);
        if (!search.videos || search.videos.length === 0) {
            return reply("❌ No results found for \"" + q + "\".");
        }

        const data = search.videos[0];
        const url = data.url;

       
        let desc = `
 「𝐌𝐀𝐍𝐎𝐉-𝐀𝐈 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐃𝐄」

┏━❮ 🎵Manoj-Ai🎵 ❯━
┃🤖 *Title:* ${data.title}
┃📑 *Duration:* ${data.timestamp}
┃🔖 *Views:* ${data.views}
┃📟 *Uploaded On:* ${data.ago}
┗━━━━━━━━━━━━━━𖣔𖣔
╭━━〔🔢 *Reply Number*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | Download Audio 🎧
┃◈┃•2 | Download Document 📁
┃◈└───────────┈⊷
╰──────────────┈⊷
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: data.thumbnail },
            caption: desc,
            contextInfo: {
                mentionedJid: ['919341378016@s.whatsapp.net'],
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363385281017920@newsletter',
                    newsletterName: "𝐌𝐀𝐍𝐎𝐉-𝐀𝐈",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        // Listen for user response
        conn.ev.on('messages.upsert', async (messageUpdate) => {
            const mek = messageUpdate.messages[0];
            if (!mek.message) return;
            const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
            const fromReply = mek.key.remoteJid;
            const senderReply = mek.key.participant || mek.key.remoteJid;

            // Check if the message is a reply to the previously sent message
            const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToSentMsg) {
                if (messageType === '1' || messageType === '2' || messageType === '3') {
                    // React to the user's reply
                    await conn.sendMessage(fromReply, { react: { text: '⬇️', key: mek.key } });

                    // Use the new API for downloading
                    const apiUrl = "https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=" + encodeURIComponent(url);
                    const response = await axios.get(apiUrl);

                    if (!response.data.success) {
                        return reply("❌ Failed to fetch audio for \"" + q + "\".");
                    }

                    const { download_url: downloadUrl } = response.data.result;

                    // Send based on user choice
                    if (messageType === '1') { // Audio
                        await conn.sendMessage(fromReply, {
                            audio: { url: downloadUrl },
                            mimetype: "audio/mp4",
                            ptt: false,
                            contextInfo: {
                                externalAdReply: {
                                    title: data.title,
                                    body: data.videoId,
                                    mediaType: 1,
                                    sourceUrl: data.url,
                                    thumbnailUrl: "https://files.catbox.moe/zxtxit.jpg",
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        }, { quoted: mek });
                    } else if (messageType === '2') { // Document
                        await conn.sendMessage(fromReply, {
                            document: { url: downloadUrl },
                            mimetype: "audio/mp3",
                            fileName: `${data.title}.mp3`,
                            caption: "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ"
                        }, { quoted: mek });
                    } else if (messageType === '3') { // Voice
                        await conn.sendMessage(fromReply, {
                            audio: { url: downloadUrl },
                            mimetype: "audio/mp4",
                            ptt: true,
                            contextInfo: {
                                externalAdReply: {
                                    title: data.title,
                                    body: data.videoId,
                                    mediaType: 1,
                                    sourceUrl: data.url,
                                    thumbnailUrl: "https://files.catbox.moe/zxtxit.jpg",
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        }, { quoted: mek });
                    }

                    await conn.sendMessage(fromReply, { react: { text: '⬆️', key: mek.key } });
                }
            }
        });

   

    } catch (e) {
        console.log(e);
        reply("❌ An error occurred while processing your request.");
    }
});