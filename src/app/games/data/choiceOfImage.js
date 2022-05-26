const choiceOfWord = {
  name: "choiceOfImage",
  title: "Выбери из картинок",
  types: [
    {
      words: [
        {
          word: "собака",
          syllable: ["собака"],
          audio: require("../../../assets/audio/choiceOfWord/dog.mp3"),
          used: false,
          image: require("../../../assets/images/барабан.jpg"),
        },
        {
          word: "морковь",
          syllable: ["морковь"],
          audio: require("../../../assets/audio/choiceOfWord/carrot.mp3"),
          used: false,
          image: require("../../../assets/images/блин.jpg"),
        },
        {
          word: "котэ",
          syllable: ["котэ"],
          audio: require("../../../assets/audio/choiceOfWord/cat.mp3"),
          used: false,
          image: require("../../../assets/images/маляр.jpg"),
        },
        {
          word: "борода",
          syllable: ["борода"],
          audio: require("../../../assets/audio/choiceOfWord/beard.mp3"),
          used: false,
          image: require("../../../assets/images/р.jpg"),
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
    image: true,
    part: "all",
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

  rulesSound: require("../../../assets/audio/choiceOfWord/choice-of-word-rules.mp3"),
};

export default choiceOfWord;
