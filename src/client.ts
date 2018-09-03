import {w3cwebsocket} from 'websocket';

const address = document.defaultView.location.hostname;
const port = 8000;
const client = new w3cwebsocket(`ws://${address}:${port}`, 'light-protocol');

client.onerror = () => console.error('connection error');
client.onopen = () => {
  console.log('connected');
};

type Window = {
  range: HTMLInputElement;
};

(window as typeof window & Window).range.onchange = function sendchange(event: any) {
  const level = event.currentTarget.value;
  client.send(JSON.stringify({msg: 'lights', level}));
}
