import * as PIXI from 'pixi.js';
import EventEmitter from '../utils/eventEmmiter';
import Playfield from './playfield';
import SimpleGame from './simpleGame/simpleGame';
import ChainGame from './chainGame/chainGame';

import choiceOfNumber from './data/choiceOfNumber';
import choiceOfSyllable from './data/choiceOfSyllable';
import choiceOfWord from './data/choiceOfWord';
import wordOfSyllables from './data/wordOfSyllables';

const gamesData = {
  wordOfSyllables, choiceOfWord, choiceOfSyllable, choiceOfNumber,
};

export default class Game extends EventEmitter {
  constructor(canvas, viewPort, appModel, ticker, numberGame, taskNumber) {
    super();
    this.canvas = canvas;
    this.viewPort = viewPort;
    this.stage = new PIXI.Container();
    const nameGame = Object.keys(gamesData)[numberGame]
    this.gameFactory(appModel, nameGame, taskNumber);
    this.appModel = appModel;
    this.playfield = new Playfield(this.model, this.viewPort, this.stage);
    this.ticker = ticker;

    this.rules = gamesData[nameGame].rulesSound;
    this.render = this.render.bind(this);
    this.run = this.run.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  run() {
    this.createTask();
    this.playfield.create();

    this.playfield.dispatch('newScreen', this.refresh)

    this.ticker.remove();
    this.ticker.add((delta) => this.gameLoop(delta));
  }

  createTask() {
    this.model.targetTasks = this.model.createTask(
      this.appModel.typeInGame[this.model.dataGame.name],
    )
  }

  refresh() {
    this.model.refresh();
    // this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    this.playfield.refresh();
  }

  render() {
    this.canvas.render(this.stage);
  }

  gameLoop() {
    this.render();
  }

  gameFactory(appModel, nameGame, taskNumber) {
    switch (nameGame) {
      case 'wordOfSyllables':
        this.model = new ChainGame(appModel, gamesData[nameGame], taskNumber);
        break;
      case 'choiceOfWord':
        this.model = new SimpleGame(appModel, gamesData[nameGame], taskNumber);
        break;
      case 'choiceOfSyllable':
        this.model = new SimpleGame(appModel, gamesData[nameGame], taskNumber);
        break;
      case 'choiceOfNumber':
        this.model = new SimpleGame(appModel, gamesData[nameGame], taskNumber);
        break;

      default:
        break;
    }
  }

  
}