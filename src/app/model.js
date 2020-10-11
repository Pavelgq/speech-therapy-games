

export default class Model {
  constructor(userInfo) {
    this.player = userInfo;
    this.lesson = this.player.lesson;

    this.taskInLesson = 4;
    this.typeInGame = {
      wordOfSyllables: 0,
      choiceOfWord: 0,
      choiceOfSyllable: 0,
      choiceOfNumber: 0,
      superfluousWord: 0,
      thatHasChanged: 0,
    }
    this.game = {};
    this.lessonStat = [];

    this.startTime = new Date().getTime();
  }

  getPlayer() {
    let days = this.player.days || [];
    days = days.slice()
    return {
      days: days.push(new Date()),
      lessons: this.lesson,
      level: '1',
      money: '0',
      exp: '0',
    }
  }

  setStatistic() {
    this.lessonStat.push(this.game.getStatistic())
  }

  getStatistic() {
    return {
      tasks: this.lessonStat,
      duration: this.getDuration(),
      date: new Date(),
    }
  }

  getDuration() {
    const endTime = new Date().getTime();

    return (endTime - this.startTime);
  }
}
