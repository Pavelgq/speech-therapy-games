const choiceOfSyllable = {
  name: 'choiceOfSyllable',
  title: 'Найти слог',
  types: [
    {
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
    },
  ],
  win: {
    part: 'all',
    refresh: false,
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

  rulesSound: require('../../../assets/audio/choiceOfSyllable/choice-of-syllable-rules.mp3'),
}

export default choiceOfSyllable
