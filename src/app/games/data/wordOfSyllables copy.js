const wordOfSyllables = {
  name: 'Слово из слогов',
  types: [
    {
      words: [{
        word: 'собака',
        syllable: ['со', 'ба', 'ка'],
        audio: '../../../assets/audio/wordOfSyllables/dog.mp3',
        used: false,
      },
      {
        word: 'морковь',
        syllable: ['мор', 'ковь'],
        audio: '../../../assets/audio/wordOfSyllables/carrot.mp3',
        used: false,
      },
      {
        word: 'котэ',
        syllable: ['ко', 'тэ'],
        audio: '../../../assets/audio/wordOfSyllables/cat.mp3',
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
      tasks: 5,
      width: 3,
      height: 3,
    },
    {
      tasks: 7,
      width: 3,
      height: 3,
    },
    {
      tasks: 5,
      width: 4,
      height: 3,
    },
    {
      tasks: 5,
      width: 3,
      height: 3,
    },
    {
      tasks: 5,
      width: 3,
      height: 3,
    },
  ],
  data: [
    'при',
    'вет',
    'ор',
    'со',
    'фа',
    'фу',
    'ку',
    'ло',
    'ми',
    'ро',
    'лаг',
    'дол',
    'яр',
    'ак',
    'мо',
    'хо',
    'по',
  ],

  rulesSound: '../../../assets/audio/wordOfSyllables/word-of-syllables-rules.mp3',
}

export default wordOfSyllables
