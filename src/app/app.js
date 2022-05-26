// import EventEmitter from './utils/eventEmmiter';
import {} from "howler";
import EventEmitter from "./utils/eventEmmiter";
import Model from "./model";
import View from "./view";

import func from "./utils/utils";

const { playSound } = func;

const backSound = require("../assets/audio/background.mp3");
const goodSound = require("../assets/audio/good.mp3");
const badSound = require("../assets/audio/bad.mp3");

// const serverURL = 'http://localhost:3001';
export default class App extends EventEmitter {
  constructor(container, userData, lessonData) {
    super();
    this.container = container;

    this.model = new Model(userData, lessonData);
    this.view = new View(this.model, container);

    this.state = "play"; // pause, end

    this.games = 7;

    this.complite = this.complite.bind(this);
    this.next = this.next.bind(this);
    this.exit = this.exit.bind(this);
    this.aheadOfTime = this.aheadOfTime.bind(this);
  }

  /**
   * Метод для инициализации урока
   */
  init() {
    this.container.appendChild(this.view.renderer.view);
    this.view.resize();
    window.onresize = () => {
      this.view.resize();
    };

    this.backSound = playSound(backSound, true, 0.1, console.log);
    this.backSound.play();
    this.view.startScreen();
    this.view.render();

    this.view.dispatch("startGame", this.next);
    this.view.dispatch("exitGame", this.exit);
  }

  /**
   * Метод для выхода из приложения
   */
  exit() {
    this.backSound.stop();
  }

  /**
   * Метод для запуска следующего задания
   */
  next() {
    // const id = Math.floor(Math.random() * this.games);
    const currentTask = this.model.plan.lesson[this.model.plan.current];
    this.view.createGame(currentTask, this.model.currentTask);
    this.view.lessonScreen(
      this.model.player.lessons + 1,
      this.model.currentTask,
      this.model.game.model
    );
    // todo
    this.model.game.playfield.dispatch("compliteGame", this.complite);
    this.model.game.playfield.dispatch("aheadOfTime", this.aheadOfTime);
    playSound(this.model.game.rules, false, 0.8, this.model.game.run).play();
  }

  /**
   * Метод для окончания задания и/или урока
   */
  complite(obj) {
    this.model.plan.current += 1;
    this.model.setStatistic();
    if (this.model.currentTask < this.model.taskInLesson) {
      if (obj.res) {
        this.view.goodScreen();
        playSound(goodSound, false, 0.8, this.next).play();
      } else {
        this.view.badScreen();
        playSound(badSound, false, 0.8, this.next).play();
      }
      this.model.currentTask += 1;
    } else {
      this.model.currentTask = 1;
      this.model.lesson += 1;
      const statistic = this.model.getStatistic();
      this.view.endLesson();
      const newPlayer = this.model.getPlayer();
      this.emit("updateUser", newPlayer);
      this.emit("addLesson", statistic);
    }
  }

  /**
   * Метод для окончания урока досрочно
   */
  aheadOfTime() {
    this.model.setStatistic();
    this.model.currentTask = 1;
    const statistic = this.model.getStatistic();
    this.view.endLesson();
    this.emit("addLesson", statistic);
  }
}
