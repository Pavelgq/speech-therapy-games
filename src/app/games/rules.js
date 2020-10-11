export default class Rules {
  constructor() {
    this.title = 'Название игры';
    
    this.reaction = [];
    this.stat = {
      tasks: 0,
      fall: 0,
      reaction: 0,
      game: '',
      type: 0,
    }

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

  getStatistic() {
    let sum = 0;
    if (this.reaction.length) {
      sum = this.reaction.reduce((prev, cur) => prev + cur)
      this.stat.reaction = Math.floor(sum / this.reaction.length);
    } else {
      this.stat.reaction = 0;
    }
    this.stat.tasks = this.targetTasksParam.parts;
    this.stat.game = this.title;
    console.log(this.stat)
  }
}
