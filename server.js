const WebSocket = require('ws');

const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', ws => {
  console.log('Yhteys avattu');

  ws.on('message', message => {
    // Muutetaan Buffer → string
    const msgText = message.toString();
    console.log('Vastaanotettu:', msgText);

    // Lähetetään Origamille
    ws.send(JSON.stringify({ reply: `Sait viestin: ${msgText}` }));
  });

  // Lähetetään heti tervehdys JSON-muodossa
  ws.send(JSON.stringify({ msg: 'Tervetuloa WebSocket-serveriin!' }));
});

console.log(`WebSocket-serveri käynnissä portissa ${port}`);
