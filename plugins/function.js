const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Anti-Bad Words Handler
cmd({
    on: "body"
}, async (conn, mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
        // List of Indian bad words and slang
        const badWords = [
            "chutiya", "bhenchod", "madarchod", "gandu", "harami",
            "kutta", "sala", "suar", "randi", "bhosdi",
            "fuck", "sex", "xxx", "shit", "bastard",
            "nonsense", "bloody", "idiot", "asshole", "piss"
        ];

        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, sender is admin, or bot is not admin

        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));

        if (containsBadWord && config.ANTI_BAD === 'true') {
            await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });
            await conn.sendMessage(from, {
                text: `⚠️ Inappropriate language detected! Please avoid using bad words, @${sender.split('@')[0]}.`,
                mentions: [sender]
            }, { quoted: mek });
        }
    } catch (error) {
        console.error("Anti-Bad Words Error:", error);
        reply("❌ An error occurred while processing the message.");
    }
});

// Anti-Link Handler
const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,   // WhatsApp group or chat links
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,           // Telegram links
    /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,           // YouTube links
    /https?:\/\/youtu\.be\/\S+/gi,                        // YouTube short links
    /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,          // Facebook links
    /https?:\/\/fb\.me\/\S+/gi,                           // Facebook short links
    /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,         // Instagram links
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,           // Twitter links
    /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,            // TikTok links
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,          // LinkedIn links
    /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,          // Snapchat links
    /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,         // Pinterest links
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,            // Reddit links
    /https?:\/\/ngl\/\S+/gi,                              // NGL links
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,           // Discord links
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,             // Twitch links
    /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,             // Vimeo links
    /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,       // Dailymotion links
    /https?:\/\/(?:www\.)?medium\.com\/\S+/gi             // Medium links
];

cmd({
    on: "body"
}, async (conn, mek, m, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, sender is admin, or bot is not admin

        const containsLink = linkPatterns.some(pattern => pattern.test(body));

        if (containsLink && config.ANTI_LINK === 'true') {
            // Delete the message
            await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });

            // Warn and remove the user
            await conn.sendMessage(from, {
                text: `⚠️ Links are not allowed in this group, @${sender.split('@')[0]}! You have been removed.\n\n>ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ`,
                mentions: [sender]
            }, { quoted: mek });

            // Remove the user from the group
            await conn.groupParticipantsUpdate(from, [sender], 'remove');
        }
    } catch (error) {
        console.error("Anti-Link Error:", error);
        reply("❌ An error occurred while processing the message.");
    }
});