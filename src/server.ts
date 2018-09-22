import http from 'http';
import {Lights, MotorLights, MockLights} from './lights';
import {Buttons, RealButtons, MockButtons} from './buttons';
import fs from 'fs';
import path from 'path';

let lights: Lights;
try {
  lights = new MotorLights();
} catch (ex) {
  console.warn("could not establish connection to motors", ex);
  lights = new MockLights();
}

let buttons: Buttons;
try {
  buttons = new RealButtons(18,17,16);
} catch (ex) {
  buttons = new MockButtons();
}

buttons.whenOff(() => lights.setLevel(0));
buttons.whenDim(() => lights.setLevel(10));
buttons.whenBright(() => lights.setLevel(100));

const server = http.createServer((req, res) => {
  try {
    console.log(`${req.method} ${req.url}`);
    if (req.url === '/msg' && req.method === 'POST') {
      let control: string = req.headers['x-control'] as string;
      let level: number = parseInt(req.headers['x-level'] as string, 10);
      switch (control) {
        case 'lights':
          console.log(`:: set lights to ${level}`);
          lights.setLevel(level);
      }
    } else {
      res.writeHead(404);
      res.end();
    }
  } catch (ex) {
    res.writeHead(500);
    res.end();
  }
});

server.listen(8000, 'localhost', () => {
  const {address, port} = (server.address() as any)
  console.log(`Listening at ${address}:${port}`);
});
