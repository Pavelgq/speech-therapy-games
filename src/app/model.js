import func from './utils/utils';
import lessonsMap from './games/data/lessonsMap';

const {
  checkYesterday,
} = func;

export default class Model {
  constructor(userInfo) {
    this.player = userInfo;
    this.lesson = this.player.lessons;
    this.bonus = {};
    this.plan = this.getLesson()
    this.currentTask = 1;
    this.taskInLesson = this.plan.lesson.length - 1;
    // this.typeInGame = {
    //   wordOfSyllables: 0,
    //   choiceOfWord: 0,
    //   choiceOfSyllable: 0,
    //   choiceOfNumber: 0,
    //   superfluousWord: 0,
    //   thatHasChanged: 0,
    //   choiceOfImage: 0,
    //   choicePair: 0,
    // }
    this.game = {};
    this.lessonStat = [];

    this.startTime = new Date().getTime();
  }

  getLesson() {
    const obj = {
      lesson: lessonsMap[this.lesson],
      current: 0,
    }
    return obj
  }

  getPlayer() {
    let lessonResult = 0;
    if (this.lessonStat.length > 0) {
      lessonResult = this.calcResults();
    }
    const playerDays = (this.player.days || []).slice();
    let {
      kMoney,
    } = this.player;
    if (playerDays.length > 0 && checkYesterday(playerDays[playerDays.length - 1], new Date())) {
      kMoney += 0.1;
    } else {
      kMoney = 1;
    }
    // TODO: Делать эти расчеты на сервере лучше бы
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.player._id,
      lessons: this.lesson,
      level: Math.floor(this.game.model.exp / 10000),
      money: this.game.model.money,
      exp: this.game.model.exp,
      kMoney,
      kExp: this.player.kExp + lessonResult,
    }
  }

  calcResults() {
    let result = 0;
    this.lessonStat.forEach((element) => {
      result += Math.floor(((element.correct / (element.fail || 1)) / element.tasks) * 10) / 10;
    })

    return result / this.lessonStat.length;
  }

  setStatistic() {
    this.game.model.getStatistic();
    this.lessonStat.push(this.game.model.stat);
  }

  getStatistic() {
    return {
      tasks: this.lessonStat,
      duration: this.getDuration(),
      date: new Date(),
      // eslint-disable-next-line no-underscore-dangle
      user: this.player._id,
    }
  }

  getDuration() {
    this.endTime = new Date().getTime();

    return (this.endTime - this.startTime);
  }

  checkData() {
    const lastTime = this.player.days[this.player.days.length - 1];

    if (new Date() - Date.parse(lastTime) > 24 * 60 * 60 * 1000) {
      return true;
    }
    return false;
  }
}