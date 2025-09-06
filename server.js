const WebSocket = require('ws');

// Renderissa käytetään ympäristömuuttujan porttia
const port = process.env.PORT || 8080;
const server = new WebSocket.Server({ port });

server.on('connection', (ws) => {
  console.log('🔌 Uusi yhteys avattu');

  ws.on('message', (msg) => {
    console.log('📩 Sain viestin:', msg.toString());

    let data;
    try {
      // Parsitaan viesti JSON:iksi
      data = JSON.parse(msg);
    } catch (e) {
      ws.send(JSON.stringify({ error: "Viesti ei ollut JSON-muotoinen" }));
      return;
    }

    // ✅ Lähetetään viesti kaikille avoimille yhteyksille
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Yhteys suljettu');
  });
});

console.log(`🚀 WebSocket-palvelin käynnistetty porttiin ${port}`);
