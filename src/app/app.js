// import EventEmitter from './utils/eventEmmiter';
import Model from './model';
import View from './view';

import func from './utils/utils';

const {
  playSound,
} = func;

const backSound = require('../assets/audio/background.mp3');
const goodSound = require('../assets/audio/good.mp3');
const badSound = require('../assets/audio/bad.mp3');

export default class App {
  constructor() {
    this.model = new Model();
    this.view = new View(this.model);

    this.state = 'play'; // pause, end

    this.task = 1;

    this.games = 4;

    this.complite = this.complite.bind(this);
    this.next = this.next.bind(this);
  }

  init() {
    document.body.appendChild(this.view.renderer.view);
    this.view.resize();
    window.onresize = () => {
      this.view.resize()
    }
    // this.render();

    this.backSound = playSound(backSound, true, 0.3, console.log)
    this.backSound.play()

    // this.on('compliteGame', this.complite)

    this.next();
  }

  exit() {
    this.backSound.stop()
  }

  next() {
    this.view.lessonScreen(this.model.player.lessons + 1, this.task, 'Скажи по слогам');
    // this.render();
    const id = Math.floor(Math.random() * this.games);
    const game = this.view.createGame(id);
    // todo
    game.playfield.dispatch('compliteGame', this.complite);
    playSound(game.rules, false, 0.8, game.run).play();
  }

  complite(obj) {
    if (obj.res) {
      this.view.goodScreen()
      playSound(goodSound, false, 0.8, this.next).play();
    } else {
      this.view.badScreen()
      playSound(badSound, false, 0.8, this.next).play();
    }
    this.task += 1;
  }
}