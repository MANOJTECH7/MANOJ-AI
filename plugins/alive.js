const { cmd } = require('../command');
const os = require('os');
const { runtime } = require('../lib/functions');

cmd({
    pattern: 'alive',
    alias: ['status', 'runtime', 'uptime'],
    desc: 'Check uptime and system status',
    category: 'main',
    react: '👋',
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    command,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    try {
        // System status message
        const status = `
┌──[ 𝐌𝐀𝐍𝐎𝐉-𝐀𝐈 ]──┐
│
├ ☉ 𝐆𝐫𝐞𝐞𝐭𝐢𝐧𝐠𝐬: ${pushname}
├ ⏱ 𝐔𝐩𝐭𝐢𝐦𝐞: ${runtime(process.uptime())}
├ ⚙ 𝐑𝐀𝐌: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
├ 👾 𝐎𝐰𝐧𝐞𝐫: MANOJ-TECH
│
└──────────────┘
🔰 MANOJ-AI WhatsApp Bot
Created by MANOJ-TECH
---
👉 Join Our WhatsApp Channel:
https://whatsapp.com/channel/0029VbAPyL38PgsICHcPmB2t

👉 Join Our Support Group:
https://chat.whatsapp.com/KDEtlVVu9fvActTmsVDuZA

> 𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ | 𝐌ᴀɴᴏᴊ-𝐓ᴇᴄʜ`;

        // Send status message with image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/zxtxit.jpg' },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363385281017920@newsletter',
                    newsletterName: '𝐌𝐀𝐍𝐎𝐉-𝐀𝐈',
                    serverMessageId: 190
                },
                externalAdReply: {
                    title: '𝐌𝐀𝐍𝐎𝐉-𝐀𝐈',
                    body: '𝐌𝐀𝐍𝐎𝐉-𝐀𝐈',
                    mediaType: 1,
                    sourceUrl:'https://files.catbox.moe/zxtxit.jpg',
                    thumbnailUrl: 'https://files.catbox.moe/zxtxit.jpg',
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error('Error in alive command:', e);
        reply(`An error occurred: ${e.message}`);
    }
});