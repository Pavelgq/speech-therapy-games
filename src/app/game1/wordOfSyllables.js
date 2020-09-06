import * as PIXI from 'pixi.js';
import Playfield from './playfield';
import Model from './model';

export default class WordOfSyllables {
  constructor(canvas, viewPort, level, ticker) {
    this.canvas = canvas;
    this.viewPort = viewPort;
    this.stage = new PIXI.Container();

    this.model = new Model(level, viewPort);
    this.playfield = new Playfield(this.model, viewPort, this.stage);
    this.ticker = ticker;

    this.render = this.render.bind(this);
  }

  run() {
    this.playfield.create();

    this.ticker.add(delta => this.gameLoop(delta));
    this.ticker.add(this.render);
  }

  render() {
    this.canvas.render(this.stage);
  }

  gameLoop(delta) {
    // this.stage(delta);
  }
}