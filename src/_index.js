'use struct';

import { Howl, Howler } from 'howler';
import * as PIXI from 'pixi.js';
import WordOfSyllables from './app/game1/wordOfSyllables';
import ChoiceOfSyllable from './app/game2/choiceOfSyllable';

const backSound = require('./assets/audio/background.mp3');

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
const ticker = PIXI.Ticker.shared;
const games = [new WordOfSyllables(renderer, viewPort, 2, ticker),
  new ChoiceOfSyllable(renderer, viewPort, 2, ticker)];

games[0].run();

const sound = new Howl({
  src: [backSound],
  autoplay: true,
  loop: true,
  volume: 0.3,
  onend() {
    console.log('Finished!');
  },
});

sound.play();