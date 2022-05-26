const choiceOfSyllable = {
  name: "choiceOfSyllable",
  title: "Найти слог",
  types: [
    {
      words: [
        {
          word: "ар",
          syllable: ["ар"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/ар.mp3"),
          used: false,
        },
        {
          word: "ер",
          syllable: ["ер"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/ер.mp3"),
          used: false,
        },
        {
          word: "ёр",
          syllable: ["ёр"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/ёр.mp3"),
          used: false,
        },
        {
          word: "ор",
          syllable: ["ор"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/ор.mp3"),
          used: false,
        },
        {
          word: "ур",
          syllable: ["ур"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/ур.mp3"),
          used: false,
        },
        {
          word: "ыр",
          syllable: ["ыр"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/ыр.mp3"),
          used: false,
        },
        {
          word: "эр",
          syllable: ["эр"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/эр.mp3"),
          used: false,
        },
        {
          word: "юр",
          syllable: ["юр"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/юр.mp3"),
          used: false,
        },
        {
          word: "яр",
          syllable: ["яр"],
          audio: require("../../../assets/audio/choiceOfSyllable/r/яр.mp3"),
          used: false,
        },
      ],
      data: [],
    },
  ],
  win: {
    part: "all",
    refresh: false,
  },
  levels: [
    {
      parts: 9,
      width: 3,
      height: 3,
    },
  ],

  rulesSound: require("../../../assets/audio/choiceOfSyllable/choice-of-syllable-rules.mp3"),
};

export default choiceOfSyllable;
