const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    desc: "get bot repo.",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const channel = 'MANOJ-AI';
        const repolink = `╭══ 🎯 MANOJ-AI Important Links 🎯 ══╮

🔵 GitHub Repository:
👉 https://github.com/MANOJTECH7/MANOJ-AI

🚀 Deploy on Heroku:
👉 https://dashboard.heroku.com/new?template=https://github.com/MANOJTECH7/MANOJ-AI

🌐 Pair Web:
👉 https://1pair.code.zaynix.biz.id

📢 WhatsApp Channel:
👉 https://whatsapp.com/channel/0029VbAPyL38PgsICHcPmB2t

📞 Contact Owner:
👉 https://wa.me/917005439105

╰═════════════════════════════╯

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ`;

await conn.sendMessage(from, {
        video: {
            url: 'https://github.com/XdTechDev/DATA/blob/main/Video.Guru_20250427_123344704.mp4?raw=true'
        },
        mimetype: 'video/mp4',
        ptv: true
    }, { quoted: mek });

        return await conn.sendMessage(from, { 
            image: { url: "https://files.catbox.moe/zxtxit.jpg" },
            caption: repolink,contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363395450355640@newsletter',
                    newsletterName: '𝐌𝐀𝐍𝐎𝐉-𝐀𝐈',
                    serverMessageId: -1
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
