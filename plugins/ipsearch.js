const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "ip",
    alias: ["ipstalk", "sip", "searchip", "ip-locator"],
    react: '🌐',
    desc: "Fetch details of a given IP address.",
    category: "search",
    use: '.ip 112.134.193.130',
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please enter a valid IP address.");
        if (!q.includes('.')) return reply("Invalid IP address format.");

        const response = await fetchJson(`https://api.techniknews.net/ipgeo/${q}`);
        
        const message = `
*Manoj-Ai IP Lookup*

🌐 *IP Address*: ${q}
✅ *Status*: ${response.status}
🌍 *Continent*: ${response.continent}
🗺 *Country*: ${response.country}
🔢 *Country Code*: ${response.countryCode}
📍 *Region*: ${response.regionName}
🏙 *City*: ${response.city}
🏛 *Postal Code*: ${response.zip}
💸 *Currency*: ${response.currency}
📡 *ISP*: ${response.isp}
🛡 *Proxy*: ${response.proxy}
📱 *Mobile Network*: ${response.mobile}

>ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ`;

        await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.error("IP Lookup Error:", e);
        reply("Failed to retrieve details for the provided IP address.");
    }
});