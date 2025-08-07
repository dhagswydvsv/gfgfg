async function menuCommand(sock, from) {
    const menu = `
📜 *Malik WhatsApp Bot Menu*
1. .menu - Show this menu
2. hello - Get greeting message
3. More features coming soon... 🚀
`;
    await sock.sendMessage(from, { text: menu });
}

module.exports = { menuCommand };