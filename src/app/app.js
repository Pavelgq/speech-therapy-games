// import EventEmitter from './utils/eventEmmiter';
import {
  Howl,
} from 'howler';
import Model from './model';
import View from './view';

import func from './utils/utils';

const {
  playSound,
  send,
} = func;

const backSound = require('../assets/audio/background.mp3');
const goodSound = require('../assets/audio/good.mp3');
const badSound = require('../assets/audio/bad.mp3');

const serverURL = 'http://localhost:3001';
export default class App {
  constructor(container, userData, lessonData) {
    this.container = container

    this.model = new Model(userData, lessonData);
    this.view = new View(this.model);

    this.state = 'play'; // pause, end

    this.task = 1;

    this.games = 7;

    this.complite = this.complite.bind(this);
    this.next = this.next.bind(this);
    this.aheadOfTime = this.aheadOfTime.bind(this);
  }

  init() {
    this.container.appendChild(this.view.renderer.view);
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
    // this.render();
    // const id = Math.floor(Math.random() * this.games);
    const id = 6;
    this.view.createGame(id, this.task);
    this.view.lessonScreen(this.model.player.lessons + 1, this.task, this.model.game.model);
    // todo
    this.model.game.playfield.dispatch('compliteGame', this.complite);
    this.model.game.playfield.dispatch('aheadOfTime', this.aheadOfTime);
    playSound(this.model.game.rules, false, 0.8, this.model.game.run).play();
  }

  complite(obj) {
    this.model.setStatistic()
    if (obj.res) {
      this.view.goodScreen()
      playSound(goodSound, false, 0.8, this.next).play();
    } else {
      this.view.badScreen()
      playSound(badSound, false, 0.8, this.next).play();
    }
    if (this.task < this.model.taskInLesson) {
      this.task += 1;
    } else {
      this.view.endLesson();
      this.task = 1;
      this.model.lesson += 1;
      const newPlayer = this.model.getPlayer();
      console.log(newPlayer)
      send(this.model.getStatistic(), `${serverURL}/api/lesson/save`);
      send(this.model.getPlayer(), `${serverURL}/api/user/change-data`);
    }
  }

  aheadOfTime(obj) {
    this.model.setStatistic()
    this.view.endLesson();
    this.task = 1;

    send(this.model.getStatistic(), `${serverURL}/api/lesson/save`);
  }
}