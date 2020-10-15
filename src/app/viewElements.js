import * as PIXI from 'pixi.js';

/**
 * Формирует текстовое поле
 * @param {String} text
 * @param {PIXI.TextStyle} style
 * @param {Number} x
 * @param {Number} y
 * @param {String} align
 * @return {PIXI.Text}
 */
const getTextField = (text, style, x, y, align) => {
  const textStyle = new PIXI.TextStyle({
    fontFamily: style.fontFamily || 'Arial',
    fontSize: style.fontSize || 10,
    fill: style.colot || '0x2a9c9d',
    align: style.align || 'center',
  })

  const score = new PIXI.Text(text, textStyle)
  const textMetrics = PIXI.TextMetrics.measureText(text, textStyle)

  switch (align) {
    case 'center':
      score.x = x - textMetrics.width / 2
      score.y = y - textMetrics.height / 2
      break;
    case 'left':
      score.x = x
      score.y = y
      break;
    default:
      break;
  }

  return score;
}

/**
 * Строит прямоугольник со скругленными краями
 * @param {Number} x
 * @param {Number} y
 * @param {String} color
 * @param {Number} rad
 * @param {Number} width
 * @param {Number} height
 * @return {PIXI.Graphics}
 */
const getRect = (x, y, color, rad, width, height) => {
  const rect = new PIXI.Graphics()
  rect.beginFill(color, 0.5)
  rect.drawRoundedRect(x, y, width, height, rad)
  return rect;
}

/**
 * Строит прогрессбар по заданным параметрам
 * @param {Number} percent
 * @param {Object} style {inColor, outColor}
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {Number} border
 * @return {PIXI.Container}
 */
const getProgressBar = (percent, style, x, y, width, height, border) => {
  const result = new PIXI.Container();
  const outSide = getRect(x, y,
    style.inColor,
    height, width, height);

  const inSide = getRect(x + border, y + border,
    style.outColor,
    height - border * 2,
    (width - border * 2) * percent,
    height - border * 2);

  result.addChild(outSide, inSide);
  return result;
}

/**
 *
 * @param {String} text
 * @param {String} backColor
 * @param {PIXI.TextStyle} textStyle
 * @param {Number} x
 * @param {Number} y
 * @param {Number} border
 * @return {PIXI.Container}
 */
const getButton = (text, backColor, textStyle, x, y, border) => {
  const result = new PIXI.Container();

  const textField = getTextField(text, textStyle, x, y, 'left');
  const textMetrics = PIXI.TextMetrics.measureText(text, textStyle);
  const rect = getRect(x - border / 2, y - border / 2, backColor, textMetrics.height + border,
    textMetrics.width + border, textMetrics.height + border);
  result.addChild(rect, textField);
  return result;
}

/**
 *
 * @param {*} color
 * @param {*} width
 * @param {*} height
 * @param {*} lineSize
 */
const getBorder = (color, width, height, lineSize) => {
  const b = new PIXI.Graphics();
  b.lineStyle(lineSize, color, 1);
  b.drawRect(lineSize / 2, lineSize / 2, width - lineSize, height - lineSize);
  return b;
}

/**
 *
 * @param {String} backColor
 * @param {String} borderColor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} size
 * @param {Number} rad
 */
const getCell = (backColor, borderColor, x, y, size, rad) => {
  const rect = new PIXI.Graphics()
  rect.lineStyle(2, borderColor, 1)
  rect.position.x = x
  rect.position.y = y
  rect.beginFill(backColor, 0.5)
  rect.drawRoundedRect(0, 0, size, size, rad)
  rect.endFill()

  return rect;
}

const getPicture = (url, size, x, y) => {
  const texture = PIXI.Texture.from(url);
  const picture = new PIXI.Sprite(texture);
  picture.width = size;
  picture.height = size;
  picture.x = x;
  picture.y = y;
  // const container = new PIXI.Container();
  // container.addChild(picture)
  return picture
}

export default {
  getTextField,
  getRect,
  getProgressBar,
  getButton,
  getBorder,
  getCell,
  getPicture,
}