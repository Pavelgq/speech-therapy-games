const words = [{
  word: 'собака',
  syllable: ['со', 'ба', 'ка'],
  audio: require('../../assets/audio/game1/dog.mp3'),
  used: false,
},
{
  word: 'морковь',
  syllable: ['мор', 'ковь'],
  audio: require('../../assets/audio/game1/carrot.mp3'),
  used: false,
},
{
  word: 'котэ',
  syllable: ['ко', 'тэ'],
  audio: require('../../assets/audio/game1/cat.mp3'),
  used: false,
}];
const data = ['при', 'вет', 'ор', 'со', 'фа', 'фу', 'ку', 'ло', 'ми', 'ро', 'лаг', 'дол', 'яр', 'ак', 'мо', 'хо', 'по']

export default class Model {
  constructor(level) {
    this.level = level;
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
    const currentData = data.slice();
    const index = Math.floor(Math.random() * words.length);
    this.gameWord = words[index];
    const right = words[index].syllable.length;
    words[index].syllable.forEach((element) => {
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
    for (let i = 0; i < data.length; i++) {
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
    console.log(this);
    return this.gameWord.syllable.some((el) => {
      console.log(el, this.gameData[id]);
      if (el === this.gameData[id]) {
        this.answer.push(el);
        return true;
      }
    })
  }

  isComplite() {
    return this.gameWord.syllable.length === this.answer.length
    && this.gameWord.syllable.every((v, i) => v === this.answer[i]);
  }
}