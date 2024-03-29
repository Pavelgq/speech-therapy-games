import * as PIXI from 'pixi.js-legacy';
import EventEmitter from './utils/eventEmmiter';
import v from './viewElements';
import Game from './games/game';
import Timer from './utils/timer';
import colors from './colors';

const fullscreenIcon = require('../assets/icons/fullscreen.svg');

export default class View extends EventEmitter {
  constructor(model, wrapper) {
    super();
    this.model = model;
    this.wrapper = wrapper;
    this.ratio = 4 / 3;
    this.viewPort = {
      width: window.innerWidth,
      height: window.innerWidth / this.ratio,
    };

    this.fontSizeBig = this.viewPort.width / 32;
    this.fontSizeSmall = this.viewPort.width / 42;
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: this.fontSizeBig,
      fill: colors.textColor,
      align: 'center',
    });

    this.renderer = PIXI.autoDetectRenderer({
      height: this.viewPort.height,
      width: this.viewPort.width,
      backgroundColor: colors.backgroundColor,
      // transparent: true,
      resolution: window.devicePixelRatio,
      autoResize: true,
      antialias: true,
    });

    this.ticker = PIXI.Ticker.shared;

    this.stage = new PIXI.Container();

    this.render = this.render.bind(this);
    this.inFullscreen = false;
    this.screenElement = null;

    this.ticker.add(this.render);
    this.timerToButton = this.timerToButton.bind(this);
    this.fullscreen = this.fullscreen.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onFullscreenChange = this.onFullscreenChange.bind(this);
    const textureButton = PIXI.Texture.from(fullscreenIcon);
    textureButton.tint = colors.backgroundColor;
    const sprite = new PIXI.Sprite(PIXI.Texture.from(fullscreenIcon));
    this.fullscreenBtn = v.getButtonWithIcon(
      sprite,
      colors.border,
      this.textStyle,
      this.viewPort.width / 30,
      this.viewPort.height / 20,
      this.fontSizeSmall,
    );
    // this.stage.addChild(this.fullscreenBtn)
    this.fullscreenBtn.on('pointerup', this.onDragEnd);
    this.border = v.getBorder(
      colors.border,
      this.viewPort.width,
      this.viewPort.height,
      4,
    );

    document.cancelFullScreen = document.cancelFullScreen
      || document.webkitCancelFullScreen
      || document.mozCancelFullScreen;
  }

  startScreen() {
    this.background = v.getRect(
      0,
      0,
      colors.backgroundColor,
      0,
      this.viewPort.width,
      this.viewPort.height,
    );

    const h1 = 'Добро пожаловать!'; // ${this.model.player.firstName}
    const h2 = 'Начнем урок?';
    const h3 = 'Следующий урок через: ';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    };

    const textStyle = {
      fill: colors.textColor,
      fontSize: this.fontSizeBig,
      align: 'center',
    };
    const textTop = v.getTextField(
      h1,
      this.textStyle,
      center.x,
      center.y - this.fontSizeBig,
      'center',
    );
    textStyle.fontSize = this.fontSizeSmall;
    const textRun = v.getTextField(
      h2,
      this.textStyle,
      center.x,
      center.y + this.fontSizeBig,
      'center',
    );
    const textWait = v.getTextField(
      h3,
      this.textStyle,
      center.x,
      center.y + this.fontSizeBig,
      'center',
    );
    let textBottom = textRun;
    this.startButton = v.getButton(
      'Начать',
      colors.border,
      this.textStyle,
      center.x,
      center.y + this.fontSizeBig * 3,
      this.fontSizeSmall * 0.5,
    );

    this.startButton.on('pointerdown', () => {
      this.emit('startGame', {
        res: true,
      });
    });

    this.backButton = v.getButton(
      'Выйти',
      colors.border,
      this.textStyle,
      center.x,
      center.y + this.fontSizeBig * 5,
      this.fontSizeSmall * 0.5,
    );

    this.backButton.on('pointerdown', () => {
      this.emit('exitGame', {
        res: true,
      });
    });

    if (!this.model.checkData()) {
      const daysArr = this.model.player.days;
      this.timerLessons = new Timer(Date.parse(daysArr[daysArr.length - 1]));

      this.timerLessons.setClock();
      const time = this.timerLessons.getTimeString();

      this.timerField = v.getTextField(
        time,
        textStyle,
        center.x,
        center.y + this.fontSizeBig * 2,
        'center',
      );
      this.ticker.add(this.timerToButton);
      this.changeField = this.timerField;
      textBottom = textWait;
    } else {
      this.changeField = this.startButton;
      textBottom = textRun;
    }
    this.stage.addChild(
      this.background,
      this.border,
      textTop,
      textBottom,
      this.changeField,
      this.backButton,
      this.fullscreenBtn,
    );
  }

  lessonScreen(lesson, task, gameData) {
    this.ticker.remove(this.timerToButton);
    this.stage.removeChildren(0, this.stage.children.length);

    this.background = v.getRect(
      0,
      0,
      colors.backgroundColor,
      0,
      this.viewPort.width,
      this.viewPort.height,
    );

    const h1 = `Урок ${lesson}`;
    const h2 = `Задание ${task} ${gameData.title}`;
    const fontSizeBig = this.viewPort.width / 30;
    const fontSizeSmall = this.viewPort.width / 40;
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    };

    const textStyle = {
      fill: colors.textColor,
      fontSize: fontSizeBig,
      align: 'center',
    };
    const textTop = v.getTextField(
      h1,
      textStyle,
      center.x,
      center.y - this.fontSizeBig,
      'center',
    );
    textStyle.fontSize = fontSizeSmall;
    const textBottom = v.getTextField(
      h2,
      textStyle,
      center.x,
      center.y + this.fontSizeBig,
      'center',
    );

    this.stage.addChild(this.background, this.border, textTop, textBottom);
  }

  goodScreen() {
    this.stage.removeChildren(0, this.stage.children.length);
    // this.ticker.add((delta) => this.gameLoop(delta));
    const h1 = 'Молодец';
    let h2 = 'Замечательно';
    const wrong = this.model.game.model.stat.fail;
    if (wrong > 0 && wrong < 5) {
      h2 = 'Хорошо';
    } else if (wrong >= 5) {
      h2 = 'В следующий раз получится лучше';
    }
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    };

    const textStyle = {
      fill: colors.textColor,
      fontSize: 28,
      align: 'center',
    };
    const textTop = v.getTextField(
      h1,
      textStyle,
      center.x,
      center.y - this.fontSizeBig,
      'center',
    );
    textStyle.fontSize = 24;
    const textBottom = v.getTextField(
      h2,
      textStyle,
      center.x,
      center.y + this.fontSizeBig,
      'center',
    );
    this.stage.addChild(this.border, textTop, textBottom);
  }

  endLesson() {
    this.ticker.remove(this.model.game.render);
    this.stage.removeChildren(0, this.stage.children.length);
    // this.ticker.add((delta) => this.gameLoop(delta));
    const h1 = 'Урок окончен';
    const h2 = 'Возвращайся завтра';
    const center = {
      x: this.viewPort.width / 2,
      y: this.viewPort.height / 2,
    };
    const textStyle = {
      fill: colors.textColor,
      fontSize: 28,
      align: 'center',
    };
    const textTop = v.getTextField(
      h1,
      textStyle,
      center.x,
      center.y - this.fontSizeBig,
      'center',
    );
    textStyle.fontSize = 24;
    const textBottom = v.getTextField(
      h2,
      textStyle,
      center.x,
      center.y + this.fontSizeBig,
      'center',
    );

    if (!this.timerLessons) {
      this.timerLessons = new Timer(this.model.endTime);
    }
    this.timerLessons.setClock();
    const time = this.timerLessons.getTimeString();

    this.timerField = v.getTextField(
      time,
      textStyle,
      center.x,
      center.y + this.fontSizeBig * 2,
      'center',
    );

    this.ticker.add(this.timerToButton);

    this.stage.addChild(
      this.border,
      textTop,
      textBottom,
      this.timerField,
      this.backButton,
    );
  }

  createGame(task, taskNumber) {
    this.stage.removeChildren(0, this.stage.children.length);
    this.model.game = new Game(
      this.renderer,
      this.viewPort,
      this.model,
      this.stage,
      task,
      taskNumber,
    );
  }

  render() {
    this.renderer.render(this.stage);
  }

  gameLoop() {
    this.render();
  }

  resize() {
    let w;
    let h;
    if (window.innerWidth / window.innerHeight >= this.ratio) {
      w = window.innerHeight * this.ratio;
      h = window.innerHeight;
    } else {
      w = window.innerWidth;
      h = window.innerWidth / this.ratio;
    }
    this.renderer.view.style.width = `${w}px`;
    this.renderer.view.style.height = `${h}px`;
  }

  timerToButton() {
    this.timerField.text = this.timerLessons.getTimeString();
    if (this.model.checkData()) {
      this.stage.removeChild(this.timerField);
      this.stage.addChild(this.startButton);
    }
  }

  onDragEnd() {
    this.fullscreen(!this.inFullscreen);
  }

  fullscreen(value) {
    if (this.screenElement == null) {
      this.screenElement = this.wrapper;
      this.screenElement.addEventListener(
        'webkitfullscreenchange',
        this.onFullscreenChange,
      );
      this.screenElement.addEventListener(
        'mozfullscreenchange',
        this.onFullscreenChange,
      );
      this.screenElement.addEventListener(
        'fullscreenchange',
        this.onFullscreenChange,
      );
    }

    if (value) {
      if (this.screenElement.webkitRequestFullScreen) {
        this.screenElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT,
        );
      } else {
        this.screenElement.mozRequestFullScreen();
      }
    } else {
      document.cancelFullScreen();
    }
  }

  onFullscreenChange() {
    this.inFullscreen = !this.inFullscreen;
    this.wrapper.className = this.inFullscreen ? 'fullscreen' : '';
  }
}
