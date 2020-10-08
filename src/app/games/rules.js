export default class Rules {
  constructor() {
    this.title = 'Название игры';
    // this.rules = '';
    // this.conditionsWin = {};
    // this.targetTasks = [];
    // this.targetTasksParam = {
    //   tasks: 5,
    //   width: 3,
    //   height: 3,
    // };
    // this.answers = [];
    // this.player = {
    //   level: 1,
    // }

    // this.partOfTask = 0;
    // this.dataGame = dataGame;
    this.reaction = [];

    this.addReaction = this.addReaction.bind(this);
    this.setReaction = this.setReaction.bind(this);
  }

  addOtherParts(targetTasks, otherWords = []) {
    const res = []
    const currentData = otherWords.slice();
    const length = this.targetTasksParam.width * this.targetTasksParam.height;
    while (length > targetTasks.length) {
      const ind = Math.floor(Math.random() * currentData.length);
      const metka = targetTasks.includes(currentData[ind]);
      if (!metka) {
        targetTasks.push(currentData[ind]);
        currentData.splice(ind, 1);
      }
    }

    for (let j = 0; j < length; j++) {
      const n = Math.floor(Math.random() * targetTasks.length);
      res.push(targetTasks[n]);
      targetTasks.splice(n, 1);
    }

    return res;
  }

  setReaction() {
    this.startCount = new Date().getTime();
  }

  addReaction() {
    const time = new Date().getTime();

    this.reaction.push(time - this.startCount);
    console.log(this.reaction)
  }
}
