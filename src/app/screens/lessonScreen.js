import Screen from './screen';
import v from '../viewElements';

export default class LessonScreen extends Screen {
  constructor(width, height, style, lesson, task, gameData) {
    super(width, height, style);

    this.generateScreen(lesson, task, gameData);
  }

  generateScreen(lesson, task, gameData) {
    this.fontSizeBig = this.width / 30;
    this.fontSizeSmall = this.width / 40;
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    }
    this.textStyle = {
      fontSize: fontSizeBig,
      align: 'center',
    }
    this.data.lesson = lesson;
    const h1 = `Урок ${lesson}`;
    this.lessonNumber = v.getTextField(h1, textStyle, center.x, center.y - this.fontSizeBig, 'center');

    this.textStyle.fontSize = this.fontSizeSmall;

    this.data.task = task;
    this.data.title = gameData.title;
    const h2 = `Задание ${this.data.task} ${this.data.title}`;
    this.taskNumber = v.getTextField(h2, textStyle, center.x, center.y + this.fontSizeBig, 'center');

    return [this.border, this.lessonNumber, this.taskNumber];
  }

  changeTask(task, gameData) {
    this.data.task = task;
    this.data.title = gameData.title;
    const h2 = `Задание ${this.data.task} ${this.data.title}`;
    this.taskNumber = v.getTextField(h2, this.textStyle, this.center.x, this.center.y + this.fontSizeBig, 'center');

    return [this.border, this.lessonNumber, this.taskNumber]
  }
}