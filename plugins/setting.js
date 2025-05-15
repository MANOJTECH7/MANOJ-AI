const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "Configure bot settings",
    category: "owner",
    react: "⚙",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        const settingsMenu = `*🌟 Manoj-Ai Settings Panel 🌟*

╭───❖ Work Mode
│ 1.1 Public Mode 🫂
│ 1.2 Private Mode ❗
│ 1.3 Group Only 👥
│ 1.4 Inbox Only 👤
╰─────────────

╭───❖ Auto Voice
│ 2.1 Enable 🔛
│ 2.2 Disable 📴
╰─────────────

╭───❖ Auto Status Seen
│ 3.1 Enable 🔛
│ 3.2 Disable 📴
╰─────────────

╭───❖ Auto Sticker
│ 4.1 Enable 🔛
│ 4.2 Disable 📴
╰─────────────

╭───❖ Auto Reply
│ 5.1 Enable 🔛
│ 5.2 Disable 📴
╰─────────────

╭───❖ Bot Online/Offline
│ 6.1 Online 🔛
│ 6.2 Offline 📴
╰─────────────

╭───❖ Message Read
│ 7.1 Enable 🔛
│ 7.2 Disable 📴
╰─────────────

╭───❖ Message React
│ 8.1 Enable 🔛
│ 8.2 Disable 📴
╰─────────────

╭───❖ Anti Link
│ 9.1 Enable 🔛
│ 9.2 Disable 📴
│ 9.3 Enable + Remove ⛔
╰─────────────

╭───❖ Auto Status React & Reply
│ 10.1 Status React Enable 🔛
│ 10.2 Status React Disable 📴
│ 10.3 Status Reply Enable 🔛
│ 10.4 Status Reply Disable 📴
╰─────────────

🔢 *Reply with the option number to change setting.*
Powered by 𝐌𝐀𝐍𝐎𝐉-𝐀𝐈 👁️`;

        const settingsMsg = await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/zxtxit.jpg" },
            caption: settingsMenu,
        }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
            const contextMsgId = msg.message.extendedTextMessage.contextInfo?.stanzaId;

            if (contextMsgId === settingsMsg.key.id) {
                const updates = {
                    '1.1': '.update MODE:public',
                    '1.2': '.update MODE:private',
                    '1.3': '.update MODE:group',
                    '1.4': '.update MODE:inbox',
                    '2.1': '.update AUTO_VOICE:true',
                    '2.2': '.update AUTO_VOICE:false',
                    '3.1': '.update AUTO_READ_STATUS:true',
                    '3.2': '.update AUTO_READ_STATUS:false',
                    '4.1': '.update AUTO_STICKER:true',
                    '4.2': '.update AUTO_STICKER:false',
                    '5.1': '.update AUTO_REPLY:true',
                    '5.2': '.update AUTO_REPLY:false',
                    '6.1': '.update ALLWAYS_OFFLINE:false',
                    '6.2': '.update ALLWAYS_OFFLINE:true',
                    '7.1': '.update READ_MESSAGE:true',
                    '7.2': '.update READ_MESSAGE:false',
                    '8.1': '.update AUTO_REACT:true',
                    '8.2': '.update AUTO_REACT:false',
                    '9.1': '.update ANTI_LINK:true',
                    '9.2': '.update ANTI_LINK:false',
                    '9.3': '.update ANTI_LINK:false\n.update ANTI_LINKK:false',
                    '10.1': '.update AUTO_REACT_STATUS:true',
                    '10.2': '.update AUTO_REACT_STATUS:false',
                    '10.3': '.update AUTO_STATUS_REPLY:true',
                    '10.4': '.update AUTO_STATUS_REPLY:false',
                };

                if (updates[selectedOption]) {
                    const updateCommand = updates[selectedOption];

                    // Send the update command
                    await reply(updateCommand);

                    // Add success confirmation
                    await reply('✅ Setting updated successfully!');

                    // Optional: react to user message with a green tick
                    await conn.sendMessage(from, { react: { text: '✅', key: msg.key } });
                } else {
                    await reply("❌ Invalid option. Please select a valid number from the list!");
                }
            }
        });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('❌ An error occurred while processing your request. Please try again later.');
    }
});