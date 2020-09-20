import userInfo from '../tests/user-info';
import lessonInfo from '../tests/lesson-info';

export default class Model {
  constructor() {
    this.player = userInfo;
    this.stat = lessonInfo;

    this.typeInGame = [
      {
        game: 'wordOfSyllables',
        type: 0,
      },
      {
        game: 'choiceOfWord',
        type: 0,
      },
      {
        game: 'choiceOfSyllable',
        type: 0,
      },
      {
        game: 'choiceOfNumber',
        type: 0,
      },
    ]
  }
}