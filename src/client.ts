import {w3cwebsocket} from 'websocket';

const address = process.env.NODE_ENV == 'production'
  ? document.defaultView.location.host
  : process.env.LIGHTS_SERVER || 'lights.samizdat.space';

const client = new w3cwebsocket(`ws://${address}/ws`, 'light-protocol');

client.onerror = () => console.error('connection error');
client.onopen = () => {
  console.log('connected');
};

function setLightLevel(level: number) {
  console.log('yo');
  client.send(JSON.stringify({msg: 'lights', level}));
}

(window as any).setLightLevel = setLightLevel;
