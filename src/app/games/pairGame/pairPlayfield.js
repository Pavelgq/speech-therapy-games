import * as PIXI from 'pixi.js';
import Playfield from '../playfield';
import v from '../../viewElements';
import func from '../../utils/utils';

const {
  playSound,
} = func;

export default class MutatingPlayfield extends Playfield {
  constructor(gameModel, viewPort, stage) {
    super(gameModel, viewPort, stage);
    this.talk = this.talk.bind(this);
  }

  create() {
    this.printField();
    this.printCell();
    this.presentation();
  }

  refresh() {
    this.refreshField();
    this.refreshCell();
    this.presentation();
  }

  presentation() {
    // const answers = this.model.lastAnswers;
    this.talk();
  }

  talk(i = 0) {
    const answers = this.model.lastAnswers;
    if (i < answers.length) {
      playSound(answers[i].audio, false, 0.8, this.talk, i + 1).play();
    } else {
      this.model.setReaction();

      this.closeCell();
    }
  }

  closeCell() {
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        const id = i * taskHeight + j;
        if (this.model.closeCell[id]) {
          this.gameFields[id].removeChildAt(1);
        }
      }
    }
  }
}