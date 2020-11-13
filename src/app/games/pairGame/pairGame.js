import Rules from '../rules';

export default class PairGame extends Rules {
  constructor(appModel, dataGame, taskNumber) {
    super(appModel);
    this.title = dataGame.title;
    this.rules = dataGame.rulesSound;
    this.conditionsWin = dataGame.win;
    this.targetTasksParam = dataGame.levels[appModel.player.level - 1];
    this.lastAnswers = [];
    this.answer = {};
    this.totalTasks = appModel.taskInLesson;
    this.currentPart = 0;
    this.currentTask = taskNumber;
    this.dataGame = dataGame;

    this.result = [];

    this.closeCell = [];
  }

  createTask(type) {
    const {
      words,
    } = this.dataGame.types[type];
    const targetTasks = [];
    this.lastAnswers = [];
    this.result = [];
    const cards = this.targetTasksParam.width * this.targetTasksParam.height;
    for (let k = 0; k < cards; k++) {
      this.closeCell.push(false);
      const index = Math.floor(Math.random() * words.length);
      if (targetTasks.length <= this.targetTasksParam.width * this.targetTasksParam.height) {
        targetTasks.push(...words[index].syllable, ...words[index].syllable);
        this.lastAnswers.push({
          word: words[index].word,
          syllable: words[index].syllable,
          audio: words[index].audio,
        });

        words[index].used = true;
      }
    }
    return targetTasks;
  }

  /**
   * Обновляет контент task'а
   * @param {Number} type
   */
  refresh(type) {
    this.targetTasks = this.createTask(0)
  }

  /**
   * Проверяет ответ пользователя
   * @param {Object} answer
   */
  checkAnswer(answer) {
    if (this.result.length === 0) {
      this.result.push(answer);
    } else {
      if (this.result[0] === answer) {
        this.result = [];
        return 'well';
      }
      this.result = [];
      return 'lose';
    }
    return 'continue';
  }

  checkTask() {
    if (this.currentPart === this.targetTasksParam.parts) {
      this.getBonus();
      return true;
    }
    return false;
  }

  /**
   * Расчет коэффициента на который умножается опыт
   * @param {Number} kExp
   */
  getExp(kExp) {
    return kExp * (this.totalTasks / (this.stat.fail + 1));
  }
}