import * as PIXI from 'pixi.js';
import EventEmitter from '../utils/eventEmmiter';
import Playfield from './playfield';
import Model from './model';

const rulesSound = require('../../assets/audio/game1/word-of-syllables-rules.mp3');

export default class WordOfSyllables {
  constructor(canvas, viewPort, level, ticker, stage) {
    this.name = 'Слово из слогов';

    this.canvas = canvas;
    this.viewPort = viewPort;
    this.stage = new PIXI.Container();

    stage.removeChildren(0, stage.children.length);
    this.model = new Model(level);
    this.playfield = new Playfield(this.model, viewPort, this.stage);
    this.ticker = ticker;
    
    this.render = this.render.bind(this);
    this.run = this.run.bind(this);

    this.rules = rulesSound;
  }

  run() {
    this.playfield.create();
    this.ticker.add(this.message());
    this.render()
  }

  render() {
    this.canvas.render(this.stage);
  }

  message() {
    console.log("work")
  }
}