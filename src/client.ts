function setLightLevel(level: number) {
  console.log(`set lights to ${level}`);
  fetch('/msg', {
    method: 'POST',
    headers: {
      'x-control': 'lights',
      'x-level': level.toString(),
    },
  });
}

(window as any).setLightLevel = setLightLevel;
