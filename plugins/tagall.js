const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

// Random emojis and random tag lines
const emojis = ['🔥', '💀', '🚀', '⚡', '🏆', '👑', '🎯'];
const shoutouts = ['🚀 Let\'s Go Warriors!', '⚡ Stay Active!', '👑 Legends Together!', '🔥 Fire Up Squad!', '💀 No Mercy!'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Send batch mentions with customizations
async function sendCustomMentions(conn, from, mek, participantsList, header) {
  const batchSize = 25;
  for (let i = 0; i < participantsList.length; i += batchSize) {
    const batch = participantsList.slice(i, i + batchSize);
    const mentions = batch.map(p => p.id);
    let batchText = header + '\n\n';

    batch.forEach((p, idx) => {
      batchText += `${getRandomItem(emojis)} @${p.id.split('@')[0]} ${p.isAdmin ? '(Admin 📍)' : ''}\n`;
      if ((idx + 1) % 10 === 0) {
        batchText += `\n${getRandomItem(shoutouts)}\n`;
      }
    });

    await conn.sendMessage(from, {
      text: batchText.trim(),
      mentions: mentions
    }, { quoted: mek });

    await sleep(1000); // Safety delay
  }
}

// .tagall command
cmd({
  pattern: "tagall",
  desc: "Tag everyone in the group.",
  category: "group",
  react: "🏷️",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, participants, groupAdmins, isOwner, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");
    if (!isOwner && !isAdmins) return reply("❌ Only group admins can use this command.");

    const participantData = participants.map(p => ({
      id: p.id,
      isAdmin: groupAdmins.includes(p.id)
    }));

    await sendCustomMentions(conn, from, mek, participantData, '🏷️ *Tagging Everyone!*');

  } catch (error) {
    console.error(error);
    reply("⚠️ An error occurred while tagging.");
  }
});

// .tagadmin command
cmd({
  pattern: "tagadmin",
  desc: "Tag only admins of the group.",
  category: "group",
  react: "♻️",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, participants, groupAdmins, isOwner, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");
    if (!isOwner && !isAdmins) return reply("❌ Only group admins can use this command.");

    const adminData = participants
      .filter(p => groupAdmins.includes(p.id))
      .map(p => ({
        id: p.id,
        isAdmin: true
      }));

    if (adminData.length === 0) return reply("❌ No admins found!");

    await sendCustomMentions(conn, from, mek, adminData, '👑 *Tagging All Admins!*');

  } catch (error) {
    console.error(error);
    reply("⚠️ An error occurred while tagging admins.");
  }
});

// .online command
cmd({
  pattern: "online",
  desc: "Tag only online members.",
  category: "group",
  react: "🟢",
  filename: __filename
}, async (conn, mek, m, { from, isGroup, participants, groupMetadata, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const presences = groupMetadata.presences || {}; // sometimes presence isn't available

    const onlineParticipants = participants
      .filter(p => presences[p.id] && presences[p.id].lastSeen)
      .map(p => ({
        id: p.id,
        isAdmin: false
      }));

    if (onlineParticipants.length === 0) return reply("😴 No online members right now.");

    await sendCustomMentions(conn, from, mek, onlineParticipants, '🟢 *Tagging Online Members!*');

  } catch (error) {
    console.error(error);
    reply("⚠️ An error occurred while tagging online members.");
  }
});