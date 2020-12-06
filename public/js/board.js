import { createLayer } from "./main.js";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const BOARD_SIZE = 700;
const COLORS = [1, 0, 1, 0, 1, 0, 1, 0];
export const scale = BOARD_SIZE / 8;
export let squares = [];
const black = "rgb(48, 48, 48)";

const { canvas: boardCanvas, ctx: ctxBoard } = createLayer(
  BOARD_SIZE,
  "board",
  1
);

export const board = boardCanvas.getBoundingClientRect();

class Square {
  constructor(x, y, color, letter) {
    this.x = x * scale;
    this.y = y * scale;
    this.A = { x: this.x, y: this.y };
    this.B = { x: this.x + scale, y: this.y };
    this.C = { x: this.x + scale, y: this.y + scale };
    this.D = { x: this.x, y: this.y + scale };
    this.middle = { x: this.B.x / 2, y: this.C.y / 2 };
    ctxBoard.fillRect(this.x, this.y, scale, scale);
    this.color = color;
    this.square = `${letter}${y + 1}`;
  }
}

for (let x = 0; x < 8; x++) {
  COLORS.reverse();
  for (let y = 0; y < 8; y++) {
    const color = (ctxBoard.fillStyle = COLORS[y] === 1 ? black : "white");
    squares.push(new Square(x, y, color, LETTERS[x]));
  }
}

// console.log(squares);
// squares.forEach((square) => {
//   ctxBoard.fillStyle = "green";
//   ctxBoard.fillText(square.square, square.x + 50, square.C.y - 50, 50);
// });
