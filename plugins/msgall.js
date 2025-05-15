const { cmd, commands } = require('../command');

cmd({
  pattern: "msgall",
  desc: "Send a message to everyone's private inbox from the group.",
  category: "group",
  react: "📩",
  use: ".msgall [your message]",
  filename: __filename
}, async (conn, mek, m, { from, q, isGroup, groupMetadata, participants, isOwner, isAdmins, groupAdmins, reply }) => {
  try {
    if (!isGroup) {
      return reply("*This command can only be used in groups.*");
    }
    if (!isOwner) {
      return reply("*Only the bot owner can use this command.*");
    }
    if (!participants || participants.length === 0) {
      return reply("*No participants found in this group.*");
    }

    // If no custom message, use default message
    const customMessage = q ? q : "Hello to everyone from the group! 👋";

    let sentCount = 0;
    const totalMembers = participants.length;

    for (let participant of participants) {
      const targetJid = participant.id;
      const isAdmin = groupAdmins.includes(targetJid);

      const inboxMessage = `
*Message:* ${customMessage}

> Manoj-Ai
`;

      try {
        await conn.sendMessage(targetJid, { text: inboxMessage });
        sentCount++;
      } catch (e) {
        console.error(`Failed to send inbox message to ${targetJid}:`, e);
      }
    }

    // Confirmation message in group
    await conn.sendMessage(from, {
      text: `*✅ Successfully sent message to ${sentCount}/${totalMembers} members' inboxes!*\n\n*Message Sent:* _${customMessage}_\n\n> Manoj-Ai`
    }, { quoted: mek });

  } catch (error) {
    console.error("Error while sending inbox messages:", error);
    reply("*An error occurred. Please try again.*");
  }
});