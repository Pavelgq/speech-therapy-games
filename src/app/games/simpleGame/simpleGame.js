import Rules from '../rules';

export default class SimpleGame extends Rules {
  constructor(appModel, dataGame, taskNumber) {
    super(appModel);
    this.title = dataGame.title;
    this.rules = dataGame.rulesSound;
    this.conditionsWin = dataGame.win;
    this.targetTasks = [];
    this.targetTasksParam = dataGame.levels[this.player.level];
    this.lastAnswers = [];
    this.answer = {};
    this.totalTasks = appModel.taskInLesson;
    this.currentPart = 1;
    this.currentTask = taskNumber;
    this.dataGame = dataGame;
  }

  createTask(type) {
    const { words } = this.dataGame.types[type];
    const targetTasks = [];
    for (let k = 0; k < this.targetTasksParam.parts; k++) {
      const index = Math.floor(Math.random() * words.length);
      const { length } = words[index].syllable;
      if (targetTasks.length + length
         <= this.targetTasksParam.width * this.targetTasksParam.height) {
        targetTasks.push(...words[index].syllable);
        this.lastAnswers.push({
          word: words[index].word,
          audio: words[index].audio,
        });

        words[index].used = true;
      }
    }
    [this.answer] = this.lastAnswers;
    this.lastAnswers.splice(0, 1);
    return this.addOtherParts(targetTasks, this.dataGame.types[type].data);
  }

  refresh(type) {
    [this.answer] = this.lastAnswers;
    this.lastAnswers.splice(0, 1);
  }

  checkAnswer(answer) {
    if (answer === this.answer.word) {
      this.getBonus();
      return 'well'
    }
    return 'lose'
  }

  checkTask() {
    if (this.currentPart === this.targetTasksParam.parts) {
      return true;
    }
    return false;
  }
}