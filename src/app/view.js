import * as PIXI from 'pixi.js';
import EventEmitter from './utils/eventEmmiter';
import v from './viewElements';
import Game from './games/game';

export default class View extends EventEmitter {
  constructor(model) {
    super();
    this.model = model;
    this.ratio = (4 / 3);
    this.viewPort = {
      width: window.innerWidth,
      height: window.innerWidth / this.ratio,
    };

    this.fontSizeBig = this.viewPort.width / 30;
    this.fontSizeSmall = this.viewPort.width / 40;
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: this.fontSizeBig,
      fill: '0x2a9c9d',
      align: 'center',
    })

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
    this.border = v.getBorder('0x2a9c9d', this.viewPort.width, this.viewPort.height, 4)
  }

  startScreen() {
    this.background = v.getRect(0, 0, '0xffffff', 0, this.viewPort.width, this.viewPort.height);

    const h1 = `Добро пожаловать, ${this.model.player.firstName}`;
    const h2 = 'Начнем урок?';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }

    const textStyle = {
      fontSize: this.fontSizeBig,
      align: 'center',
    }
    const textTop = v.getTextField(h1, this.textStyle, center.x, center.y - this.fontSizeBig, 'center');
    textStyle.fontSize = this.fontSizeSmall;
    const textButton = v.getTextField(h2, this.textStyle, center.x, center.y + this.fontSizeBig, 'center');

    this.startButton = v.getButton('Начать', '0x2a9c9d', this.textStyle, center.x - 70, center.y + this.fontSizeBig * 2, 15);

    this.startButton.interactive = true;
    this.startButton.buttonMode = true;
    this.startButton.on('pointerdown', () => {
      this.emit('startGame', {
        res: true,
      });
    });
    this.startButton.on('pointerover', () => {
      this.startButton.children[0].alpha = 0.5
    })
    this.startButton.on('pointerout', () => {
      this.startButton.children[0].alpha = 1
    })

    this.stage.addChild(this.background, this.border, textTop, textButton, this.startButton)
  }

  lessonScreen(lesson, task, gameData) {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));

    this.background = v.getRect(0, 0, '0xffffff', 0, this.viewPort.width, this.viewPort.height);

    const h1 = `Урок ${lesson}`;
    const h2 = `Задание ${task} ${gameData.title}`;
    const fontSizeBig = this.viewPort.width / 30;
    const fontSizeSmall = this.viewPort.width / 40;
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }

    const textStyle = {
      fontSize: fontSizeBig,
      align: 'center',
    }
    const textTop = v.getTextField(h1, textStyle, center.x, center.y - this.fontSizeBig, 'center');
    textStyle.fontSize = fontSizeSmall;
    const textButton = v.getTextField(h2, textStyle, center.x, center.y + this.fontSizeBig, 'center');

    this.stage.addChild(this.background, this.border, textTop, textButton)
  }

  goodScreen() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const h1 = 'Верно';
    const h2 = 'Молодец';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }

    const textStyle = {
      fontSize: 28,
      align: 'center',
    }
    const textTop = v.getTextField(h1, textStyle, center.x, center.y - this.fontSizeBig, 'center');
    textStyle.fontSize = 24;
    const textButton = v.getTextField(h2, textStyle, center.x, center.y + this.fontSizeBig, 'center');

    this.stage.addChild(this.border, textTop, textButton)
  }

  badScreen() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const h1 = 'Вот незадача';
    const h2 = 'В следующий раз справишься';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }
    const textStyle = {
      fontSize: 28,
      align: 'center',
    }
    const textTop = v.getTextField(h1, textStyle, center.x, center.y - this.fontSizeBig, 'center');
    textStyle.fontSize = 24;
    const textButton = v.getTextField(h2, textStyle, center.x, center.y + this.fontSizeBig, 'center');

    this.stage.addChild(this.border, textTop, textButton)
  }

  endLesson() {
    this.stage.removeChildren(0, this.stage.children.length);
    this.ticker.add((delta) => this.gameLoop(delta));
    const h1 = 'Урок окончен';
    const h2 = 'Возвращайся завтра';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    }
    const textStyle = {
      fontSize: 28,
      align: 'center',
    }
    const textTop = v.getTextField(h1, textStyle, center.x, center.y - this.fontSizeBig, 'center');
    textStyle.fontSize = 24;
    const textButton = v.getTextField(h2, textStyle, center.x, center.y + this.fontSizeBig, 'center');

    this.stage.addChild(this.border, textTop, textButton)
  }

  createGame(id, taskNumber) {
    this.model.game = new Game(this.renderer,
      this.viewPort, this.model, this.ticker, id, taskNumber)
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