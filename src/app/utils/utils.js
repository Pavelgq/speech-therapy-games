import { Howl } from 'howler';

const playSound = (path, loop, vol, func) => {
  const sound = new Howl({
    src: [path],
    autoplay: false,
    loop,
    volume: vol,
    onend() {
      func()
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

export default {
  playSound,
  loadFile,
  delay,
};