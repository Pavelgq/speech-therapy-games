import Rules from "../rules";

export default class ChainGame extends Rules {
  constructor(appModel, dataGame, taskNumber) {
    super(appModel);
    this.title = dataGame.title;
    this.rules = dataGame.rulesSound;
    this.conditionsWin = dataGame.win;
    this.targetTasksParam =
      dataGame.levels[appModel.plan.lesson[appModel.plan.current].level];
    this.lastAnswers = [];
    this.answer = {};
    this.totalTasks = appModel.taskInLesson;
    this.currentPart = 0;
    this.currentTask = taskNumber;
    this.dataGame = dataGame;
    this.result = [];
  }

  createTask(type) {
    this.result = [];
    const { words } = this.dataGame.types[type];
    const targetTasks = [];
    this.lastAnswers = [];
    let index = Math.floor(Math.random() * words.length);
    let steps = 0;
    while (words[index].used && steps <= words.length) {
      index = Math.floor(Math.random() * words.length);
      steps++;
    }
    const { length } = words[index].syllable;
    if (length <= this.targetTasksParam.width * this.targetTasksParam.height) {
      targetTasks.push(...words[index].syllable);
      this.lastAnswers.push({
        word: words[index].word,
        syllable: words[index].syllable,
        audio: words[index].audio,
      });
      words[index].used = true;
    }
    [this.answer] = this.lastAnswers;
    return this.addOtherParts(targetTasks, this.dataGame.types[type].words);
  }

  refresh(type) {
    this.targetTasks = this.createTask(type);
  }

  checkAnswer(answer) {
    const n = this.result.length;
    if (this.answer.syllable[n] === answer) {
      this.result.push(answer);
    } else {
      return "lose";
    }
    if (this.result.join("") === this.answer.word) {
      this.getBonus();
      return "well";
    }
    return "continue";
  }

  checkTask() {
    if (this.currentPart === this.targetTasksParam.parts) {
      return true;
    }
    return false;
  }
}
