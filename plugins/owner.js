const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "☠️", // Reaction emoji when the command is triggered
    alias: ["romek", "bhai"],
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        // Owner's contact info
        const ownerNumber = '+917005539105'; // Replace this with the actual owner number
        const ownerName = 'MANOJ-XD'; // Replace this with the owner's name
        const organization = '*MANOJ-XD* WHATSAPP BOT DEVELOPER 😈'; // Optional: replace with the owner's organization
        
        // Send introductory video
        await conn.sendMessage(from, {
            video: { 
                url: 'https://github.com/XdTechDev/DATA/blob/main/Video.Guru_20250427_123344704.mp4?raw=true' 
            },
            mimetype: 'video/mp4',
            ptv: true
        }, { quoted: mek });

        // Create a vCard (contact card) for the owner
        const vcard = `BEGIN:VCARD\n` +
                      `VERSION:3.0\n` +
                      `FN:${ownerName}\n` +  // Full Name
                      `ORG:${organization};\n` +  // Organization (Optional)
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` +  // WhatsApp ID and number
                      `END:VCARD`;

        // Send the vCard first
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send a reply message that references the vCard
        await conn.sendMessage(from, {
            text: `𝐌𝐀𝐍𝐎𝐉-𝐀𝐈 𝗢𝗪𝗡𝗘𝗥: ${ownerName}\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ*`,
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], // Corrected mentioning of the owner
                quotedMessageId: sentVCard.key.id // Reference the vCard message
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { text: 'Sorry, there was an error fetching the owner contact.' }, { quoted: mek });
    }
});