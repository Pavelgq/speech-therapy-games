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
    this.data = gameModel.gameMatrix.slice();
    this.width = viewPort.width;
    this.height = viewPort.height;
    this.stage = stage;
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 28,
      fill: '0x2a9c9d',
      align: 'center',
    });

    this.currentMatrix = 0;
  }

  create() {
    this.printField();
    this.printCell();
    playSound(loadFile(this.model.rules), false, 0.8, console.log)
  }

  printField() {
    const b = new PIXI.Graphics()
    b.lineStyle(4, '0x2a9c9d', 1)
    b.drawRect(2, 2, this.width - 4, this.height - 4)
    this.stage.addChild(b)

    const name = `${this.model.player.firstName} ${this.model.player.lastName}`
    const lesson = `Урок ${this.model.player.lesson + 1}`
    const task = `Задание ${this.task + 1}`
    this.printText(name, this.width / 40, 10, 10)
    this.printText(lesson, this.width / 60, 10, 60)
    this.printText(task, this.width / 60, 10, 110)

    this.printRect(10, 80, 30, '0x2a9c9d', 30, this.width / 4)
    this.printRect(15, 87.5, 15, '0x2affff', 15, 10)
    this.printRect(10, 130, 30, '0x2a9c9d', 30, this.width / 4)
    this.printRect(15, 137.5, 15, '0x2affff', 15, this.width / 4 - 10)
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
      this.model.matrixParam.width,
      this.model.matrixParam.height,
    )
    const size = Math.floor(
      (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes,
    )
    const spaceAroundY = Math.floor(
      (this.height
        - (size * this.model.matrixParam.height
          + spaceBetween * (this.model.matrixParam.height - 1)))
        / 2,
    )
    const spaceAroundX = Math.floor(
      (width
        - (size * this.model.matrixParam.width
          + spaceBetween * (this.model.matrixParam.width - 1)))
        / 2,
    )

    for (let i = 0; i < this.model.matrixParam.width; i++) {
      for (let j = 0; j < this.model.matrixParam.height; j++) {
        position.x = spaceAroundX + (size + spaceBetween) * i + this.width / 3
        position.y = spaceAroundY + (size + spaceBetween) * j
        const rect = new PIXI.Graphics()
        rect.lineStyle(2, '0xfdb078', 1)
        rect.position.x = position.x
        rect.position.y = position.y
        rect.beginFill('0xfdb078', 0.5)
        rect.drawRoundedRect(0, 0, size, size, 16)
        rect.endFill()
        rect.id = i * this.model.matrixParam.height + j

        const text = this.data[this.currentMatrix][0];
        this.printText(text,
          position.x + size / 2,
          position.y + size / 2);
        this.data[this.currentMatrix].splice(0, 1);

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

  printText(text, x, y) {
    const score = new PIXI.Text(text, this.textStyle);

    const textMetrics = PIXI.TextMetrics.measureText(text, this.textStyle);

    score.x = x - textMetrics.width / 2;
    score.y = y - textMetrics.height / 2;

    this.stage.addChild(score)
  }

  select(obj) {
    const object = obj;
    object.off('pointerover');
    object.off('pointerout');
    object.off('pointerdown');

    if (this.model.isTrue(object.id)) {
      console.log('верно');
      object.tint = '0x2a9c9d';
      if (this.model.isComplite()) {
        this.emit('compliteGame', { res: true })
        this.stage.removeChildren(0, this.stage.children.length);
      }
    } else {
      console.log('не верно');
      object.tint = '0xf36273';
      this.emit('compliteGame', { res: false })
      this.stage.removeChildren(0, this.stage.children.length);
    }
  }
}