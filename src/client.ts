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
