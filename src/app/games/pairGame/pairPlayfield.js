import * as PIXI from 'pixi.js';
import Playfield from '../playfield';
import v from '../../viewElements';
import func from '../../utils/utils';

const {
  playSound,
} = func;

export default class PairPlayfield extends Playfield {
  constructor(gameModel, viewPort, stage) {
    super(gameModel, viewPort, stage);
    this.talk = this.talk.bind(this);
    this.openCell = this.openCell.bind(this);
    this.closeCell = this.closeCell.bind(this);
    this.delay = this.delay.bind(this);

    this.waitClose = false;
  }

  create() {
    this.printField();
    this.printCell();
    this.presentation();
    this.dispatch('selectCell', this.openCell);
    this.dispatch('fallSelect', this.delay)
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
    // const answers = this.model.lastAnswers;
    // if (i < answers.length) {
    //   playSound(answers[i].audio, false, 0.8, this.talk, i + 1).play();
    // } else {
    this.model.setReaction();

    this.closeCells();
    // }
  }

  delay(obj) {
    this.waitClose = true;
    setTimeout(() => {
      this.closeCells();
    }, 1000)
  }

  openCell(event) {
    const { id } = event;
    if (!this.waitClose && this.model.closeCell[id].close) {
      const width = (this.width * 2) / 3;
      const spaceFree = Math.min(width, this.height);
      const maxSideCubes = Math.max(
        this.model.targetTasksParam.width,
        this.model.targetTasksParam.height,
      )
      const size = Math.floor(
        (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes,
      )
      const index = this.model.closeCell.findIndex((el) => el.id === id);
      if (index >= 0) {
        this.model.closeCell[id].close = false;

        const {
          x,
        } = this.gameFields[id].children[0];
        const {
          y,
        } = this.gameFields[id].children[0];
        const {
          targetTasks,
        } = this.model;
        const text = targetTasks[id];
        const textField = v.getTextField(text, this.textStyle, x + size / 2, y + size / 2, 'center');
        this.gameFields[id].addChild(textField);
      }
    }
  }

  closeCell(id) {
    const currentIndex = this.model.closeCell.findIndex((el) => id === el.id)
    if (currentIndex >= 0 && this.model.closeCell[currentIndex].close === false
      && this.model.closeCell[currentIndex].ready) {
      this.gameFields[id].removeChildAt(1);
      this.model.closeCell[currentIndex].close = true;
    }
  }

  closeCells() {
    this.waitClose = false;
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        const id = i * taskHeight + j;
        const currentIndex = this.model.closeCell.findIndex((el) => id === el.id)
        if (currentIndex >= 0 && this.model.closeCell[currentIndex].close === false
          && !this.model.closeCell[currentIndex].ready) {
          this.gameFields[id].removeChildAt(1);
          this.model.closeCell[currentIndex].close = true;
        }
      }
    }
  }
}