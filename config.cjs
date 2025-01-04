// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdYNzVwaWsxaDBDK0Zwc200amR4M0lTQTVkQXAyU2tkTWFTbW5qYUpHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGxNVW9jQ3NXcmcwQk5Sa0VXVWlvQ05KY0t5SE02STdmSzR4azZZeHhYcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvR3Bjai9hMGtOcmNpNGlxNThtUktxbWVHSWxDVG5NV05LR1pBK3BzcGxRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5bnFQSmduY1NOZXRjd3FDNlFNWVpHYmdCaDNvMCtkQkJhb0JLZFFKZkY0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklNeGtDZUV3eU83c2ZQSy9mMGdIUWZPRXhidFA3bURLUmFlWUZLSjBWVTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNFTkQ3OTB5NUZmZGJPY3BxZUM5LytZYmVSOXE3VG56WEtUc3d0L2JQQW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia05hRGVXeUNZUDNyR0EyNWk5NHFJcFJ6VnJWNE5vNEEzVEtjSTUxcmwxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGxYaFM4RzN1QXBCaVZHWnZDZS8vM1JEOU5CN3hhTktZS0hZTUNibVdYbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFXNitKS0tmVkx0b1VlZFZsQVpQdGdnd3FOZFc3VjZqUzNMRHM2bkxQb0E5K1ZzbmVVYmc3c0Irc0R6VUZqU0tuaVJ2RG1oWG9GVndtRVBiKzhGc0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAwLCJhZHZTZWNyZXRLZXkiOiJBc3pSNkFpQlVUdDVvQ1lzWHg1STVGd3ZnL3UyVk8zQlU0WVNNVmFaVXlNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTWHd5UXNET1FDLVBNS2phNkZyTDB3IiwicGhvbmVJZCI6IjdhYmI1YmRjLTU0YmMtNDlhOS1hZjQxLTUxZTVmNTk2ODdmOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnalNuR2h6aFBPZTZQY0hPVTZHbzNQMGR3Wlk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lyMXlRQUh1WGhBOUM1TXRha0JWTmJrU01VPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRLN1IxSzVDIiwibWUiOnsiaWQiOiIyMzQ5MTY0Mzk1MzQ1OjIyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6In5QQUlOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLZkwxOU1ERUlMeDVic0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJyb1E0K0ZSbGFjakYvUTZNQTdld21XSWpXbWlGcjY3WjE5c0d4VXVlUUZBPSIsImFjY291bnRTaWduYXR1cmUiOiJ2TzFmSGFMYmI5ZUdpSGR6c3VCS0p2VFZPd1N3b0NYNndnN250TXVMQ3kxZy9LY3ZWRjlxcEZwS0RoSUt2ek9rV1duek9TMlY5YWRqeWRRcFQyUGFEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVzdncXZXb3k3ejA3cy85azBzRk5DV3JBYnl6VkVCdVF2dTNzcEROaUJ5R2RWNFJ3bzhTL3VDejVpMStHdnpiZnFEZ3ArTnBNdDJCcCtsU3dKbHpkRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTY0Mzk1MzQ1OjIyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmE2RU9QaFVaV25JeGYwT2pBTzNzSmxpSTFwb2hhK3UyZGZiQnNWTG5rQlEifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzYwMTM5Njd9",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "✪⏤͟͞★⃝ꪶ‎𝐌𝐚𝐧𝐮𝐥 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥𖥘✪͜͡➺",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94742274855",
  GEMINI_KEY: process.env.GEMINI_KEY || "",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
  YTDL_NO_UPDATE: process.env.YTDL_NO_UPDATE !== undefined ? process.env.YTDL_NO_UPDATE === 'true' : true,
};


module.exports = config;
