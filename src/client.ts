async function setLightLevel(level: number) {
  console.log(`set lights to ${level}`);
  const resp = await fetch('/msg', {
    method: 'POST',
    headers: {
      'x-control': 'lights',
      'x-level': level.toString(),
    },
  });

  if (resp.status < 400) {
    window.location.href = 'https://www.youtube.com/tv#/watch/video/seek?v=ZZ5LpwO-An4&resumehttps://www.youtube.com/tv#/watch/video/seek?v=ZZ5LpwO-An4&resume';
  }
}

(window as any).setLightLevel = setLightLevel;
