import userInfo from '../tests/user-info';
import lessonInfo from '../tests/lesson-info';

export default class Model {
  constructor() {
    this.player = userInfo;
    this.stat = lessonInfo;
    this.typeInGame = {
      wordOfSyllables: 0,
      choiceOfWord: 0,
      choiceOfSyllable: 0,
      choiceOfNumber: 0,
    }
  }
}