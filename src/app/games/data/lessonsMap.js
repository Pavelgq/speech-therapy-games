/**
 * Урок 1
 * - Слоги
 * - Слова
 * - Пара картинок
 * - Картинки
 * - По слогам
 *
 * Урок 2
 * - Слоги
 * - Слова
 * - Мутации
 * - Картинки
 * - По слогам
 *
 * Урок 3
 * - Слоги
 * - Пара картинок
 * - Слова
 * - Картинки
 * - По слогам
 *
 * Урок 4
 * - Слоги
 * - Мутации
 * - Картинки
 * - По слогам
 *
 * Урок 5
 * - Слоги
 * - Пара картинок
 * - Слова
 * - Картинки
 * - По слогам
 *
 * Урок 6
 * - Слоги
 * - Слова
 * - Найди лишнее
 * - Картинки
 * - По слогам
 *
 * Урок 7
 * - Слоги
 * - Пара картинок
 * - Слова
 * - Картинки
 * - По слогам
 *
 * Урок 8
 * - Слоги
 * - Мутации
 * - Картинки
 * - По слогам
 */

const lessonsMap = [
  [
    {
      game: 'choiceOfSyllable',
      type: 0,
      level: 0,
    },
    {
      game: 'choiceOfWord',
      type: 0,
      level: 0,
    },
    {
      game: 'choiceOfWord',
      // game: 'choisePair',
      type: 1,
      level: 0,
    },
    {
      game: 'wordOfSyllables',
      type: 1,
      level: 0,
    },
    {
      game: 'wordOfSyllables',
      type: 1,
      level: 0,
    },
    {
      game: 'choicePair',
      type: 0,
      level: 0,
    },
  ],

]

const gamesData = [
  'wordOfSyllables',
  'choiceOfWord',
  'choiceOfSyllable',
  'choiceOfNumber',
  'superfluousWord',
  'thatHasChanged',
  'choiceOfImage',
];

export default lessonsMap;