const wordOfSyllables = {
  name: 'Слово из слогов',
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
  data: ['при', 'вет', 'ор', 'со', 'фа', 'фу', 'ку', 'ло', 'ми',
    'ро', 'лаг', 'дол', 'яр', 'ак', 'мо', 'хо', 'по',
  ],

  rulesSound: require('../../../assets/audio/wordOfSyllables/word-of-syllables-rules.mp3'),
}

export default wordOfSyllables;