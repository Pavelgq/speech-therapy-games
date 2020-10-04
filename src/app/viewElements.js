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
  let textStyle = new PIXI.TextStyle({
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
    height - border / 2,
    (width - border / 2) * percent,
    height - border / 2);

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
 * @param {Number} width 
 * @param {Number} height 
 * @return {PIXI.Container}
 */
const getButton = (text, backColor, textStyle, x, y, width, height) => {
  const result = new PIXI.Container();
  const rect = getRect(x, y, backColor, height, width, height);
  const textField = getTextField(text, textStyle, 10, this.height - this.fontSizeBig * 2 - 10)
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

export default {
  getTextField,
  getRect,
  getProgressBar,
  getButton,
  getBorder,

}