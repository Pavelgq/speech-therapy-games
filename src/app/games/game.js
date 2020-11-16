import * as PIXI from 'pixi.js';
import EventEmitter from '../utils/eventEmmiter';
import Playfield from './playfield';

import SimpleGame from './simpleGame/simpleGame';
import ChainGame from './chainGame/chainGame';
import MutatingGame from './mutatingGame/mutatingGame';
import MutatingPlayfield from './mutatingGame/mutatingPlayfield';
import PairGame from './pairGame/pairGame';
import PairPlayfield from './pairGame/pairPlayfield';

import choiceOfNumber from './data/choiceOfNumber';
import choiceOfSyllable from './data/choiceOfSyllable';
import choiceOfWord from './data/choiceOfWord';
import wordOfSyllables from './data/wordOfSyllables';
import superfluousWord from './data/superfluousWord';
import thatHasChanged from './data/thatHasChanged';
import choiceOfImage from './data/choiceOfImage';
import choicePair from './data/choicePair';

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
  thatHasChanged,
  choiceOfImage,
  choicePair,
};

export default class Game extends EventEmitter {
  constructor(canvas, viewPort, appModel, stage, numberGame, taskNumber) {
    super();
    this.canvas = canvas;
    this.viewPort = viewPort;
    // this.stage = new PIXI.Container();
    this.stage = stage;
    const nameGame = Object.keys(gamesData)[numberGame]
    this.gameFactory(appModel, nameGame, taskNumber);
    this.appModel = appModel;

    // this.ticker = ticker;

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

    // this.ticker.add(this.render);

    this.playfield.dispatch('selectedAnswer', this.selectGame);
  }

  createTask() {
    this.model.targetTasks = this.model.createTask(
      this.appModel.typeInGame[this.model.dataGame.name],
    )
  }

  refresh() {
    this.model.refresh();
    this.playfield.refresh();
  }

  render() {
    this.canvas.render(this.stage);
  }

  gameLoop() {
    this.render();
  }

  /**
   * Создает task по заданому идентификатору
   * @param {Object} appModel
   * @param {Object} nameGame
   * @param {Number} taskNumber
   */
  gameFactory(appModel, nameGame, taskNumber) {
    switch (nameGame) {
      case 'wordOfSyllables':
        this.model = new ChainGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new Playfield(this.model, this.viewPort, this.stage);
        break;
      case 'choiceOfWord':
        this.model = new SimpleGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new Playfield(this.model, this.viewPort, this.stage);
        break;
      case 'choiceOfSyllable':
        this.model = new SimpleGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new Playfield(this.model, this.viewPort, this.stage);
        break;
      case 'choiceOfNumber':
        this.model = new SimpleGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new Playfield(this.model, this.viewPort, this.stage);
        break;
      case 'superfluousWord':
        this.model = new ChainGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new Playfield(this.model, this.viewPort, this.stage);
        break;
      case 'thatHasChanged':
        this.model = new MutatingGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new MutatingPlayfield(this.model, this.viewPort, this.stage)
        break;
      case 'choiceOfImage':
        this.model = new SimpleGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new Playfield(this.model, this.viewPort, this.stage);
        break;
      case 'choicePair':
        this.model = new PairGame(appModel, gamesData[nameGame], taskNumber);
        this.playfield = new PairPlayfield(this.model, this.viewPort, this.stage);
        break;
      default:
        break;
    }
  }

  selectGame(obj) {
    if (!this.model.startCount) {
      return
    }
    const object = obj;
    const check = this.model.checkAnswer(this.model.targetTasks[object.id], object.id);
    this.playfield.emit('selectCell', object);
    switch (check) {
      case 'continue':
        this.playfield.emit('continueSelect', object);
        // object.tint = '0x2a9c9d';
        break;
      case 'well':
        this.model.addReaction();
        if (this.model.checkTask()) {
          object.tint = '0x2a9c9d';
          this.model.stat.correct += 1;
          setTimeout(() => {
            this.stage.removeChildren(0, this.stage.children.length);
            this.playfield.emit('compliteGame', {
              res: true,
            })
            // object.off('pointerover');
            // object.off('pointerout');
            // object.off('pointerdown');
          }, 1000);
        } else {
          object.tint = '0x2a9c9d';
          setTimeout(() => {
            this.model.currentPart += 1;
            this.model.stat.correct += 1;
            this.playfield.emit('newScreen', {
              res: true,
            });
          }, 1000);
        }
        break;
      case 'lose':
        // object.tint = '0xf36273';
        this.model.stat.fail += 1;
        if (!this.model.conditionsWin.mute) {
          playSound(this.model.answer.audio, false, 0.8, console.log).play()
        }
        this.playfield.emit('fallSelect', object);
        // setTimeout(() => {
        //   object.tint = '0xfdb078';
        //   object.alpha = 0.5;
        // }, 1000);
        break;
      default:
        break;
    }
  }
}