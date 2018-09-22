const address = process.env.NODE_ENV == 'production'
  ? document.defaultView.location.host
  : process.env.LIGHTS_SERVER || 'lights.samizdat.space';

function setLightLevel(level: number) {
  fetch('/msg', {
    method: 'POST',
    headers: {
      'x-control': 'lights',
      'x-level': level.toString(),
    },
  });
}

(window as any).setLightLevel = setLightLevel;
