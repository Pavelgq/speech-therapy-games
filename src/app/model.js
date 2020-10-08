import userInfo from '../tests/user-info';
import lessonInfo from '../tests/lesson-info';

export default class Model {
  constructor() {
    this.player = userInfo;
    this.stat = lessonInfo;

    this.taskInLesson = 4;
    this.typeInGame = {
      wordOfSyllables: 0,
      choiceOfWord: 0,
      choiceOfSyllable: 0,
      choiceOfNumber: 0,
      superfluousWord: 0,
      thatHasChanged: 0,
    }
    this.game = {};
  }
}
