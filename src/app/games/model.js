export default class Model {
  constructor(level, gameData) {
    this.level = level;

    this.words = gameData.words;
    this.data = gameData.data
    this.cubes = this.complexity();
    this.gameWord = {};
    this.gameData = this.generate();

    this.answer = [];
    console.log(this);
    this.isTrue = this.isTrue.bind(this);
  }

  generate() {
    const result = [];
    const mas = [];
    const currentData = this.data.slice();
    const index = Math.floor(Math.random() * this.words.length);
    this.gameWord = this.words[index];
    const right = this.words[index].syllable.length;
    this.words[index].syllable.forEach((element) => {
      mas.push(element);
    });
    let i = 0;
    while (i < this.cubes.width * this.cubes.height - right) {
      const ind = Math.floor(Math.random() * currentData.length);
      const metka = mas.includes(currentData[ind]);
      if (!metka) {
        mas.push(currentData[ind]);
        currentData.splice(ind, 1);
        i += 1;
      }
    }
    for (let j = 0; j < this.data.length; j++) {
      const n = Math.floor(Math.random() * mas.length);
      result.push(mas[n]);
      mas.splice(n, 1);
    }
    return result;
  }

  complexity() {
    switch (this.level) {
      case 1:
        return {
          width: 3, height: 3,
        };

      case 2:
        return {
          width: 4, height: 3,
        };

      case 3:
        return {
          width: 4, height: 4,
        };

      case 4:
        return {
          width: 5, height: 4,
        };

      default:
        return {
          width: 3, height: 3,
        };
    }
  }

  isTrue(id) {
    // eslint-disable-next-line array-callback-return
    const result = this.gameWord.syllable.some((el) => {
      if (el === this.gameData[id]) {
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