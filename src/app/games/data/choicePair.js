import choiceOfWord from './choiceOfWord';

const choicePair = {
  name: 'choicePair',
  title: 'Пара картинок',
  types: [
    choiceOfWord.types[0],
    choiceOfWord.types[0], {
      words: [{
        word: 'собака',
        syllable: ['собака'],
        audio: require('../../../assets/audio/wordOfSyllables/dog.mp3'),
        used: false,
      },
      {
        word: 'морковь',
        syllable: ['морковь'],
        audio: require('../../../assets/audio/wordOfSyllables/carrot.mp3'),
        used: false,
      },
      {
        word: 'котэ',
        syllable: ['котэ'],
        audio: require('../../../assets/audio/wordOfSyllables/cat.mp3'),
        used: false,
      },
      {
        word: 'молоко',
        syllable: ['молоко'],
        audio: require('../../../assets/audio/wordOfSyllables/milk.mp3'),
        used: false,
      }, {
        word: 'сорока',
        syllable: ['сорока'],
        audio: require('../../../assets/audio/wordOfSyllables/magpie.mp3'),
        used: false,
      },
      {
        word: 'бумага',
        syllable: ['бумага'],
        audio: require('../../../assets/audio/wordOfSyllables/paper.mp3'),
        used: false,
      }, {
        word: 'ручка',
        syllable: ['ручка'],
        audio: require('../../../assets/audio/wordOfSyllables/pen.mp3'),
        used: false,
      }, {
        word: 'город',
        syllable: ['город'],
        audio: require('../../../assets/audio/wordOfSyllables/town.mp3'),
        used: false,
      },
      ],
    },
  ],
  win: {
    part: 'one',
    refresh: true,
  },
  levels: [{
    parts: 1,
    width: 4,
    height: 3,
  },
  {
    parts: 1,
    width: 4,
    height: 3,
  },
  {
    parts: 5,
    width: 4,
    height: 3,
  },
  {
    parts: 5,
    width: 4,
    height: 3,
  },
  {
    parts: 5,
    width: 4,
    height: 4,
  },
  ],
  rulesSound: require('../../../assets/audio/thatHasChanged/that-has-changed-rules.mp3'),
}

export default choicePair