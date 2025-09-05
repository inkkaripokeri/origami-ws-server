const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Yhteys avattu');

  ws.on('message', (msg) => {
    console.log('Sain viestin:', msg);

    try {
      // Parsitaan saatu viesti varmistaaksemme, että se on JSON
      const data = JSON.parse(msg);

      // Lähetetään takaisin täsmälleen sama JSON-objekti stringinä
      ws.send(JSON.stringify(data));
    } catch (e) {
      // Jos viesti ei ollut validi JSON
      ws.send(JSON.stringify({ error: "Viesti ei ollut JSON-muotoinen" }));
    }
  });

  ws.on('close', () => {
    console.log('Yhteys suljettu');
  });
});

console.log('Websocket-palvelin käynnistetty porttiin 8080');
