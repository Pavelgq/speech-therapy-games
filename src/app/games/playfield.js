import * as PIXI from 'pixi.js';

import EventEmitter from '../utils/eventEmmiter';
import v from '../viewElements';
import func from '../utils/utils';

const {
  playSound,
  loadFile,
  delay,
} = func;

export default class Playfield extends EventEmitter {
  constructor(gameModel, viewPort, stage) {
    super();
    this.model = gameModel;
    this.width = viewPort.width;
    this.height = viewPort.height;

    this.stage = stage;
    this.spaceBetweenFields = 10;
    this.fontSizeBig = this.width / 30;
    this.fontSizeSmall = this.width / 40;
    this.progressBar = {
      width: this.width / 4,
      hight: this.height / 30,
    }

    this.gameFields = [];

    this.progressBarStyle = {
      inColor: '0x2affff',
      outColor: '0x2a9c9d',
    }

    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: this.fontSizeBig,
      fill: '0x2a9c9d',
      align: 'left',
    })
  }

  create() {
    this.printField();
    this.printCell();
    playSound(this.model.answer.audio, false, 0.8, console.log).play()
  }

  refresh() {
    this.refreshField();
    this.refreshCell();
    playSound(this.model.answer.audio, false, 0.8, console.log).play()
  }

  printField() {
    this.border = v.getBorder('0x2a9c9d', this.width, this.height, 4);

    const progress = {
      totalParts: this.model.targetTasksParam.parts,
      currentPart: this.model.currentPart,
      totalTasks: this.model.totalTasks,
      currentTask: this.model.currentTask,
    }

    const name = `${this.model.player.firstName} ${this.model.player.lastName}`
    const lesson = `Урок ${this.model.player.lessons + 1}`
    const task = `Задание ${progress.currentTask}`

    this.nameField = v.getTextField(name, this.textStyle, 10, this.fontSizeBig, 'left');
    this.lessonField = v.getTextField(lesson, this.textStyle, 10, this.fontSizeBig * 3, 'left');
    this.taskField = v.getTextField(task, this.textStyle, 10, this.fontSizeBig * 5, 'left');

    const lessonProgress = progress.currentTask / progress.totalTasks;
    const taskProgress = progress.currentPart / progress.totalParts;

    this.progressBarLesson = v.getProgressBar(lessonProgress, this.progressBarStyle,
      10, this.fontSizeBig * 4, this.progressBar.width, this.progressBar.hight, 4);

    this.progressBarTask = v.getProgressBar(taskProgress, this.progressBarStyle,
      10, this.fontSizeBig * 6, this.progressBar.width, this.progressBar.hight, 4);

    this.finishButton = v.getButton('Завершить', '0x2a9c9d', this.textStyle, 30, this.height - this.fontSizeBig * 2 - 10, 15);

    this.finishButton.interactive = true;
    this.finishButton.buttonMode = true;
    this.finishButton.on('pointerdown', () => {
      this.emit('aheadOfTime', {
        res: true,
      });

      console.log() // тут происходит завершение урока
    });
    this.finishButton.on('pointerover', () => {
      this.finishButton.children[0].alpha = 0.5
    })
    this.finishButton.on('pointerout', () => {
      this.finishButton.children[0].alpha = 1
    })
    this.stage.addChild(this.nameField, this.lessonField, this.taskField,
      this.progressBarLesson, this.progressBarTask, this.finishButton)
  }

  printCell() {
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;

    const position = {
      x: this.spaceBetweenFields,
      y: this.spaceBetweenFields,
    }
    const width = (this.width * 2) / 3;
    const spaceFree = Math.min(width, this.height);
    const maxSideCubes = Math.max(
      this.model.targetTasksParam.width,
      this.model.targetTasksParam.height,
    )
    const size = Math.floor(
      (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes,
    )
    const spaceAroundY = Math.floor(
      (this.height -
        (size * taskHeight +
          this.spaceBetweenFields * (taskHeight - 1))) /
      2,
    )
    const spaceAroundX = Math.floor(
      (width -
        (size * taskWidth +
          this.spaceBetweenFields * (taskWidth - 1))) /
      2,
    )

    const targetTasks = this.model.targetTasks.slice();
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        position.x = spaceAroundX + (size + this.spaceBetweenFields) * i + this.width / 3;
        position.y = spaceAroundY + (size + this.spaceBetweenFields) * j;

        const rect = v.getCell('0xfdb078', '0xfdb078', position.x, position.y, size, 16);
        rect.id = i * taskHeight + j
        const text = targetTasks[rect.id];
        const textField = v.getTextField(text, this.textStyle, position.x + size / 2, position.y + size / 2, 'center');
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on('pointerdown', () => this.select(rect))
        rect.on('pointerover', () => {
          rect.alpha = 0.5
        })
        rect.on('pointerout', () => {
          rect.alpha = 1
        })
        const container = new PIXI.Container();
        container.addChild(rect, textField);
        this.gameFields.push(container);
        this.stage.addChild(container)
      }
    }
  }

  refreshField() {
    this.stage.removeChild(this.lessonField, this.taskField,
      this.progressBarLesson, this.progressBarTask);

    const totalParts = this.model.targetTasksParam.parts;
    const {
      totalTasks,
    } = this.model;
    const {
      currentPart,
    } = this.model;
    const {
      currentTask,
    } = this.model;

    const lesson = `Урок ${this.model.player.lessons + 1}`
    const task = `Задание ${currentTask}`

    this.lessonField = v.getTextField(lesson, this.textStyle, 10, this.fontSizeBig * 3, 'left');
    this.taskField = v.getTextField(task, this.textStyle, 10, this.fontSizeBig * 5, 'left');

    const lessonProgress = currentTask / totalTasks;

    const taskProgress = currentPart / totalParts;

    const style = {
      inColor: '0x2affff',
      outColor: '0x2a9c9d',
    }

    this.progressBarLesson = v.getProgressBar(lessonProgress, style, 10, this.fontSizeBig * 4,
      this.progressBar.width, this.progressBar.hight, 4);

    this.progressBarTask = v.getProgressBar(taskProgress, style, 10, this.fontSizeBig * 6,
      this.progressBar.width, this.progressBar.hight, 4);

    this.stage.addChild(this.nameField, this.lessonField, this.taskField,
      this.progressBarLesson, this.progressBarTask, this.finishButton)
  }

  refreshCell() {
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;

    const position = {
      x: this.spaceBetweenFields,
      y: this.spaceBetweenFields,
    }
    const width = (this.width * 2) / 3;
    const spaceFree = Math.min(width, this.height);
    const maxSideCubes = Math.max(
      this.model.targetTasksParam.width,
      this.model.targetTasksParam.height,
    )
    const size = Math.floor(
      (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes,
    )
    const spaceAroundY = Math.floor(
      (this.height -
        (size * taskHeight +
          this.spaceBetweenFields * (taskHeight - 1))) /
      2,
    )
    const spaceAroundX = Math.floor(
      (width -
        (size * taskWidth +
          this.spaceBetweenFields * (taskWidth - 1))) /
      2,
    )
    const targetTasks = this.model.targetTasks.slice();
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        const id = i * taskHeight + j;
        position.x = spaceAroundX + (size + this.spaceBetweenFields) * i + this.width / 3
        position.y = spaceAroundY + (size + this.spaceBetweenFields) * j
        const text = targetTasks[id];
        const textField = v.getTextField(text, this.textStyle, position.x + size / 2, position.y + size / 2, 'center');

        this.gameFields[id].removeChildAt(1);
        this.gameFields[id].addChild(textField);
      }
    }
  }

  // TODO: Убрать select в game.js
  select(obj) {
    const object = obj;
    const check = this.model.checkAnswer(this.model.targetTasks[object.id]);
    switch (check) {
      case 'continue':
        console.log('верно');
        object.tint = '0x2a9c9d';
        break;
      case 'well':
        if (this.model.checkTask()) {
          object.tint = '0x2a9c9d';
          setTimeout(() => {
            this.emit('compliteGame', {
              res: true,
            })
            object.off('pointerover');
            object.off('pointerout');
            object.off('pointerdown');
            this.stage.removeChildren(0, this.stage.children.length);
          }, 1000);
        } else {
          object.tint = '0x2a9c9d';
          setTimeout(() => {
            this.model.currentPart += 1;
            this.emit('newScreen', {
              res: true,
            })
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