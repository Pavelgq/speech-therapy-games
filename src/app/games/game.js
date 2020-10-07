import * as PIXI from 'pixi.js';
import EventEmitter from '../utils/eventEmmiter';
import Playfield from './playfield';
import SimpleGame from './simpleGame/simpleGame';
import ChainGame from './chainGame/chainGame';

import choiceOfNumber from './data/choiceOfNumber';
import choiceOfSyllable from './data/choiceOfSyllable';
import choiceOfWord from './data/choiceOfWord';
import wordOfSyllables from './data/wordOfSyllables';
import superfluousWord from './data/superfluousWord';

import func from '../utils/utils';

const {
  playSound,
} = func;

const gamesData = {
  wordOfSyllables,
  choiceOfWord,
  choiceOfSyllable,
  choiceOfNumber,
  superfluousWord,
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
    this.selectGame = this.selectGame.bind(this);
  }

  run() {
    this.createTask();
    this.playfield.create();

    this.playfield.dispatch('newScreen', this.refresh)

    this.ticker.remove();
    this.ticker.add((delta) => this.gameLoop(delta));

    this.playfield.dispatch('selectedAnswer', this.selectGame);
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
      case 'superfluousWord':
        this.model = new ChainGame(appModel, gamesData[nameGame], taskNumber);
        break;
      default:
        break;
    }
  }

  selectGame(obj) {
    const object = obj;
    const check = this.model.checkAnswer(this.model.targetTasks[object.id]);

    switch (check) {
      case 'continue':
        console.log('верно');
        object.tint = '0x2a9c9d';
        break;
      case 'well':
        this.model.addReaction();
        if (this.model.checkTask()) {
          object.tint = '0x2a9c9d';
          setTimeout(() => {
            this.playfield.emit('compliteGame', {
              res: true,
            })
            // object.off('pointerover');
            // object.off('pointerout');
            // object.off('pointerdown');
            this.stage.removeChildren(0, this.stage.children.length);
          }, 1000);
        } else {
          object.tint = '0x2a9c9d';
          setTimeout(() => {
            this.model.currentPart += 1;
            this.playfield.emit('newScreen', {
              res: true,
            });
            // object.tint = '0xfdb078';
            // object.alpha = 0.5;
          }, 1000);
        }
        break;
      case 'lose':
        console.log('не верно');
        object.tint = '0xf36273';
        playSound(this.model.answer.audio, false, 0.8, console.log).play()
        setTimeout(() => {
          object.tint = '0xfdb078';
          object.alpha = 0.5;
        }, 1000);
        break;

      default:
        break;
    }

  }
}