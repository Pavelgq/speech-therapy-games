const superfluousWord = {
  name: "superfluousWord",
  title: "Лишнее слово",
  types: [
    {
      words: [
        {
          word: "собака",
          syllable: ["собака"],
          audio: require("../../../assets/audio/choiceOfWord/dog.mp3"),
          used: false,
        },
        {
          word: "морковь",
          syllable: ["морковь"],
          audio: require("../../../assets/audio/choiceOfWord/carrot.mp3"),
          used: false,
        },
        {
          word: "котэ",
          syllable: ["котэ"],
          audio: require("../../../assets/audio/choiceOfWord/cat.mp3"),
          used: false,
        },
        {
          word: "борода",
          syllable: ["борода"],
          audio: require("../../../assets/audio/choiceOfWord/beard.mp3"),
          used: false,
        },
      ],
      data: [
        "пример",
        "ветер",
        "орел",
        "собака",
        "фант",
        "фум",
        "кура",
        "лошадь",
        "мир",
        "рог",
        "лагерь",
        "доля",
        "ярмо",
        "акр",
        "морковь",
        "холоп",
        "пол",
      ],
    },
  ],
  win: {
    part: "all",
    refresh: false,
    mute: true,
  },
  levels: [
    {
      parts: 5,
      width: 4,
      height: 1,
    },
    {
      parts: 7,
      width: 4,
      height: 1,
    },
    {
      parts: 5,
      width: 5,
      height: 1,
    },
    {
      parts: 5,
      width: 5,
      height: 1,
    },
    {
      parts: 5,
      width: 3,
      height: 2,
    },
  ],

  rulesSound: require("../../../assets/audio/superfluousWord/superfluous-word-rules.mp3"),
};

export default superfluousWord;
