import * as PIXI from 'pixi.js';

import EventEmitter from '../utils/eventEmmiter';
import v from '../viewElements';
import func from '../utils/utils';
import colors from '../colors';

const fullscreenIcon = require('../../assets/icons/fullscreen.svg');

const { playSound } = func;

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
    };

    this.gameFields = [];

    this.progressBarStyle = {
      inColor: colors.border,
      outColor: colors.hover,
    };

    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: this.fontSizeBig,
      fill: colors.textColor,
      align: 'left',
    });
  }

  create() {
    this.printField();
    this.printCell();
    this.model.setReaction();
    if (!this.model.conditionsWin.mute) {
      playSound(this.model.answer.audio, false, 0.8, console.log).play();
    }
    this.dispatch('continueSelect', v.selectGoodCell);
    this.dispatch('fallSelect', v.selectBadCell);
  }

  refresh() {
    this.refreshField();
    this.refreshCell();
    this.model.setReaction();
    if (!this.model.conditionsWin.mute) {
      playSound(this.model.answer.audio, false, 0.8, console.log).play();
    }
  }

  printField() {
    this.background = v.getRect(
      0,
      0,
      colors.backgroundColor,
      0,
      this.width,
      this.height,
    );
    this.background.alpha = 10;
    const progress = {
      totalParts: this.model.targetTasksParam.parts + 1,
      currentPart: this.model.currentPart,
      totalTasks: this.model.totalTasks,
      currentTask: this.model.currentTask,
    };

    const name = `${this.model.player.firstName} ${this.model.player.lastName}`;
    const lesson = `Урок ${this.model.player.lessons + 1}`;
    const task = `Задание ${progress.currentTask}`;

    this.nameField = v.getTextField(
      name,
      this.textStyle,
      10,
      this.fontSizeBig,
      'left',
    );
    this.lessonField = v.getTextField(
      lesson,
      this.textStyle,
      10,
      this.fontSizeBig * 2.5,
      'left',
    );
    this.taskField = v.getTextField(
      task,
      this.textStyle,
      10,
      this.fontSizeBig * 5,
      'left',
    );

    const lessonProgress = (progress.currentTask - 1) / progress.totalTasks;

    const taskProgress = progress.currentPart / progress.totalParts;

    this.progressBarLesson = v.getProgressBar(
      lessonProgress,
      this.progressBarStyle,
      10,
      this.fontSizeBig * 3.7,
      this.progressBar.width,
      this.progressBar.hight,
      4,
    );

    this.progressBarTask = v.getProgressBar(
      taskProgress,
      this.progressBarStyle,
      10,
      this.fontSizeBig * 6.2,
      this.progressBar.width,
      this.progressBar.hight,
      4,
    );

    this.finishButton = v.getButton(
      'Завершить',
      colors.border,
      this.textStyle,
      this.width / 10,
      this.height - this.fontSizeBig * 2,
      this.fontSizeSmall,
    );
    const sprite = new PIXI.Sprite(PIXI.Texture.from(fullscreenIcon));
    this.fullscreenBtn = v.getButtonWithIcon(
      sprite,
      colors.border,
      this.textStyle,
      this.width / 10,
      this.height - this.fontSizeBig * 2,
      this.fontSizeSmall,
    );
    this.finishButton.interactive = true;
    this.finishButton.buttonMode = true;
    this.finishButton.on('pointerdown', () => {
      this.emit('aheadOfTime', {
        res: true,
      });
    });
    this.finishButton.on('pointerover', () => {
      this.finishButton.children[0].alpha = 0.5;
    });
    this.finishButton.on('pointerout', () => {
      this.finishButton.children[0].alpha = 1;
    });
    this.stage.addChild(
      this.background,
      this.nameField,
      this.lessonField,
      this.taskField,
      this.progressBarLesson,
      this.progressBarTask,
      this.finishButton,
    );
  }

  printCell() {
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;

    const position = {
      x: this.spaceBetweenFields,
      y: this.spaceBetweenFields,
    };
    const width = (this.width * 2) / 3;
    const spaceFree = Math.min(width, this.height);
    const maxSideCubes = Math.max(
      this.model.targetTasksParam.width,
      this.model.targetTasksParam.height,
    );
    const size = Math.floor(
      (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes,
    );
    const spaceAroundY = Math.floor(
      (this.height
        - (size * taskHeight + this.spaceBetweenFields * (taskHeight - 1)))
        / 2,
    );
    const spaceAroundX = Math.floor(
      (width - (size * taskWidth + this.spaceBetweenFields * (taskWidth - 1)))
        / 2,
    );

    const targetTasks = this.model.targetTasks.slice();
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        position.x = spaceAroundX + (size + this.spaceBetweenFields) * i + this.width / 3;
        position.y = spaceAroundY + (size + this.spaceBetweenFields) * j;

        const container = new PIXI.Container();

        const rect = v.getCell(
          colors.card,
          colors.card,
          position.x,
          position.y,
          size,
          16,
        );
        rect.id = i * taskHeight + j;

        if (this.model.conditionsWin.image) {
          const targetImage = this.model.targetImages[rect.id];
          if (targetImage) {
            const pictureField = v.getPicture(
              targetImage,
              size,
              position.x,
              position.y,
            );
            pictureField.mask = rect;
            container.addChild(rect);
            container.addChild(pictureField);
          }
        } else {
          const text = targetTasks[rect.id];
          const textField = v.getTextField(
            text,
            this.textStyle,
            position.x + size / 2,
            position.y + size / 2,
            'center',
          );
          container.addChild(rect, textField);
        }
        rect.interactive = true;
        rect.buttonMode = true;
        rect.on('pointerdown', () => {
          this.emit('selectedAnswer', rect);
        });
        this.gameFields.push(container);
        this.stage.addChild(container);
      }
    }
  }

  refreshField() {
    this.stage.removeChild(
      this.lessonField,
      this.taskField,
      this.progressBarLesson,
      this.progressBarTask,
    );

    const progress = {
      totalParts: this.model.targetTasksParam.parts + 1,
      currentPart: this.model.currentPart,
      totalTasks: this.model.totalTasks,
      currentTask: this.model.currentTask,
    };

    const lesson = `Урок ${this.model.player.lessons + 1}`;
    const task = `Задание ${progress.currentTask}`;

    this.lessonField = v.getTextField(
      lesson,
      this.textStyle,
      10,
      this.fontSizeBig * 3,
      'left',
    );
    this.taskField = v.getTextField(
      task,
      this.textStyle,
      10,
      this.fontSizeBig * 5,
      'left',
    );

    const lessonProgress = (progress.currentTask - 1) / progress.totalTasks;

    const taskProgress = progress.currentPart / progress.totalParts;

    const style = {
      inColor: colors.border,
      outColor: colors.hover,
    };

    this.progressBarLesson = v.getProgressBar(
      lessonProgress,
      style,
      10,
      this.fontSizeBig * 4,
      this.progressBar.width,
      this.progressBar.hight,
      4,
    );

    this.progressBarTask = v.getProgressBar(
      taskProgress,
      style,
      10,
      this.fontSizeBig * 6,
      this.progressBar.width,
      this.progressBar.hight,
      4,
    );

    this.stage.addChild(
      this.nameField,
      this.lessonField,
      this.taskField,
      this.progressBarLesson,
      this.progressBarTask,
      this.finishButton,
    );
  }

  refreshCell() {
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;

    const width = (this.width * 2) / 3;
    const spaceFree = Math.min(width, this.height);
    const maxSideCubes = Math.max(
      this.model.targetTasksParam.width,
      this.model.targetTasksParam.height,
    );
    const size = Math.floor(
      (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes,
    );

    const targetTasks = this.model.targetTasks.slice();
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        const id = i * taskHeight + j;
        const { x } = this.gameFields[id].children[0];
        const { y } = this.gameFields[id].children[0];

        this.gameFields[id].children[0].tint = '0xfdb078';
        this.gameFields[id].children[0].alpha = 0.5;
        this.gameFields[id].removeChildAt(1);
        if (this.model.conditionsWin.image) {
          const targetImages = this.model.targetImages[id];
          const pictureField = v.getPicture(targetImages);
          this.gameFields[id].addChild(pictureField);
        } else {
          const text = targetTasks[id];
          const textField = v.getTextField(
            text,
            this.textStyle,
            x + size / 2,
            y + size / 2,
            'center',
          );
          this.gameFields[id].addChild(textField);
        }
      }
    }
  }
}
