const choiceOfSyllable = {
  name: 'Найти слог',
  words: [{
    word: 'ло',
    syllable: ['ло'],
    audio: require('../../../assets/audio/choiceOfSyllable/lo.mp3'),
    used: false,
  },
  {
    word: 'ра',
    syllable: ['ра'],
    audio: require('../../../assets/audio/choiceOfSyllable/ra.mp3'),
    used: false,
  },
  {
    word: 'ор',
    syllable: ['ор'],
    audio: require('../../../assets/audio/choiceOfSyllable/or.mp3'),
    used: false,
  }],
  data: ['при', 'вет', 'ор', 'со', 'фа', 'фу', 'ку', 'ло', 'ми',
    'ро', 'лаг', 'дол', 'яр', 'ак', 'мо', 'хо', 'по',
  ],

  rulesSound: require('../../../assets/audio/choiceOfSyllable/choice-of-syllable-rules.mp3'),
}

export default choiceOfSyllable;