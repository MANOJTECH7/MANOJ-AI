const {
  cmd
} = require('../command');
const yts = require('yt-search');
const axios = require('axios');
function _0x382d8a(_0x425c40, _0x273e6f, _0x423233, _0xd0ab8e, _0x44fbe3) {
  return _0x36e2(_0xd0ab8e + 807, _0x423233);
}
function _0x32622f(_0x17e0a4, _0x2ba9a1, _0x31c395, _0x5eaff9, _0xcfe15a) {
  return _0x36e2(_0x2ba9a1 + 906, _0xcfe15a);
}
function _0x14e7() {
  const _0x4147ef = ["Error", "web/r", "w.git", "R-LAK", "tent.", "atch?", "1702655nmglsh", "messa", "SIDU/", "eHash", "com/w", "6AgzZXm", "g.jso", "599928kwlpck", "3044902jiqMut", "://ww", "com/M", "OnrCL", "4rnXNnz", "2122IkGEuT", "ercon", "efs/h", "qOhtY", "test-", "2846943bDftdi", "iBot2", "hubus", "data", "3722059JMqnnP", "error", "tube.", "8OjWHZT", "3VjmWuk", "://ra", "hing ", "https", "get", "19254372kpQKtZ", "match", " fetc", "KNGRT", "confi", "025", "w.you", "eads/", "20ucUbcr", "main/", "Secur"];
  _0x14e7 = function () {
    return _0x4147ef;
  };
  return _0x14e7();
}
function _0x3057b0(_0x181cdb, _0x389f0b, _0x259f29, _0xa82129, _0x4f9579) {
  return _0x36e2(_0x389f0b - 555, _0x181cdb);
}
(function (_0x54ff5d, _0x5b296c) {
  const _0x330792 = _0x54ff5d();
  while (true) {
    try {
      const _0x3ac826 = parseInt(_0x36e2(292, 238)) / 1 * (parseInt(_0x36e2(291, 742)) / 2) + parseInt(_0x36e2(305, 269)) / 3 * (parseInt(_0x36e2(286, 224)) / 4) + -parseInt(_0x36e2(279, 219)) / 5 * (parseInt(_0x36e2(284, -55)) / 6) + -parseInt(_0x36e2(287, 222)) / 7 * (parseInt(_0x36e2(304, 765)) / 8) + parseInt(_0x36e2(297, 1092)) / 9 + -parseInt(_0x36e2(270, -85)) / 10 * (parseInt(_0x36e2(301, 1104)) / 11) + parseInt(_0x36e2(310, 251)) / 12;
      if (_0x3ac826 === _0x5b296c) {
        break;
      } else {
        _0x330792.push(_0x330792.shift());
      }
    } catch (_0x2d21d3) {
      _0x330792.push(_0x330792.shift());
    }
  }
})(_0x14e7, 622829);
function _0x36e2(_0x4fe5cd, _0x5b8505) {
  const _0x35ca62 = _0x14e7();
  _0x36e2 = function (_0x33749b, _0x131fa1) {
    _0x33749b = _0x33749b - 266;
    let _0x4d0678 = _0x35ca62[_0x33749b];
    return _0x4d0678;
  };
  return _0x36e2(_0x4fe5cd, _0x5b8505);
}
function _0x265d1e(_0x9b06f, _0x41be77, _0x168ec3, _0x498821, _0x553bce) {
  return _0x36e2(_0x498821 + 187, _0x168ec3);
}
async function fetchConfig() {
  try {
    const _0x3d134e = await axios.get("https://raw.githubusercontent.com/MR-LAKSIDU/test-web/refs/heads/main/config.json");
    return _0x3d134e.data;
  } catch (_0x382102) {
    console.error("Error fetching config.json:", _0x382102.message);
    return null;
  }
}
function extractYouTubeId(_0x135bdc) {
  const _0x28b996 = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const _0x4c33f6 = _0x135bdc.match(_0x28b996);
  return _0x4c33f6 ? _0x4c33f6[1] : null;
}
function convertYouTubeLink(_0x1afe46) {
  const _0x4e19e1 = extractYouTubeId(_0x1afe46);
  if (_0x4e19e1) {
    return "https://www.youtube.com/watch?v=" + _0x4e19e1;
  }
  return _0x1afe46;
}
cmd({
  pattern: "video",
  alias: "vid",
  desc: "To download MP4 video or document from YouTube by searching for video names.",
  react: "🎥",
  category: "video",
  use: ".video <video name>",
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
    const config = await fetchConfig();
    if (!config || typeof config !== "object" || !config.secureKey || config.secureKey !== "SecureHashiBot2025") {
      return reply("*`Authentication Invalid or missing `*");
    }
    q = q ? q : '';
    if (!q) {
      return reply("*`Please provide a video name to search for.`*");
    }
    reply("*_📹 Video found, uploading please wait..._*");
    const search = await yts(q);
    if (!search.videos || search.videos.length === 0) {
      return reply("❌ No results found for \"" + q + "\".");
    }
    const data = search.videos[0];
    const url = data.url;
    const _0x147705 = {
      title: data.title || config.songDetails.title || "Unknown Title",
      timestamp: data.timestamp || config.songDetails.timestamp || "Unknown Duration"
    };
    _0x147705.views = data.views || config.songDetails.views || "Unknown Views";
    _0x147705.ago = data.ago || config.songDetails.ago || "Unknown Date";
    const sentMsg = await conn.sendMessage(from, {
      image: {
        url: data.thumbnail
      },
      caption: `
  「💾𝐌𝐀𝐍𝐎𝐉-𝐀𝐈 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐃𝐄𝐑💾」

┏━❮ 🩵MANOJ-AI🩵 ❯━
┃🤖 *Title:* ${_0x147705.title}
┃📑 *Duration:* ${_0x147705.timestamp}
┃🔖 *Views:* ${_0x147705.views}
┃📟 *Uploaded On:* ${_0x147705.ago}
┗━━━━━━━━━━━━━━𖣔𖣔
╭━━〔🔢 *Reply to Download*〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃•1 | Download Video (MP4) 🎥
┃◈┃•2 | Download Document 📁
┃◈└───────────┈⊷
╰──────────────┈⊷

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
`,
      contextInfo: {
        mentionedJid: ['917005439105@s.whatsapp.net'],
        groupMentions: [],
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363395450355640@newsletter',
          newsletterName: "Manoj-Ai",
          serverMessageId: 999
        }
      }
    }, {
      quoted: mek
    });
    const messageID = sentMsg.key.id;

    // Listen for user response
    conn.ev.on('messages.upsert', async messageUpdate => {
      const mek = messageUpdate.messages[0];
      if (!mek.message) {
        return;
      }
      const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
      const fromReply = mek.key.remoteJid;
      // Check if the message is a reply to the previously sent message
      const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;
      if (isReplyToSentMsg) {
        if (messageType === '1' || messageType === '2') {
          // Re-verify authentication before downloading
          const config = await fetchConfig();
          if (!config || typeof config !== 'object' || !config.secureKey || config.secureKey !== "SecureHashiBot2025") {
            return reply("*`Authentication failed! Invalid `*");
          }

          // React to the user's reply
          await conn.sendMessage(fromReply, {
            react: {
              text: '⬇️',
              key: mek.key
            }
          });

          // Use the new API for downloading video
          const apiUrl = "https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=" + encodeURIComponent(url);
          const response = await axios.get(apiUrl);
          if (!response.data.success) {
            return reply("❌ Failed to fetch video for \"" + q + "\".");
          }
          const {
            download_url: downloadUrl
          } = response.data.result;

          // Send based on user choice
          if (messageType === '1') {
            // Video (MP4)
            await conn.sendMessage(fromReply, {
              video: {
                url: downloadUrl
              },
              mimetype: "video/mp4",
              caption: _0x147705.title,
              contextInfo: {
                externalAdReply: {
                  title: _0x147705.title,
                  body: data.videoId,
                  mediaType: 2,
                  sourceUrl: data.url,
                  thumbnailUrl: "https://files.catbox.moe/zxtxit.jpg",
                  renderLargerThumbnail: true,
                  showAdAttribution: true
                }
              }
            }, {
              quoted: mek
            });
          } else if (messageType === '2') {
            // Document
            await conn.sendMessage(fromReply, {
              document: {
                url: downloadUrl
              },
              mimetype: "video/mp4",
              fileName: `${_0x147705.title}.mp4`,
              caption: "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ"
            }, {
              quoted: mek
            });
          }
          await conn.sendMessage(fromReply, {
            react: {
              text: '⬆️',
              key: mek.key
            }
          });
        }
      }
    });
  } catch (e) {
    console.error(e);
    reply("❌ An error occurred while processing your request.");
  }
});