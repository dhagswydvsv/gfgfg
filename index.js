const { default: makeWASocket, useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const P = require("pino");
const fs = require("fs");
const { menuCommand } = require("./commands/menu");
const { state, saveState } = useSingleFileAuthState("./auth_info.json");

async function startBot() {
    const sock = makeWASocket({
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
    });

    sock.ev.on("creds.update", saveState);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const message = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (!message) return;

        if (message.toLowerCase() === ".menu") {
            await menuCommand(sock, from);
        } else if (message.toLowerCase().includes("hello")) {
            await sock.sendMessage(from, { text: "👋 Hello! I'm Malik's WhatsApp Bot." });
        }
    });
}

startBot();