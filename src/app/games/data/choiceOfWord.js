const choiceOfWord = {
  name: 'Найти слово',
  words: [{
    word: 'собака',
    syllable: ['собака'],
    audio: '../../../assets/audio/choiceOfWord/dog.mp3',
    used: false,
  },
  {
    word: 'морковь',
    syllable: ['морковь'],
    audio: '../../../assets/audio/choiceOfWord/carrot.mp3',
    used: false,
  },
  {
    word: 'котэ',
    syllable: ['котэ'],
    audio: '../../../assets/audio/choiceOfWord/cat.mp3',
    used: false,
  },
  ],
  data: ['пример', 'ветер', 'орел', 'собака', 'фант',
    'фум', 'кура', 'лошадь', 'мир', 'рог', 'лагерь', 'доля',
    'ярмо', 'акр', 'морковь', 'холоп', 'пол',
  ],

  rulesSound: '../../../assets/audio/choiceOfWord/choice-of-word-rules.mp3',
}

export default choiceOfWord;