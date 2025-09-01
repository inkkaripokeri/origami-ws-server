const WebSocket = require('ws');

const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', ws => {
  console.log('Yhteys avattu');

  ws.on('message', msg => {
    console.log('Vastaanotettu:', msg);
    ws.send(`Sait viestin: ${msg}`);
  });

  ws.send('Tervetuloa WebSocket-serveriin!');
});

console.log(`WebSocket-serveri käynnissä portissa ${port}`);
