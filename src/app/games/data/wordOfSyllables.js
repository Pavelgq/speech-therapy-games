const wordOfSyllables = {
  name: 'wordOfSyllables',
  title: 'Слово из слогов',
  types: [
    {
      words: [{
        word: 'собака',
        syllable: ['со', 'ба', 'ка'],
        audio: require('../../../assets/audio/wordOfSyllables/dog.mp3'),
        used: false,
      },
      {
        word: 'морковь',
        syllable: ['мор', 'ковь'],
        audio: require('../../../assets/audio/wordOfSyllables/carrot.mp3'),
        used: false,
      },
      {
        word: 'котэ',
        syllable: ['ко', 'тэ'],
        audio: require('../../../assets/audio/wordOfSyllables/cat.mp3'),
        used: false,
      },
      ],
      data: [
        'си',
        'са',
        'бу',
        'ко',
        'фа',
        'фу',
        'ку',
        'ло',
        'ми',
        'ро',
        'об',
        'ак',
        'ос',
        'аб',
        'ок',
        'бо',
        'пе',
      ],
    },
  ],
  win: {
    part: 'one',
    refresh: true,
  },
  levels: [
    {
      parts: 5,
      width: 3,
      height: 3,
    },
    {
      parts: 7,
      width: 3,
      height: 3,
    },
    {
      parts: 5,
      width: 4,
      height: 3,
    },
    {
      parts: 5,
      width: 3,
      height: 3,
    },
    {
      parts: 5,
      width: 3,
      height: 3,
    },
  ],
  rulesSound: require('../../../assets/audio/wordOfSyllables/word-of-syllables-rules.mp3'),
}

export default wordOfSyllables
