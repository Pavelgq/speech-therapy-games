import * as PIXI from 'pixi.js';

import EventEmitter from '../utils/eventEmmiter';
import func from '../utils/utils';

const {
  playSound,
  loadFile,
} = func;

export default class Playfield extends EventEmitter {
  constructor(gameModel, viewPort, stage) {
    super();
    this.model = gameModel;
    this.width = viewPort.width;
    this.height = viewPort.height;

    this.stage = stage;
    this.fontSizeBig = this.width / 30;
    this.fontSizeSmall = this.width / 40;
    this.progressBar = {
      width: this.width / 4,
      hight: this.height / 30,
    }
  }

  create() {
    this.printField();
    this.printCell();
    playSound(this.model.answer.audio, false, 0.8, this.log)
  }

  log() {
    console.log(this, 'audio')
  }

  refresh() {
    this.printField();
    this.printCell();
  }

  printField() {
    const b = new PIXI.Graphics()
    b.lineStyle(4, '0x2a9c9d', 1)
    b.drawRect(2, 2, this.width - 4, this.height - 4)
    this.stage.addChild(b)

    const totalParts = this.model.targetTasksParam.parts;
    const { totalTasks } = this.model;
    const { currentPart } = this.model;
    const { currentTask } = this.model;

    const name = `${this.model.player.firstName} ${this.model.player.lastName}`
    const lesson = `Урок ${this.model.player.lessons + 1}`
    const task = `Задание ${currentTask}`
    this.printText(name, this.fontSizeBig, 10, this.fontSizeBig)
    this.printText(lesson, this.fontSizeSmall, 10, this.fontSizeBig * 3)
    this.printText(task, this.fontSizeSmall, 10, this.fontSizeBig * 5)

    const lessonProgress = ((this.progressBar.width - this.progressBar.hight)
    / totalTasks) * currentTask;
    const taskProgress = ((this.progressBar.width - this.progressBar.hight)
    / totalParts) * currentPart;

    this.printRect(10, this.fontSizeBig * 4,
      this.progressBar.hight, '0x2a9c9d',
      this.progressBar.hight, this.progressBar.width);

    this.printRect(10 + this.progressBar.hight / 4,
      this.fontSizeBig * 4 + this.progressBar.hight / 4,
      this.progressBar.hight / 2, '0x2affff', this.progressBar.hight / 2,
      lessonProgress);

    this.printRect(10, this.fontSizeBig * 6,
      this.progressBar.hight, '0x2a9c9d',
      this.progressBar.hight, this.progressBar.width);

    this.printRect(10 + this.progressBar.hight / 4,
      this.fontSizeBig * 6 + this.progressBar.hight / 4,
      this.progressBar.hight / 2, '0x2affff', this.progressBar.hight / 2,
      taskProgress);
  }

  printRect(x, y, size, color, rad, length) {
    const rect = new PIXI.Graphics()
    rect.beginFill(color, 0.5)
    rect.drawRoundedRect(x, y, length, size, rad)
    this.stage.addChild(rect)
  }

  printBorder() {
    const b = new PIXI.Graphics();
    b.lineStyle(4, 0x2a9c9d, 1);
    b.drawRect(2, 2, this.width - 4, this.height - 4);
    this.stage.addChild(b);
    this.border = b;
  }

  printCell() {
    const spaceBetween = 10
    const position = {
      x: spaceBetween,
      y: spaceBetween,
    }
    const width = (this.width * 2) / 3
    const spaceFree = Math.min(width, this.height)
    const maxSideCubes = Math.max(
      this.model.targetTasksParam.width,
      this.model.targetTasksParam.height,
    )
    const size = Math.floor(
      (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes,
    )
    const spaceAroundY = Math.floor(
      (this.height
        - (size * this.model.targetTasksParam.height
          + spaceBetween * (this.model.targetTasksParam.height - 1)))
        / 2,
    )
    const spaceAroundX = Math.floor(
      (width
        - (size * this.model.targetTasksParam.width
          + spaceBetween * (this.model.targetTasksParam.width - 1)))
        / 2,
    )

    const targetTasks = this.model.targetTasks.slice();
    for (let i = 0; i < this.model.targetTasksParam.width; i++) {
      for (let j = 0; j < this.model.targetTasksParam.height; j++) {
        position.x = spaceAroundX + (size + spaceBetween) * i + this.width / 3
        position.y = spaceAroundY + (size + spaceBetween) * j
        const rect = new PIXI.Graphics()
        rect.lineStyle(2, '0xfdb078', 1)
        rect.position.x = position.x
        rect.position.y = position.y
        rect.beginFill('0xfdb078', 0.5)
        rect.drawRoundedRect(0, 0, size, size, 16)
        rect.endFill()
        rect.id = i * this.model.targetTasksParam.height + j

        const text = targetTasks[rect.id];
        console.log(targetTasks, rect.id);
        this.printText(text, this.fontSizeBig,
          position.x + size / 2,
          position.y + size / 2,
          true);

        rect.interactive = true
        rect.on('pointerdown', () => this.select(rect))
        rect.on('pointerover', () => {
          rect.alpha = 0.5
        })
        rect.on('pointerout', () => {
          rect.alpha = 1
        })
        this.stage.addChild(rect)
      }
    }
  }

  printText(text, fontSize, x, y, center = false) {
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize,
      fill: '0x2a9c9d',
      align: 'center',
    })
    const score = new PIXI.Text(text, textStyle)
    const textMetrics = PIXI.TextMetrics.measureText(text, textStyle)
    if (center) {
      score.x = x - textMetrics.width / 2
      score.y = y - textMetrics.height / 2
    } else {
      score.x = x
      score.y = y
    }

    this.stage.addChild(score)
  }

  select(obj) {
    const object = obj;
    // object.off('pointerover');
    // object.off('pointerout');
    // object.off('pointerdown');

    if (this.model.checkAnswer(this.model.targetTasks[object.id])) {
      console.log('верно');
      object.tint = '0x2a9c9d';

      if (this.model.checkTask()) {
        this.emit('compliteGame', { res: true })
        object.off('pointerover');
        object.off('pointerout');
        object.off('pointerdown');
        this.stage.removeChildren(0, this.stage.children.length);
      } else {
        this.model.currentPart += 1;
        this.emit('newScreen', { res: true })
      }
    } else {
      console.log('не верно');
      object.tint = '0xf36273';
      playSound(this.model.answer.audio, false, 0.8, console.log)
      setTimeout(() => {
        object.tint = '0xfdb078';
        object.alpha = 0.5;
      }, 1000);
      // this.emit('compliteGame', { res: false })
      // this.stage.removeChildren(0, this.stage.children.length);
    }
  }
}