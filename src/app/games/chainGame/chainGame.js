import Rules from '../rules';

export default class ChainGame extends Rules {
  constructor(appModel, dataGame) {
    super();
    this.title = dataGame.title;
    this.player = appModel.player;
    this.rules = dataGame.rulesSound;
    this.conditionsWin = dataGame.win;
    this.targetTasks = [];
    this.targetTasksParam = dataGame.levels[this.player.level];
    this.lastAnswers = [];
    this.answer = {};
    this.player = appModel.player;
    this.totalTasks = appModel.taskInLesson;
    this.partOfTask = 0;

    this.dataGame = dataGame;
  }

  createTask(type) {
    const { words } = this.dataGame.types[type];
    const result = [];
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
    result.push(this.addOtherParts(targetTasks, this.dataGame.types[type].data));
    return result;
  }

  refresh(type) {
    this.lastAnswers.splice(0, 1);
    [this.answer] = this.lastAnswers;
  }

  checkAnswer(answer) {
    if (answer === this.answer) {
      return true
    }
    return false
  }

  checkTask() {
    if (this.currentPart === this.targetTasksParam.parts) {
      return true;
    }
    return false;
  }
}
