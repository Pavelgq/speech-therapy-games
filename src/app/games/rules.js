import func from "../utils/utils";

const { shuffle } = func;
export default class Rules {
  constructor(appModel) {
    this.title = "Название игры";
    this.player = appModel.player;
    this.reaction = [];
    this.stat = {
      tasks: 0,
      correct: 0,
      fail: 0,
      reaction: 0,
      game: "",
      type: 0,
    };
    this.addReaction = this.addReaction.bind(this);
    this.setReaction = this.setReaction.bind(this);

    this.exp = this.player.exp;
    this.money = this.player.money;
  }

  /**
   * Добавляет слова пустышки в task
   * @param {Object} targetTasks
   * @param {Array} otherWords
   */
  addOtherParts(targetTasks, otherWords = []) {
    let res = [];
    const currentData = otherWords.slice();
    const length = this.targetTasksParam.width * this.targetTasksParam.height;
    while (length > targetTasks.length) {
      const ind = Math.floor(Math.random() * currentData.length);
      const metka = currentData[ind].used;
      let index = 0;
      if (!metka) {
        while (
          targetTasks.length < length &&
          index < currentData[ind].syllable.length
        ) {
          if (!targetTasks.includes(currentData[ind].syllable[index])) {
            targetTasks.push(currentData[ind].syllable[index]);
          }
          index += 1;
        }
        currentData.splice(ind, 1);
      }
    }
    [res] = shuffle([targetTasks]);
    return res;
  }

  setReaction() {
    this.startCount = new Date().getTime();
  }

  addReaction() {
    const time = new Date().getTime();

    this.reaction.push(time - this.startCount);
    console.log(this.reaction);
    this.startCount = 0;
  }

  getStatistic() {
    let sum = 0;
    if (this.reaction.length) {
      sum = this.reaction.reduce((prev, cur) => prev + cur);
      this.stat.reaction = Math.floor(sum / this.reaction.length);
    } else {
      this.stat.reaction = 0;
    }
    this.stat.tasks = this.targetTasksParam.parts;
    this.stat.game = this.title;
    console.log(this.stat);
  }

  getBonus() {
    this.exp += 10 * this.player.kExp;
    this.money += 100 * this.player.kMoney;
  }
}
