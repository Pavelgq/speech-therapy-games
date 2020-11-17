import Rules from '../rules';
import func from '../../utils/utils';

const {
  shuffle,
} = func;
export default class SimpleGame extends Rules {
  constructor(appModel, dataGame, taskNumber) {
    super(appModel);
    this.title = dataGame.title;
    this.rules = dataGame.rulesSound;
    this.conditionsWin = dataGame.win;
    this.targetTasks = [];
    this.targetTasksParam = dataGame.levels[appModel.plan.lesson[appModel.plan.current].level];
    this.targetImages = [];
    this.lastAnswers = [];
    this.answer = {};
    this.totalTasks = appModel.taskInLesson;
    this.currentPart = 1;
    this.currentTask = taskNumber;
    this.dataGame = dataGame;
  }

  createTask(type) {
    let { words } = this.dataGame.types[type];
    [words] = shuffle([words]);
    let targetTasks = [];
    let index = 0;
    const countCell = this.targetTasksParam.width * this.targetTasksParam.height;
    for (let k = 0; k < countCell; k++) {
      if (targetTasks.length < countCell) {
        targetTasks.push(words[index].syllable.join(''));
        if (words[index].syllable) {
          this.lastAnswers.push({
            word: words[index].syllable.join(''),
            audio: words[index].audio,
          });
        }
        this.targetImages.push(words[index].image);
        // words[index].used = true;
      }
      if (k < words.length) {
        index += 1;
      } else {
        words = this.dataGame.types[type].data
        index = 0;
      }
    }
    [this.answer] = this.lastAnswers;
    this.lastAnswers.splice(0, 1);
    [targetTasks] = shuffle([targetTasks]);
    return targetTasks
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