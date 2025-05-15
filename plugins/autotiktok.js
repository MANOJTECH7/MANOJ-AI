/*
 *🎶 Auto TikTok Video Sending (Hindi) 🎶*
 *Usage -: .starttiktok <jid>*
 *Example -: .starttiktok 917005439105@s.whatsapp.net*
 *Please provide a valid JID 🙂❤️*
 *⚖️ Powered by: Manoj-Ai*
 */
//=============================================
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const domain = `https://mr-manul Ascendedly called this API: https://mr-manul-ofc-apis.vercel.app`;

// Auto TikTok Video Upload Command (Hindi Only)
cmd({
    pattern: "starttiktok",
    alias: ["ptpautovideo"],
    desc: "Sends TikTok videos every 15 minutes to any WhatsApp JID.",
    use: ".starttiktok <jid> | Example: .starttiktok 917005439105@s.whatsapp.net",
    react: "🎶",
    category: "Download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply("*`This command is for the owner only`*");

        if (!q) return reply("*`Provide a JID, e.g., .starttiktok 917005439105@s.whatsapp.net or 120363395450355640@newsletter`*");

        const targetJid = q.trim();

        // Check if JID is valid (supports multiple formats)
        const validFormats = ['@s.whatsapp.net', '@g.us', '@newsletter'];
        let isValid = false;

        for (let format of validFormats) {
            if (targetJid.includes(format)) {
                isValid = true;
                break;
            }
        }

        if (!isValid) {
            return reply("*`Invalid JID! Use a valid WhatsApp JID (e.g., 917005439105@s.whatsapp.net, @g.us, or @newsletter)`*");
        }

        reply(`Starting to send Hindi TikTok videos every 15 minutes to JID: ${targetJid}! 🎬\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ`);

        // Hindi TikTok specific keywords
        const hindiKeywords = [
            "Bollywood TikTok",
            "Hindi dance",
            "Indian TikTok",
            "Hindi comedy",
            "Bollywood songs TikTok",
            "Hindi love status",
            "Indian funny videos",
            "Hindi motivational",
            "Bollywood dialogue",
            "Hindi trending"
        ];

        // Auto-upload function
        const autoUploadPTP = async () => {
            try {
                // Select a random keyword
                const randomKeyword = hindiKeywords[Math.floor(Math.random() * hindiKeywords.length)];
                const response = await fetchJson(`${domain}/random-tiktok?apikey=Manul-Official-Key-3467&query=${randomKeyword}`);
                const manul = response.data;
                const title = manul.title;
                const cover = manul.cover;
                const no_watermark = manul.no_watermark;

                const desc = `
    *Manoj-Ai Auto TikTok Send*

 _~${title}~_

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
`;

                await conn.sendMessage(targetJid, {
                    video: { url: no_watermark },
                    mimetype: "video/mp4",
                    caption: desc
                });

                console.log(`Auto-uploaded Hindi TikTok video: ${title} -> ${targetJid}`);
            } catch (e) {
                console.error('Auto-upload error:', e);
            }
        };

        // Start sending every 15 minutes
        setInterval(autoUploadPTP, 15 * 60 * 1000); // 15 minutes interval

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});