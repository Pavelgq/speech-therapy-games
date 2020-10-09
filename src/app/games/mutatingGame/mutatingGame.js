import Rules from '../rules';

export default class MutatingGame extends Rules {
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
    const {
      words,
    } = this.dataGame.types[type];
    const targetTasks = [];
    this.lastAnswers = [];
    this.result = [];
    const carts = this.targetTasksParam.width * this.targetTasksParam.height;
    for (let k = 0; k < carts; k++) {
      const index = Math.floor(Math.random() * words.length);
      const {
        length,
      } = words[index].syllable;
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
    }
    [this.answer] = this.lastAnswers;
    return targetTasks;
  }

  refresh(type) {
    this.targetTasks = this.createTask(0)
  }

  checkAnswer(answer) {
    console.log(answer, this.result, this.lastAnswers)
    if (this.lastAnswers.length <= 2) {
      const n = this.lastAnswers.findIndex((el) => el.word === answer);
      if (n !== -1) {
        this.result.push(answer);
        this.lastAnswers.splice(n, 1);
      } else {
        return 'lose';
      }
      if (this.lastAnswers.length === 0) {
        return 'well';
      }
      return 'continue';
    }
    
  }

  checkTask() {
    if (this.currentPart === this.targetTasksParam.parts) {
      return true;
    }
    return false;
  }

  swap() {
    const arr = this.targetTasks;
    const answers = this.lastAnswers;
    let first = 0;
    let second = 0;
    while (first === second) {
      first = Math.floor(Math.random() * arr.length);
      second = Math.floor(Math.random() * arr.length);
    }

    [arr[first], arr[second]] = [arr[second], arr[first]];

    const result = [];
    result.push(answers[first], answers[second]);
    this.lastAnswers = result;
    [this.answer] = this.lastAnswers;
    // this.lastAnswers.splice(0, 1);
    console.log(result, 'Это массив с правильными ответами')
  }
}