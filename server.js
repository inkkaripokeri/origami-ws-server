const WebSocket = require('ws');

// Renderissa ei käytetä kiinteää porttia vaan prosessin porttia
const port = process.env.PORT || 8080;
const server = new WebSocket.Server({ port });

server.on('connection', (ws) => {
  console.log('Yhteys avattu');

  ws.on('message', (msg) => {
    console.log('Sain viestin:', msg);

    let data;
    try {
      data = JSON.parse(msg); // varmista, että on validi JSON
    } catch (e) {
      ws.send(JSON.stringify({ error: "Viesti ei ollut JSON-muotoinen" }));
      return;
    }

    // Lähetetään viesti kaikille yhteydessä oleville (myös lähettäjälle)
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    console.log('Yhteys suljettu');
  });
});

console.log(`WebSocket-palvelin käynnistetty porttiin ${port}`);
