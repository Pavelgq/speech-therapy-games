import * as PIXI from 'pixi.js';
import Game from './games/game';

export default class View {
  constructor(model) {
    this.model = model;
    this.ratio = (4 / 3);
    this.viewPort = {
      width: window.innerWidth,
      height: window.innerWidth / this.ratio,
    };

    this.fontSizeBig = this.viewPort.width / 30;
    this.fontSizeSmall = this.viewPort.width / 40;

    this.renderer = PIXI.autoDetectRenderer({
      height: this.viewPort.height,
      width: this.viewPort.width,
      backgroundColor: 0xf0f0f0,
      // transparent: true,
      resolution: window.devicePixelRatio,
      autoResize: true,
      antialias: true,
    });

    this.ticker = PIXI.Ticker.shared;

    this.stage = new PIXI.Container();

    this.render = this.render.bind(this);
  }

  lessonScreen(lesson, task, gameData) {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const b = new PIXI.Graphics();
    b.lineStyle(4, 0x2a9c9d, 1);
    b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4);
    this.stage.addChild(b);
    const h1 = `Урок ${lesson}`;
    const h2 = `Задание ${task} ${gameData.title}`;
    const fontSizeBig = this.viewPort.width / 30;
    const fontSizeSmall = this.viewPort.width / 40;
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }
    this.printText(h1, fontSizeBig, center.x, center.y - this.fontSizeBig);
    this.printText(h2, fontSizeSmall, center.x, center.y + this.fontSizeBig);
  }

  goodScreen() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const b = new PIXI.Graphics();
    b.lineStyle(4, 0x2a9c9d, 1);
    b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4);
    this.stage.addChild(b);
    const h1 = 'Верно';
    const h2 = 'Молодец';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }
    this.printText(h1, 28, center.x, center.y - this.fontSizeBig);
    this.printText(h2, 28, center.x, center.y + this.fontSizeBig);
  }

  badScreen() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const b = new PIXI.Graphics();
    b.lineStyle(4, 0x2a9c9d, 1);
    b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4);
    this.stage.addChild(b);
    const h1 = 'Вот незадача';
    const h2 = 'В следующий раз справишься';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }
    this.printText(h1, 28, center.x, center.y - this.fontSizeBig);
    this.printText(h2, 20, center.x, center.y + this.fontSizeBig);
  }

  endLesson() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const b = new PIXI.Graphics();
    b.lineStyle(4, 0x2a9c9d, 1);
    b.drawRect(2, 2, this.viewPort.width - 4, this.viewPort.height - 4);
    this.stage.addChild(b);
    const h1 = 'Урок окончен';
    const h2 = 'Возвращайся завтра';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }
    this.printText(h1, 28, center.x, center.y - this.fontSizeBig);
    this.printText(h2, 20, center.x, center.y + this.fontSizeBig);
  }

  printText(text, fontSize, x, y) {
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize,
      fill: '0x2a9c9d',
      align: 'center',
    })
    const score = new PIXI.Text(text, textStyle)
    const textMetrics = PIXI.TextMetrics.measureText(text, textStyle)
    score.x = x - textMetrics.width / 2
    score.y = y - textMetrics.height / 2

    this.stage.addChild(score)
  }

  createGame(id, taskNumber) {
    return new Game(this.renderer, this.viewPort, this.model, this.ticker, id, taskNumber)
  }

  render() {
    this.renderer.render(this.stage);
  }

  gameLoop() {
    // console.log(delta)
    this.render();
  }

  resize() {
    let w;
    let h;
    if (window.innerWidth / window.innerHeight >= this.ratio) {
      w = window.innerHeight * this.ratio
      h = window.innerHeight
    } else {
      w = window.innerWidth * 0.9
      h = (window.innerWidth * 0.9) / this.ratio
    }
    this.renderer.view.style.width = `${w}px`
    this.renderer.view.style.height = `${h}px`
  }
}