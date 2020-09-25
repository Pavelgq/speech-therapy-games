import Rules from '../rules';

export default class ChainGame extends Rules {
  constructor(appModel, dataGame, taskNumber) {
    super();
    this.title = dataGame.title;
    this.player = appModel.player;
    this.rules = dataGame.rulesSound;
    this.conditionsWin = dataGame.win;
    this.targetTasksParam = dataGame.levels[this.player.level];
    this.lastAnswers = [];
    this.answer = {};
    this.player = appModel.player;
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
    const index = Math.floor(Math.random() * words.length);
    const { length } = words[index].syllable;
    if (targetTasks.length + length
         <= this.targetTasksParam.width * this.targetTasksParam.height) {
      targetTasks.push(...words[index].syllable);
      this.lastAnswers.push({
        word: words[index].word,
        syllable: words[index].syllable,
        audio: words[index].audio,
      });

      words[index].used = true;
    }
    [this.answer] = this.lastAnswers;
    console.log(this.answer, this.lastAnswers)
    return this.addOtherParts(targetTasks, this.dataGame.types[type].data);
  }

  refresh(type) {
    this.targetTasks = this.createTask(0)
  }

  checkAnswer(answer) {
    console.log(answer, this.result, this.lastAnswers)
    if (this.answer.syllable.indexOf(answer) !== -1) {
      this.result.push(answer);
    } else {
      return 'lose';
    }
    if (this.result.join('') === this.answer.word) {
      return 'well';
    }
    return 'continue';
  }

  checkTask() {
    if (this.currentPart === this.targetTasksParam.parts) {
      return true;
    }
    return false;
  }
}
