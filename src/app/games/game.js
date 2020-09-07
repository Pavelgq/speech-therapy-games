import * as PIXI from 'pixi.js';
import EventEmitter from '../utils/eventEmmiter';
import Playfield from './playfield';
import Model from './model';

import choiceOfNumber from './data/choiceOfNumber';
import choiceOfSyllable from './data/choiceOfSyllable';
import choiceOfWord from './data/choiceOfWord';
import wordOfSyllables from './data/wordOfSyllables';

const gamesData = [wordOfSyllables, choiceOfWord, choiceOfSyllable, choiceOfNumber];

export default class Game {
  constructor(canvas, viewPort, level, ticker, gameNumber) {
    this.canvas = canvas;
    this.viewPort = viewPort;
    this.stage = new PIXI.Container();

    this.model = new Model(level, gamesData[gameNumber]);
    this.playfield = new Playfield(this.model, viewPort, this.stage);
    this.ticker = ticker;

    this.render = this.render.bind(this);
    this.run = this.run.bind(this);

    this.name = gamesData[gameNumber].name;
    this.rules = gamesData[gameNumber].rulesSound;
  }

  run() {
    this.playfield.create();

    this.ticker.remove();
    this.ticker.add((delta) => this.gameLoop(delta));
  }

  render() {
    this.canvas.render(this.stage);
  }

  gameLoop(delta) {
    this.render();
  }
}