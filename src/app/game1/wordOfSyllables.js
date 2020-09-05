import * as PIXI from 'pixi.js';
import Playfield from './playfield';
import Model from './model';

export default class WordOfSyllables {
  constructor(canvas, viewPort, level) {
    this.canvas = canvas;
    this.viewPort = viewPort;
    this.stage = new PIXI.Container();

    this.model = new Model(level, viewPort);
    this.playfield = new Playfield(this.model, viewPort, this.stage);
  }

  run() {
    this.playfield.create();
    this.render();
  }

  render() {
    this.canvas.render(this.stage);
  }
}