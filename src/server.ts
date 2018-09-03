import websocket from 'websocket';
import http from 'http';
import {Lights, MotorLights, MockLights} from './lights';
import fs from 'fs';
import path from 'path';

let lights: Lights;
try {
  lights = new MotorLights();
} catch (ex) {
  console.warn("could not establish connection to motors", ex);
  lights = new MockLights();
}

const server = http.createServer((req, res) => {
  console.log(`Received request for ${req.url}`);
  const file = req.url === '/'
    ? '/index.html'
    : req.url;

  const stream = fs.createReadStream(path.join(process.cwd(), 'dist', path.normalize(file!)));
  stream.pipe(res);
  stream.on('error', () => {
    res.writeHead(404);
    res.end();
  });
});

server.listen(8000, () => {
  const {address, port} = (server.address() as any)
  console.log(`Listening at ${address}:${port}`);
});

const wsServer = new websocket.server({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on('request', (req) => {
  const connection = req.accept('light-protocol', req.origin);
  connection.on('message', (message) => {
    console.log(`Peer ${connection.remoteAddress} message`, {message});
    if (message.type === 'utf8' && message.utf8Data) {
      const json = JSON.parse(message.utf8Data);
      switch (json.msg) {
        case 'lights':
          lights.setLevel(json.level);
      }
    }
  });

  connection.on('close', (reason, description) => {
    console.log(`Peer ${connection.remoteAddress} disconnected.`,
      {reason, description});
  });
});
