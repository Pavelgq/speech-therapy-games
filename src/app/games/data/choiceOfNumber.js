const choiceOfNumber = {
  name: "choiceOfNumber",
  title: "Найти число",
  types: [
    {
      words: [
        {
          word: "12",
          syllable: ["12"],
          audio: require("../../../assets/audio/choiceOfNumber/12.mp3"),
          used: false,
        },
        {
          word: "21",
          syllable: ["21"],
          audio: require("../../../assets/audio/choiceOfNumber/21.mp3"),
          used: false,
        },
        {
          word: "5",
          syllable: ["5"],
          audio: require("../../../assets/audio/choiceOfNumber/5.mp3"),
          used: false,
        },
      ],
      data: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "11",
        "14",
        "6",
        "7",
        "8",
        "20",
        "21",
        "53",
        "15",
        "32",
        "30",
        "29",
      ],
    },
  ],
  win: {
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
  rulesSound: require("../../../assets/audio/choiceOfNumber/choice-of-number-rules.mp3"),
};

export default choiceOfNumber;
