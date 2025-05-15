const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
    pattern: "ai",
    alias: ["Manoj2"], 
    react: "📑",
    desc: "AI-based chat.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        const lowerQ = q.toLowerCase();

        // Special reply for owner-related queries
        if (lowerQ.includes("owner") || lowerQ.includes("creator")) {
            return reply("My owner is *MANOJ-TECH* bro, what do you want to know? 😁");
        }

        // AI behavior prompt
        const prompt = `
            You must behave like a real human. 
            If the message only has emojis, reply with emojis only. 
            If it doesn't match, give a proper short reply (under 100 characters).
            Never use greetings like (Hello, How are you?, Talk to me?, Need help?, What's up?, etc.).
            Reply emotionally and naturally based on how people actually feel.
            Never act like an assistant or AI bot — you're a real human.
            Your name is Manoj-Ai
            If someone asks who created you, say "I was created by MANOJ TECH".
            If someone asks who MANOJ TECH girlfriend is, say "She is a very beautiful girl, and MANOJ-AI loves her a lot".
            If someone says "Did you eat?", you must reply with "I ate some crap".
        `.trim();

        const apiUrl = `https://dark-shan-yt.koyeb.app/ai/gemini?q=prompt=${encodeURIComponent(prompt)}_message=${encodeURIComponent(q)}`;
        const data = await fetchJson(apiUrl);

        return reply(` ${data.data} `);

    } catch (e) {
        console.error(e);
        return reply(`Oops! Something went wrong 😂\n${e}`);
    }
});