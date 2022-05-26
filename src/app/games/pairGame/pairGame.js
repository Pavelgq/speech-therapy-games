import Rules from "../rules";
import func from "../../utils/utils";

const { shuffle } = func;

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
    this.countPair = 0;
  }

  createTask(type) {
    let { words } = this.dataGame.types[type];
    [words] = shuffle([words]);
    let targetTasks = [];
    this.lastAnswers = [];
    this.result = [];
    this.closeCell = [];
    const cards = this.targetTasksParam.width * this.targetTasksParam.height;
    this.countPair = cards;
    for (let k = 0; k < cards; k++) {
      this.closeCell.push({
        id: k,
        close: false,
        ready: false,
      });
      const index = k;
      if (
        targetTasks.length <
        this.targetTasksParam.width * this.targetTasksParam.height
      ) {
        targetTasks.push(...words[index].syllable, ...words[index].syllable);
        this.lastAnswers.push({
          word: words[index].word,
          syllable: words[index].syllable,
          audio: words[index].audio,
        });

        words[index].used = true;
      }
    }
    [targetTasks] = shuffle([targetTasks]);
    return targetTasks;
  }

  /**
   * Обновляет контент task'а
   * @param {Number} type
   */
  refresh(type) {
    this.targetTasks = this.createTask(0);
  }

  /**
   * Проверяет ответ пользователя
   * @param {Object} answer
   */
  checkAnswer(answer, id) {
    if (this.result.length === 0) {
      this.result.push({
        answer,
        id,
      });
      // this.checkAnswer[id] = false;
    } else {
      if (this.result[0].answer === answer && this.result[0].id !== id) {
        this.result.push({
          answer,
          id,
        });
        this.result.forEach((res) => {
          this.closeCell[res.id].ready = true;
        });
        this.countPair -= 2;
        this.result = [];
        if (this.countPair <= 1) {
          return "well";
        }
        return "continue";
      }
      this.result = [];
      return "lose";
    }
    return "continue";
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
