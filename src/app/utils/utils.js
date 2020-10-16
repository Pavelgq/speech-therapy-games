import {
  Howl,
} from 'howler';

const playSound = (path, loop, vol, func, arg = null) => {
  const sound = new Howl({
    src: [path],
    autoplay: false,
    loop,
    volume: vol,
    onend() {
      func(arg)
    },
  })
  return sound
}

const loadFile = (url) => {
  fetch(url).then((res) => res)
}

function delay(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

const send = async (obj, url) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(obj),
  });

  const result = await response.json();
  console.log(result.message);
}

const checkYesterday = (yesterday, today) => {
  let backDate = 0;
  if (typeof yesterday === 'string') {
    backDate = Date.parse(yesterday);
  } else {
    backDate = yesterday.getTime()
  }
  const period = today.getTime() - backDate;
  if (period < 48 * 60 * 60 * 1000 && period > 24 * 60 * 60 * 1000) {
    return true;
  }
  return false;
}

const addZero = (num) => {
  if (num <= 9) {
    return `0${num}`;
  }
  return `${num}`;
}

export default {
  playSound,
  loadFile,
  delay,
  send,
  checkYesterday,
  addZero,
};