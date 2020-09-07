import {
  Howl,
  Howler,
} from 'howler';
import * as PIXI from 'pixi.js';
// import EventEmitter from './utils/eventEmmiter';
import Game from './games/game';
import func from './utils/utils';

const {
  playSound,
} = func;

const backSound = require('../assets/audio/background.mp3');
const goodSound = require('../assets/audio/good.mp3');
const badSound = require('../assets/audio/bad.mp3');

export default class App {
  constructor() {
    this.state = 'play';

    this.player = {
      name: 'Иван Иванов',
      level: 1,
      exp: 0,
      money: 0,
      lesson: 1,
    }
    this.task = 1;

    this.viewPort = {
      width: 400,
      height: 400,
    };

    this.renderer = PIXI.autoDetectRenderer({
      height: this.viewPort.height,
      width: this.viewPort.width,
      backgroundColor: 0xf0f0f0,
      // transparent: true,
      resolution: window.devicePixelRatio,
      autoResize: true,
      antialias: true,
    });

    this.ticker = PIXI.Ticker.shared;

    this.stage = new PIXI.Container();

    this.games = 4;

    this.complite = this.complite.bind(this);
    this.next = this.next.bind(this);
    this.render = this.render.bind(this);
  }

  init() {
    document.body.appendChild(this.renderer.view);

    // this.render();

    playSound(backSound, true, 0.3, console.log);

    // this.on('compliteGame', this.complite)

    this.next();
  }

  next() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const b = new PIXI.Graphics();
    b.lineStyle(4, 0x2a9c9d, 1);
    b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4);
    this.stage.addChild(b);
    const h1 = `Урок ${this.player.lesson}`;
    const h2 = `Задание ${this.task}`;
    this.printText(this.stage, h1, -1, 28);
    this.printText(this.stage, h2, 1, 20);
    // this.render();
    const id = Math.floor(Math.random() * this.games);
    const game = new Game(this.renderer, this.viewPort, this.player.level, this.ticker, id);
    // todo
    game.playfield.dispatch('compliteGame', this.complite);
    playSound(game.rules, false, 0.8, game.run);
  }

  complite(obj) {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    if (obj.res) {
      const b = new PIXI.Graphics();
      b.lineStyle(4, 0x2a9c9d, 1);
      b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4);
      this.stage.addChild(b);
      const h1 = 'Верно';
      const h2 = 'Молодец';
      this.printText(this.stage, h1, -1, 28);
      this.printText(this.stage, h2, 1, 28);
      playSound(goodSound, false, 0.8, this.next);
    } else {
      const b = new PIXI.Graphics();
      b.lineStyle(4, 0x2a9c9d, 1);
      b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4);
      this.stage.addChild(b);
      const h1 = 'Вот незадача';
      const h2 = 'В следующий раз справишься';
      this.printText(this.stage, h1, -1, 28);
      this.printText(this.stage, h2, 1, 20);
      playSound(badSound, false, 0.8, this.next);
    }
    this.task += 1;
  }

  render() {
    this.renderer.render(this.stage);
  }

  printText(stage, text, deltaH, fontSize) {
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize,
      fill: '0x2a9c9d',
      align: 'center',
    });
    const score = new PIXI.Text(text, textStyle);
    const textMetrics = PIXI.TextMetrics.measureText(text, textStyle);
    score.x = this.viewPort.width / 2 - textMetrics.width / 2;
    score.y = this.viewPort.height / 2 - textMetrics.height / 2 + deltaH * textMetrics.height + 10;

    stage.addChild(score);
  }

  gameLoop(delta) {
    // console.log(delta)
    this.render();
  }
}