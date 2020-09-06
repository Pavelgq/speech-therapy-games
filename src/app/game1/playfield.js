import * as PIXI from 'pixi.js';
import EventEmitter from '../utils/eventEmmiter';
import func from '../utils/utils';

const {
  playSound,
} = func;

export default class Playfield extends EventEmitter {
  constructor(model, viewPort, stage) {
    super();
    this.model = model;
    this.data = model.gameData.slice();
    this.width = viewPort.width;
    this.height = viewPort.height;
    this.stage = stage;
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 28,
      fill: '0x2a9c9d',
      align: 'center',
    });
  }

  create() {
    // this.printBorder();
    this.printCell();
    playSound(this.model.gameWord.audio, false, 0.8)
  }

  printBorder() {
    const b = new PIXI.Graphics();
    b.lineStyle(4, 0x2a9c9d, 1);
    b.drawRect(2, 2, this.width - 4, this.height - 4);
    this.stage.addChild(b);
    this.border = b;
  }

  printCell() {
    const spaceBetween = 10;
    const position = {
      x: spaceBetween,
      y: spaceBetween,
    };
    const spaceFree = Math.min(this.width, this.height);
    const maxSideCubes = Math.max(this.model.cubes.width, this.model.cubes.height);
    const size = Math.floor((spaceFree - ((maxSideCubes + 1) * 10)) / maxSideCubes);
    const spaceAroundY = Math.floor((this.height - (size * this.model.cubes.height
      + spaceBetween * (this.model.cubes.height - 1))) / 2);
    const spaceAroundX = Math.floor((this.width - (size * this.model.cubes.width
      + spaceBetween * (this.model.cubes.width - 1))) / 2);

    for (let i = 0; i < this.model.cubes.width; i++) {
      for (let j = 0; j < this.model.cubes.height; j++) {
        position.x = spaceAroundX + (size + spaceBetween) * (i);
        position.y = spaceAroundY + (size + spaceBetween) * (j);
        const rect = new PIXI.Graphics();
        rect.lineStyle(2, 0xfdb078, 1);
        rect.position.x = position.x;
        rect.position.y = position.y;
        rect.beginFill(0xfdb078, 0.5);
        rect.drawRoundedRect(0, 0, size, size, 16);
        rect.endFill();
        rect.id = i * this.model.cubes.height + j;
        const text = this.printText(position.x + (size / 2), position.y + (size / 2));
        rect.interactive = true;
        rect.on('pointerover', () => rect.alpha = 0.5);
        rect.on('pointerout', () => rect.alpha = 1);
        rect.on('pointerdown', () => this.select(rect));
        this.stage.addChild(rect);

        this.stage.addChild(text);
      }
    }
  }

  printText(x, y) {
    const text = this.data[0];
    this.data.splice(0, 1);
    const score = new PIXI.Text(text, this.textStyle);

    const textMetrics = PIXI.TextMetrics.measureText(text, this.textStyle);

    score.x = x - textMetrics.width / 2;
    score.y = y - textMetrics.height / 2;

    return score;
  }

  select(obj) {
    obj.off('pointerover');
    obj.off('pointerout');
    obj.off('pointerdown');

    if (this.model.isTrue(obj.id)) {
      console.log('верно');
      if (this.model.isComplite()) {
        this.emit('compliteGame', { res: true })
      }
      obj.tint = '0x2a9c9d';
    } else {
      console.log('не верно');
      obj.tint = '0xf36273';
      this.emit('compliteGame', { res: false })
    }
  }
}