export default class Model {
  constructor(appModel, gameData) {
    this.player = appModel.player
    this.title = gameData.title
    this.typeInGame = appModel.typeInGame;

    this.level = appModel.player.level;

    this.rules = gameData.rulesSound;
    this.words = gameData.types[this.typeInGame[gameData.name]].words;
    this.data = gameData.types[this.typeInGame[gameData.name]].data
    this.conditionsWin = gameData.win;
    this.matrixParam = gameData.levels[this.level];
    this.answers = [];
    this.gameWord = {};
    this.gameMatrix = this.generate();

    
    console.log(this);

    this.isTrue = this.isTrue.bind(this);
  }

  /**
   * Строит модель поля в виде массива карточек
   */
  generate() {
    const { tasks } = this.matrixParam;
    let result;
    switch (this.conditionsWin.part) {
      case 'one':
        result = this.oneAnswerGame(tasks)
        break;
      case 'all':
        result = this.manyAnswerGame(tasks)
        break;
      default:
        break;
    }

    return result
  }

  addOtherParts(matrix) {
    const res = []
    const currentData = this.data.slice();
    const length = this.matrixParam.width * this.matrixParam.height;
    let i = 0;
    while (length > matrix.length) {
      const ind = Math.floor(Math.random() * currentData.length);
      const metka = matrix.includes(currentData[ind]);
      if (!metka) {
        matrix.push(currentData[ind]);
        currentData.splice(ind, 1);
        i += 1;
      }
    }
    
    for (let j = 0; j < length; j++) {
      const n = Math.floor(Math.random() * matrix.length);
      res.push(matrix[n]);
      matrix.splice(n, 1);
    }

    return res;
  }

  oneAnswerGame(tasks) {
    const result = [];

    for (let k = 0; k < tasks; k++) {
      const mas = [];
      const index = Math.floor(Math.random() * this.words.length);
      this.gameWord = this.words[index];
      mas.push(...this.words[index].syllable);
      this.words[index].used = true;
      this.answers.push(this.words[index].word)
      result.push(this.addOtherParts(mas))
    }

    return result;
  }

  manyAnswerGame(tasks) {
    const result = [];
    const matrix = [];
    for (let k = 0; k < tasks; k++) {
      const index = Math.floor(Math.random() * this.words.length);
      this.gameWord = this.words[index];
      const right = this.words[index].syllable.length; 
      if (matrix.length + right <= this.matrixParam.width + this.matrixParam.height) {
        matrix.push(...this.words[index].syllable);
        this.answers.push(this.words[index].word);
        this.words[index].used = true;
      }
    }
    result.push(this.addOtherParts(matrix));
    return result
  }

  isTrue(answer, field = 0) {
    // eslint-disable-next-line array-callback-return
    const result = this.gameWord.syllable.some((el) => {
      if (el === this.gameMatrix[field][answer]) {
        this.answer.push(el);
        return true;
      }
      return false
    })
    return result
  }

  isComplite() {
    return this.gameWord.syllable.length === this.answer.length
    && this.gameWord.syllable.every((v, i) => v === this.answer[i]);
  }
}