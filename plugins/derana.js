const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

// API Link for fetching news
const apiLink = 'https://dizer-adaderana-news-api.vercel.app/news';

cmd({
    pattern: "derananews",
    alias: ["derana", "news3"],
    react: "📑",
    desc: "Fetch the latest news from Derana",
    category: "news",
    use: '.derananews',
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Fetch news data from the API
        const response = await axios.get(apiLink);
        const news = response.data[0]; // Access the first item of the array

        // Construct the news message
        const msg = `
           📑 DERANA NEWS 📑

* Title: ${news.title || 'Not available'}
* News: ${news.description || 'Not available'}
* Date: ${news.time || 'Not available'}
* Link: ${news.new_url || 'Not available'}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀɴᴏᴊ-ᴛᴇᴄʜ
        `;

        // Send the news as a message with an image
        await conn.sendMessage(from, {
            image: { url: news.image || 'https://i.imgur.com/placeholder.jpg' }, // Fallback image
            caption: msg
        }, { quoted: mek });

    } catch (e) {
        console.error("News Fetch Error:", e);
        await reply('⚠️ An error occurred. Unable to fetch data from the API!');
    }
});