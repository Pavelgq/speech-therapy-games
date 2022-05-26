import * as PIXI from "pixi.js";
import Playfield from "../playfield";
import v from "../../viewElements";
import func from "../../utils/utils";

const { playSound } = func;

export default class PairPlayfield extends Playfield {
  constructor(gameModel, viewPort, stage) {
    super(gameModel, viewPort, stage);
    this.openCell = this.openCell.bind(this);
    this.closeCells = this.closeCells.bind(this);
    this.delay = this.delay.bind(this);
  }

  create() {
    this.printField();
    this.printCell();
    this.presentation();
    this.dispatch("selectCell", this.openCell);
    this.dispatch("fallSelect", this.delay);
  }

  refresh() {
    this.refreshField();
    this.refreshCell();
    this.presentation();
  }

  presentation() {
    this.model.setReaction();
    this.closeCells();
  }

  /**
   * Задержка для просмотра содержимого карточки(ячейки)
   */
  delay() {
    this.offCells();
    setTimeout(() => {
      this.closeCells();
    }, 1000);
  }

  /**
   * Открывает выбранную ячейку
   */
  openCell(event) {
    const { id } = event;
    if (this.model.closeCell[id].close) {
      const width = (this.width * 2) / 3;
      const spaceFree = Math.min(width, this.height);
      const maxSideCubes = Math.max(
        this.model.targetTasksParam.width,
        this.model.targetTasksParam.height
      );
      const size = Math.floor(
        (spaceFree - (maxSideCubes + 1) * 10) / maxSideCubes
      );
      const index = this.model.closeCell.findIndex((el) => el.id === id);
      if (index >= 0) {
        this.model.closeCell[id].close = false;
        const { x } = this.gameFields[id].children[0];
        const { y } = this.gameFields[id].children[0];
        const { targetTasks } = this.model;
        const text = targetTasks[id];
        const textField = v.getTextField(
          text,
          this.textStyle,
          x + size / 2,
          y + size / 2,
          "center"
        );
        this.gameFields[id].addChild(textField);
        this.gameFields[id].children[0].off("pointerdown");
      }
    }
  }

  /**
   * Отключает события клика на всех ячейках
   */
  offCells() {
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        const id = i * taskHeight + j;
        this.gameFields[id].children[0].off("pointerdown");
      }
    }
  }

  /**
   * Закрывает все ячейки
   */
  closeCells() {
    const taskHeight = this.model.targetTasksParam.height;
    const taskWidth = this.model.targetTasksParam.width;
    for (let i = 0; i < taskWidth; i++) {
      for (let j = 0; j < taskHeight; j++) {
        const id = i * taskHeight + j;
        this.gameFields[id].children[0].off("pointerdown");
        this.gameFields[id].children[0].on("pointerdown", () => {
          this.emit("selectedAnswer", this.gameFields[id].children[0]);
        });
        if (
          !this.model.closeCell[id].close &&
          !this.model.closeCell[id].ready
        ) {
          this.gameFields[id].removeChildAt(1);
          this.model.closeCell[id].close = true;
        }
      }
    }
  }
}
