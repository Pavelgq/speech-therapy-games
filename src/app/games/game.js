import * as PIXI from 'pixi.js';
import Playfield from './playfield';
import Model from './model';
import SimpleGame from './simpleGame/simpleGame';
import ChainGame from './chainGame/chainGame';

import choiceOfNumber from './data/choiceOfNumber';
import choiceOfSyllable from './data/choiceOfSyllable';
import choiceOfWord from './data/choiceOfWord';
import wordOfSyllables from './data/wordOfSyllables';

const gamesData = {
  wordOfSyllables, choiceOfWord, choiceOfSyllable, choiceOfNumber,
};

export default class Game {
  constructor(canvas, viewPort, appModel, ticker, numberGame) {
    this.canvas = canvas;
    this.viewPort = viewPort;
    this.stage = new PIXI.Container();
    const nameGame = Object.keys(gamesData)[numberGame]
    this.gameFactory(appModel, nameGame);
    this.model.createTask(appModel.typeInGame[this.model.dataGame.name])
    this.playfield = new Playfield(this.model, this.viewPort, this.stage);
    this.ticker = ticker;

    this.rules = gamesData[nameGame].rulesSound;
    this.render = this.render.bind(this);
    this.run = this.run.bind(this);
  }

  run() {
    this.playfield.create();

    this.ticker.remove();
    this.ticker.add((delta) => this.gameLoop(delta));
  }

  render() {
    this.canvas.render(this.stage);
  }

  gameLoop() {
    this.render();
  }

  gameFactory(appModel, nameGame) {
    switch (nameGame) {
      case 'wordOfSyllables':
        this.model = new ChainGame(appModel, gamesData[nameGame]);
        break;
      case 'choiceOfWord':
        this.model = new SimpleGame(appModel, gamesData[nameGame]);
        break;
      case 'choiceOfSyllable':
        this.model = new SimpleGame(appModel, gamesData[nameGame]);
        break;
      case 'choiceOfNumber':
        this.model = new SimpleGame(appModel, gamesData[nameGame]);
        break;

      default:
        break;
    }
  }
}