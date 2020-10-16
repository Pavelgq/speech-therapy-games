import func from './utils';

const {
  addZero,
} = func;

export default class TimeCounter {
  constructor(targetTime) {
    this.targetTime = targetTime + 24 * 60 * 60 * 1000;

    this.updateClock = this.updateClock.bind(this);
  }

  getTimeRemaining() {
    const total = this.targetTime - new Date();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const hour = Math.floor(total / (1000 * 60 * 60));

    return {
      total,
      hour,
      minutes,
      seconds,
    }
  }

  setClock() {
    this.timeInterval = setInterval(this.updateClock, 1000);
  }

  updateClock() {
    const time = this.getTimeRemaining();

    if (time.total <= 0) {
      clearInterval(this.timeInterval);
    }

    return time;
  }

  getTimeString() {
    const time = this.getTimeRemaining();

    return `${addZero(time.hour)}:${addZero(time.minutes)}:${addZero(time.seconds)}`
  }
}


