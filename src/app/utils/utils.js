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

export default {
  playSound,
  loadFile,
};