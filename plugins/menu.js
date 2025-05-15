const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const imageUrl = 'https://files.catbox.moe/zxtxit.jpg';

cmd({
    pattern: "menu",
    react: "📜",
    alias: ["panel", "commands"],
    desc: "Get Bot Menu",
    category: "main",
    use: '.menu',
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const selectionMessage = `
╭━━〔 𝐌𝐚𝐧𝐨𝐣 𝐀𝐢 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐌𝐞𝐧𝐮 〕━━━╮
│ 👋 Hello, ${pushname}!
│ Welcome to Manoj-Ai. Choose a category below!
╰━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 📚 Categories & Details 〕───╮
│
│ 1. 📥 Download Menu
> │ ➤ Download videos, music, apps & more.
│
│ 2. 🔎 *Search Menu*
> │    ➤ Search across YouTube, Google, TikTok, etc.
│
│ 3. 🧠 *AI Menu*
> │    ➤ Talk with AI bots, generate images/text.
│
│ 4. 👨‍💻 *Owner Menu*
> │    ➤ Special tools only for bot owner.
│
│ 5. 👥 *Group Menu*
> │    ➤ Manage and enhance your groups easily.
│
│ 6. 💾 *Info Menu*
> │    ➤ Get bot info, user info, and system stats.
│
│ 7. 🔄 *Converter Menu*
> │    ➤ Convert files (PDF, MP3, MP4, etc.) in seconds.
│
│ 8. ⛱️ *Random Menu*
> │    ➤ Fun commands like jokes, facts, games.
│
│ 9. 🏜️ *Wallpapers Menu*
> │    ➤ Download HD & 4K wallpapers of all types.
│
│ 10. 🌐 *Other Menu*
> │    ➤ Extra utilities and hidden features.
│
│ 11. 📌 *Auto Menu*
> │➤ Setup auto replies, welcome, anti-delete, etc.
│
╰──────────────────────
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;

await conn.sendMessage(from, {
        video: {
            url: 'https://github.com/XdTechDev/DATA/blob/main/Video.Guru_20250427_123344704.mp4?raw=true'
        },
        mimetype: 'video/mp4',
        ptv: true
    }, { quoted: mek });
    
        const sentMsg = await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: selectionMessage,
            contextInfo: { forwardingScore: 999, isForwarded: true },
        }, { quoted: mek });

        // පරිශීලක ප්‍රතිචාර ලබා ගැනීම
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userResponse = msg.message.extendedTextMessage.text.trim();
            if (msg.message.extendedTextMessage.contextInfo &&
                msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {

                let responseText;

                switch (userResponse) {
                    case '1': // DOWNLOAD MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 📥 *Download Menu* 📥
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *song*       - Download Song
│ 2. *video*      - Download Video
│ 3. *xv*         - Download XV Content
│ 4. *xvideo*     - Download X Video
│ 5. *mp3*        - Download MP3 Audio
│ 6. *song1*      - Download Song (Alt)
│ 7. *video1*     - Download Video (Alt)
│ 8. *tiktok*     - Download TikTok Video
│ 9. *fb*         - Download Facebook Video
│ 10. *insta*     - Download Instagram Content
│ 11. *twitter*   - Download Twitter Content
│ 12. *mediafire* - Download from MediaFire
│ 13. *apk*       - Download APK File
│ 14. *gdrive*    - Download from Google Drive
│ 15. *ringtone*  - Download Ringtone
│ 16. *ytpost*    - Download YouTube Post
│ 17. *pindl*     - Download from Pinterest
│ 18. *img*       - Download Image
│ 19. *mega*      - Download from Mega
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '2': // SEARCH MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 🔎 *Search Menu* 🔎
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *film*        - Search for Films
│ 2. *moviedl*     - Download Movie
│ 3. *firemovie*   - Search Fire Movies
│ 4. *hirucheck*   - Check Hiru News
│ 5. *derananews*  - Get Derana News
│ 6. *news*        - Latest News Updates
│ 7. *movieinfo*   - Get Movie Information
│ 8. *srepo*       - Search Repositories
│ 9. *ringtone*    - Search for Ringtones
│ 10. *tiks*       - Search TikTok Content
│ 11. *ttstalk*    - TikTok Stalk User
│ 12. *ss*         - Take Screenshot of Website
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '3': // AI MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 🧠 *AI Menu* 🧠
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *ai*        - General AI Query
│ 2. *ais*       - Advanced AI Search
│ 3. *openai*    - Query OpenAI
│ 4. *deepseek*  - Query DeepSeek AI
│ 5. *gemini*    - Query Gemini AI
│ 6. *genimg*    - Generate AI Image
│ 7. *aiimg*  - Generate AI Image
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '4': // OWNER MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 👨‍💻 *Owner Menu* 👨‍💻
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *vv*         - View Bot Version
│ 2. *vv2*        - View Bot Version (Alt)
│ 3. *getpp*      - Get Profile Picture
│ 4. *shutdown*   - Shut Down Bot
│ 5. *broadcast*  - Broadcast Message
│ 6. *block*      - Block User
│ 7. *unblock*    - Unblock User
│ 8. *jid*        - Get User JID
│ 9. *gjid*       - Get Group JID
│ 10. *msgall*    - Message All Users
│ 11. *restart*   - Restart Bot
│ 12. *csong*     - Change Song Settings
│ 13. *setpp*     - Set Profile Picture
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '5': // GROUP MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 👥 *Group Menu* 👥
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *mute*       - Mute Group
│ 2. *unmute*     - Unmute Group
│ 3. *promote*    - Promote Member to Admin
│ 4. *demote*     - Demote Admin to Member
│ 5. *del*        - Delete Message
│ 6. *join*       - Join Group via Link
│ 7. *leve*       - Leave Group
│ 8. *invite*     - Generate Invite Link
│ 9. *add*        - Add Member
│ 10. *end*       - End Group
│ 11. *kickall*   - Kick All Members
│ 12. *tagall*    - Tag All Members
│ 13. *hidetag*   - Hidden Tag All Members
│ 14. *tagadmin*  - Tag Group Admins
│ 15. *approve*   - Approve Group Requests
│ 16. *requests*  - View Group Requests
│ 17. *accept*    - Accept Group Request
│ 18. *reject*    - Reject Group Request
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '6': // INFO MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 💾 *Info Menu* 💾
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *alive*     - Check Bot Status
│ 2. *menu*      - Display Command Menu
│ 3. *owner*     - Get Owner Information
│ 4. *ping*      - Check Bot Latency
│ 5. *repo*      - Get Bot Repository
│ 6. *system*    - View System Info
│ 7. *setting*   - Manage Bot Settings
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '7': // CONVERTER MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 🔄 *Converter Menu* 🔄
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *sticker*   - Convert Image to Sticker
│ 2. *tourl*     - Convert Media to URL
│ 3. *removebg*  - Remove Image Background
│ 4. *tts2*      - Text-to-Speech (Voice 2)
│ 5. *tts3*      - Text-to-Speech (Voice 3)
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '8': // WALLPAPERS MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ ⛱️ *Random Menu* ⛱️
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *couplepp*    - Random Couple Profile Picture
│ 2. *asupan*      - Random Asupan Content
│ 3. *gore*        - Random Gore Content
│ 4. *china*       - Random Chinese-Themed Content
│ 5. *japan*       - Random Japanese-Themed Content
│ 6. *indonesia*   - Random Indonesian-Themed Content
│ 7. *vietnam*     - Random Vietnamese-Themed Content
│ 8. *korea*       - Random Korean-Themed Content
│ 9. *malaysia*    - Random Malaysian-Themed Content
│ 10. *thiland*    - Random Thai-Themed Content
│ 11. *happy*      - Random Happy-Themed Content
│ 12. *heart*      - Random Heart-Themed Content
│ 13. *angry*      - Random Angry-Themed Content
│ 14. *sad*        - Random Sad-Themed Content
│ 15. *shy*        - Random Shy-Themed Content
│ 16. *moon*       - Random Moon-Themed Content
│ 17. *confused*   - Random Confused-Themed Content
│ 18. *hot*        - Random Hot-Themed Content
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '9': // WALLPAPER MENU
                        responseText = `
╭━━━━━━━━━━━━━━━❖
│ 🏜️ *Wallpapers Menu* 🏜️
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *logo*       - Generate Custom Logo
│ 2. *logolist*   - List Available Logos
│ 3. *rw*         - Random Wallpaper
│ 4. *rdanime*    - Random Anime Wallpaper
│ 5. *animegirl*  - Anime Girl Wallpaper
│ 6. *animegirl1* - Anime Girl Wallpaper (Set 1)
│ 7. *animegirl2* - Anime Girl Wallpaper (Set 2)
│ 8. *animegirl3* - Anime Girl Wallpaper (Set 3)
│ 9. *animegirl4* - Anime Girl Wallpaper (Set 4)
│ 10. *animegirl5* - Anime Girl Wallpaper (Set 5)
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ*
`;
                        break;
                    case '10': // OTHER MENU
                        responseText = `
*╭━━━━━━━━━━━━━━━❖
│ 🌐 *Other Menu* 🌐
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *boom*       - Trigger Boom Effect
│ 2. *canvasbug*  - Generate Canvas Bug
│ 3. *gpass*      - Create Google Password
│ 4. *pair*       - Pair Users
│ 5. *vcf*        - Generate VCard File
│ 6. *weather*    - Check Weather Updates
│ 7. *zaynix*     - Zaynix Special Command
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    case '11': // OTHER MENU
                        responseText = `
*╭━━━━━━━━━━━━━━━❖
│ 📌 *Auto Menu* 📌
╰━━━━━━━━━━━━━━━❖

┌───✧ *Commands* ✧
│ 1. *autoai on*  - Enable Auto AI
│ 2. *autoai off* - Disable Auto AI
│ 3. *startsong*  - Start Song Updates
│ 4. *stopsong*   - Stop Song Updates
│ 5. *startnews*  - Start News Updates
│ 6. *stopnews*   - Stop News Updates
│ 7. *starttiktok* - Start TikTok Updates
│ 8. *stoptiktok* - Stop TikTok Updates
└────────────────❖

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ* 🚀
`;
                        break;
                    default:
                        responseText = "*❌ Invalid option. Please enter a valid number (1-10)*";
                }

                // තෝරාගත් මෙනුව WhatsApp chat එකට යවයි.
                await conn.sendMessage(from, { text: responseText }, { quoted: mek });
            }
        });

    } catch (e) {
        console.error(e);
        reply(`*⚠ An error occurred: ${e.message}*`);
    }
});

