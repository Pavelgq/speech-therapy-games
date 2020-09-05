import * as PIXI from 'pixi.js';

export default class Playfield {
  constructor(model, viewPort, stage) {
    this.model = model;
    this.data = model.generate();
    this.width = viewPort.width;
    this.height = viewPort.height;
    this.stage = stage;
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 28,
      fill: '0xfdb078',
      align: 'center',
      trim: true,
    });
  }

  create() {
    this.printBorder();
    this.printCell();
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
        const text = this.printText(position.x + (size / 2), position.y + (size / 2));
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
}