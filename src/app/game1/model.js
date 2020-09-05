const words = [{
  word: 'собака',
  syllable: ['со', 'ба', 'ка'],
  audio: './audio/game1/dog.mp3',
  used: false,
}];
const data = ['при', 'вет', 'ор', 'со', 'фа', 'фу', 'ку', 'ло', 'ми', 'ро', 'лаг', 'дол', 'яр', 'ак', 'мо', 'хо', 'по']

export default class Model {
  constructor(level, viewPort) {
    this.level = level;
    this.cubes = this.complexity();
    this.width = viewPort.width;
    this.height = viewPort.height;
  }

  generate() {
    const result = [];
    const mas = [];
    const currentData = data.slice();
    const index = 0;
    const right = words[index].syllable.length;
    for (let i = 0; i < this.cubes.width * this.cubes.height - right; i++) {
      const ind = Math.floor(Math.random() * currentData.length);
      mas.push(currentData[ind]);
      currentData.splice(ind, 1);
    }
    words[index].syllable.forEach((element) => {
      mas.push(element);
    });
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
}