const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Yhteys avattu');

  ws.on('message', (msg) => {
    console.log('Sain viestin:', msg);

    try {
      // Parsitaan saatu JSON stringiksi
      const data = JSON.parse(msg);

      // Lähetetään takaisin reply-avaimella ilman ylimääräisiä escapeja
      ws.send(JSON.stringify({ reply: data }));
    } catch (e) {
      // Jos viesti ei ole validia JSONia, lähetetään virheilmoitus
      ws.send(JSON.stringify({ error: "Viesti ei ollut JSON-muotoinen" }));
    }
  });

  ws.on('close', () => {
    console.log('Yhteys suljettu');
  });
});

console.log('Websocket-palvelin käynnistetty porttiin 8080');
