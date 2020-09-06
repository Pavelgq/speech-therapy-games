'use struct';

import * as PIXI from 'pixi.js';
import WordOfSyllables from './app/game1/wordOfSyllables';

const viewPort = {
  width: 400,
  height: 400,
};
// window.innerWidth
// window.innerHeight

const renderer = PIXI.autoDetectRenderer({
  height: viewPort.height,
  width: viewPort.width,
  backgroundColor: 0xf0f0f0,
  // transparent: true,
  resolution: window.devicePixelRatio,
  autoResize: true,
});
document.body.appendChild(renderer.view);
let ticker = PIXI.Ticker.shared;
const games = [new WordOfSyllables(renderer, viewPort, 2, ticker)];

games[0].run();
