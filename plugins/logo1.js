const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
  pattern: 'logo',
  alias: ['logomaker'],
  react: '🔖',
  desc: 'Generate logos based on user input',
  category: 'Search',
  filename: __filename
}, async (conn, mek, m, { from, reply, args, sender }) => {
  try {
    const text = args.join(' ');

    if (!text) {
      reply('Please provide a search query.');
      return;
    }

    // Message content
    const messageText = `
╭──────────────
┃▸𝟭 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗕𝗹𝗮𝗰𝗸 𝗣𝗶𝗻𝗸 𝗽𝗶𝗻𝗸 𝗹𝗼𝗴𝗼 𝘄𝗶𝘁𝗵 𝗺𝗲𝗺𝗯𝗲𝗿𝘀 𝘀𝗶𝗴𝗻𝗮𝘁𝘂𝗿𝗲  
┃▸𝟮 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗕𝗹𝗮𝗰𝗸 𝗣𝗶𝗻𝗸 𝘀𝘁𝘆𝗹𝗲 
┃▸𝟯 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗦𝗶𝗹𝘃𝗲𝗿 𝟯𝗗  
┃▸𝟰 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗡𝗮𝗿𝘂𝘁𝗼  
┃▸𝟱 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗗𝗶𝗴𝗶𝘁𝗮𝗹 𝗚𝗹𝗶𝘁𝗰𝗵
┃▸𝟲 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗰𝗮𝗸𝗲  
┃▸𝟳 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗭𝗼𝗱𝗶𝗮𝗰 
┃▸𝟴 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗨𝗻𝗱𝗲𝗿𝘄𝗮𝘁𝗲𝗿 
┃▸𝟵 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗚𝗹𝗼𝘄 
┃▸𝟭𝟬 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗔𝘃𝗮𝘁𝗮𝗿 𝗴𝗼𝗹𝗱 
┃▸𝟭𝟭 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗕𝗼𝗸𝗲𝗵 
┃▸𝟭𝟮 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗙𝗶𝗿𝗲𝘄𝗼𝗿𝗸𝘀 
┃▸𝟭𝟯 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗚𝗮𝗺𝗶𝗻𝗴 𝗹𝗼𝗴𝗼 
┃▸𝟭𝟰 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗦𝗶𝗴𝗻𝗮𝘁𝘂𝗿𝗲 
┃▸𝟭𝟱 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗟𝘂𝘅𝘂𝗿𝘆 
┃▸𝟭𝟲 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗗𝗿𝗮𝗴𝗼𝗻 𝗳𝗶𝗿𝗲 
┃▸𝟭𝟳 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗤𝘂𝗲𝗲𝗻 𝗰𝗮𝗿𝗱
┃▸𝟭𝟴 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗚𝗿𝗮𝗳𝗳𝗶𝘁𝗶 𝗰𝗼𝗹𝗼𝗿   
┃▸𝟭𝟵 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗧𝗮𝘁𝘁𝗼𝗼 
┃▸𝟮𝟬 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗣𝗲𝗻𝘁𝗮𝗸𝗶𝗹𝗹 
┃▸𝟮𝟭 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗛𝗮𝗹𝗹𝗼𝘄𝗲𝗲𝗻 
┃▸𝟮𝟮 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗛𝗼𝗿𝗿𝗼𝗿    
┃▸𝟮𝟯 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗕𝗹𝗼𝗼𝗱 
┃▸𝟮𝟰 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗪𝗼𝗺𝗲𝗻'𝘀 𝗱𝗮𝘆    
┃▸𝟮𝟱 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗩𝗮𝗹𝗲𝗻𝘁𝗶𝗻𝗲 
┃▸𝟮𝟲 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗡𝗲𝗼𝗻 𝗹𝗶𝗴𝗵𝘁 
┃▸𝟮𝟳 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗚𝗮𝗺𝗶𝗻𝗴 𝗮𝘀𝘀𝗮𝘀𝘀𝗶𝗻 
┃▸𝟮𝟴 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗙𝗼𝗴𝗴𝘆 𝗴𝗹𝗮𝘀𝘀 
┃▸𝟮𝟵 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗦𝗮𝗻𝗱 𝘀𝘂𝗺𝗺𝗲𝗿 𝗯𝗲𝗮𝗰𝗵 
┃▸𝟯𝟬 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗟𝗶𝗴𝗵𝘁 
┃▸𝟯𝟭 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗠𝗼𝗱𝗲𝗿𝗻 𝗴𝗼𝗹𝗱
┃▸𝟯𝟮 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗖𝗮𝗿𝘁𝗼𝗼𝗻 𝘀𝘁𝘆𝗹𝗲 𝗴𝗿𝗮𝗳𝗳𝗶𝘁𝗶 
┃▸𝟯𝟯 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗚𝗮𝗹𝗮𝘅𝘆 
┃▸𝟯𝟰 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗔𝗻𝗼𝗻𝘆𝗺𝗼𝘂𝘀 𝗵𝗮𝗰𝗸𝗲𝗿 (𝗮𝘃𝗮𝘁𝗮𝗿 𝗰𝘆𝗮𝗻 𝗻𝗲𝗼𝗻)
┃▸𝟯𝟱 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗳𝗹𝗼𝘄𝗲𝗿 𝗰𝗮𝗸𝗲 
┃▸𝟯𝟲 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗗𝗿𝗮𝗴𝗼𝗻  𝗯𝗮𝗹𝗹 
┃▸𝟯𝟳 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗘𝗹𝗲𝗴𝗮𝗻𝘁 𝗿𝗼𝘁𝗮𝘁𝗶𝗼𝗻 
┃▸𝟯𝟴 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗪𝗿𝗶𝘁𝗲 𝘁𝗲𝘅𝘁 𝗼𝗻 𝘄𝗲𝘁 𝗴𝗹𝗮𝘀𝘀
┃▸𝟯𝟵 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗪𝗮𝘁𝗲𝗿 𝟯𝗗 
┃▸𝟰𝟬 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗥𝗲𝗮𝗹𝗶𝘀𝘁𝗶𝗰 𝘀𝗮𝗻𝗱 
┃▸𝟰𝟭 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗣𝗨𝗕𝗚 𝗺𝗮𝘀𝗰𝗼𝘁
┃▸𝟰𝟮 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗧𝘆𝗽𝗼𝗴𝗿𝗮𝗽𝗵𝘆 
┃▸𝟰𝟯 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗡𝗮𝗿𝘂𝘁𝗼 𝗦𝗵𝗶𝗽𝗽𝘂𝗱𝗲𝗻 
┃▸𝟰𝟰 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗖𝗼𝗹𝗼𝘂𝗿𝗳𝘂𝗹 𝗽𝗮𝗶𝗻𝘁 
┃▸𝟰𝟱 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗧𝘆𝗽𝗼𝗴𝗿𝗮𝗽𝗵𝘆 𝗺𝗮𝗸𝗲𝗿
┃▸𝟰𝟲 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗜𝗻𝗰𝗮𝗻𝗱𝗲𝘀𝗰𝗲𝗻𝘁
┃▸𝟰𝟳 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗖𝗮𝗿𝘁𝗼𝗼𝗻 𝘀𝘁𝘆𝗹𝗲 𝗴𝗿𝗮𝗳𝗳𝗶𝘁𝗶 
┃▸𝟰𝟴 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗚𝗮𝗹𝗮𝘅𝘆
┃▸𝟰𝟵 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗔𝗻𝗼𝗻𝘆𝗺𝗼𝘂𝘀 𝗵𝗮𝗰𝗸𝗲𝗿 (𝗮𝘃𝗮𝘁𝗮𝗿 𝗰𝘆𝗮𝗻 𝗻𝗲𝗼𝗻)
┃▸𝟱𝟬 𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗹𝗼𝗴𝗼 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗰𝗮𝗸𝗲
╰────────────────

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ`;


    // Send the message
    const sentMessage = await conn.sendMessage(from,{image: {url: `https://files.catbox.moe/mhzz0h.jpg`},caption: messageText,
    contextInfo: {
                mentionedJid: ['917005439105@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363395450355640@newsletter',
                    newsletterName: "𝐌𝐀𝐍𝐎𝐉-𝐀𝐈",
                    serverMessageId: 999
                }            
            }
     }, {quoted: mek});

    // Event listener for message responses
    conn.ev.on('messages.upsert', async (update) => {
      const message = update.messages[0];
      if (!message.message || !message.message.extendedTextMessage) {
        return;
      }

      const responseText = message.message.extendedTextMessage.text.trim();
      if (message.message.extendedTextMessage.contextInfo && message.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        // Handle different logo choices based on number
        let logoUrl;
        switch (responseText) {
          case '1':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html", text);
            break;
          case '2':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html", text);
            break;
          case '3':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html", text);
            break;
          case '4':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html", text);
            break;
          case '5':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html", text);
            break;
          case '6':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/birthday-cake-96.html", text);
            break;
          case '7':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-zodiac-online-logo-maker-491.html", text);
            break;
          case '8':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/3d-underwater-text-effect-online-682.html", text);
            break;
          case '9':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/advanced-glow-effects-74.html", text);
            break;
          case '10':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-avatar-gold-online-303.html", text);
            break;
          case '11':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/bokeh-text-effect-86.html", text);
            break;
          case '12':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/text-firework-effect-356.html", text);
            break;
          case '13':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html", text);
            break;
          case '14':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/arrow-tattoo-effect-with-signature-712.html", text);
            break;
          case '15':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-luxury-logo-maker-create-logo-online-458.html", text);
            break;
          case '16':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/dragon-fire-text-effect-111.html", text);
            break;
          case '17':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-a-personalized-queen-card-avatar-730.html", text);
            break;
          case '18':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/graffiti-color-199.html", text);
            break;
          case '19':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/make-tattoos-online-by-your-name-309.html", text);
            break;
          case '20':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-a-lol-pentakill-231.html", text);
            break;
          case '21':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/cards-halloween-online-81.html", text);
            break;
          case '22':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/writing-horror-letters-on-metal-plates-265.html", text);
            break;
          case '23':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/write-blood-text-on-the-wall-264.html", text);
            break;
          case '24':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-beautiful-international-women-s-day-cards-399.html", text);
            break;
          case '25':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/beautiful-flower-valentine-s-day-greeting-cards-online-512.html", text);
            break;
          case '26':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html", text);
            break;
          case '27':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-logo-team-logo-gaming-assassin-style-574.html", text);
            break;
          case '28':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html", text);
            break;
          case '29':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html", text);
            break;
          case '30':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/text-light-effets-234.html", text);
            break;
          case '31':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/modern-gold-3-212.html", text);
            break;
          case '32':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html", text);
            break;
          case '33':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/galaxy-text-effect-new-258.html", text);
            break;
          case '34':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", text);
            break;
          case '35':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/write-name-on-flower-birthday-cake-pics-472.html", text);
            break;
          case '36':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html", text);
            break;
          case '37':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html", text);
            break;
          case '38':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/write-text-on-wet-glass-online-589.html", text);
            break;
          case '39':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/water-3d-text-effect-online-126.html", text);
            break;
          case '40':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/realistic-3d-sand-text-effect-online-580.html", text);
            break;
          case '41':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/pubg-mascot-logo-maker-for-an-esports-team-612.html", text);
            break;
          case '42':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-online-typography-art-effects-with-multiple-layers-811.html", text);
            break;
          case '43':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html", text);
            break;
          case '44':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html", text);
            break;
          case '45':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/make-typography-text-online-338.html", text);
            break;
          case '46':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html", text);
            break;
          case '47':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html", text);
            break;
          case '48':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/birthday-cake-96.html", text);
            break;
          case '49':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-zodiac-online-logo-maker-491.html", text);
            break;
          case '50':
            logoUrl = await fetchLogoUrl("https://en.ephoto360.com/free-zodiac-online-logo-maker-491.html", text);
            break;
          default:
            return reply("*_Invalid number. Please reply with a valid number._*");
        }

        // Send the logo
        if (logoUrl) {
          await conn.sendMessage(from, {
            image: { url: logoUrl },
            caption: `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ | ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ`,
          }, { quoted: mek });
        }
      }
    });
  } catch (error) {
    console.error('Error processing logo command:', error);
    reply('An error occurred while processing the logo command. Please try again.');
  }
});

// Function to fetch the logo URL using axios
const fetchLogoUrl = async (url, name) => {
  try {
    const response = await axios.get(`https://api-pink-venom.vercel.app/api/logo`, {
      params: { url, name }
    });
    return response.data.result.download_url;
  } catch (error) {
    console.error("Error fetching logo:", error);
    return null;
  }
};
