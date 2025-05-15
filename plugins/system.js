const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    react: "💻",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `                   
╭━━〔 *𝐌𝐀𝐍𝐎𝐉-𝐀𝐈* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *⏳Uptime*: ${runtime(process.uptime())}
┃◈┃• *📟 Ram*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *⚙️ Platform:-* ${os.hostname()}
┃◈┃• *👨‍💻 Owner*: Manoj Xd
┃◈└───────────┈⊷
╰──────────────┈⊷

> 🄿🄾🅆🄴🅁🄳 🅱🆈 𝐌𝐀𝐍𝐎𝐉 𝐀𝐈 😈
`
await conn.sendMessage(from, {
        video: {
            url: 'https://github.com/sulamadara1147/data/blob/main/VID-20250415-WA0278.mp4?raw=true'
        },
        mimetype: 'video/mp4',
        ptv: true
    }, { quoted: mek });
    
return reply(`${status}`)
  
}catch(e){
console.log(e)
reply(`${e}`)

}
})
