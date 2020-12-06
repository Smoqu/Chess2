import * as Board from "./board.js";
import { Pawn, Bishop, Knight, King, Queen, Rook } from "./pieces.js";

export const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function createLayer(size, name, zIndex) {
  const parent = document.getElementById("chess");
  const canvas = document.createElement("canvas");
  canvas.id = name;
  canvas.setAttribute("width", `${size}px`);
  canvas.setAttribute("height", `${size}px`);
  canvas.style.position = "absolute";
  canvas.style.zIndex = `${zIndex}`;
  const ctx = canvas.getContext("2d");
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  parent.appendChild(canvas);
  return { canvas, ctx };
}

const white = {
  pawns: [],
  bishops: [],
  knights: [],
  rooks: [],
  king: Object,
  queen: Object,
};

/// Every black piece is stored in this Object
const black = {
  pawns: [],
  bishops: [],
  knights: [],
  rooks: [],
  king: Object,
  queen: Object,
};

function initPieces(color) {
  /// Ternary opertor: if the argument color is the array white then pieceColor is "white", if not it's "black."
  const pieceColor = color === white ? "white" : "black";
  /// for loop that create every pawn and appends it to color array given (black or white) cf. upperscope
  for (let i = 0; i < 8; i++) {
    color.pawns.push(new Pawn(pieceColor));
    color.pawns.forEach(
      (pawn, index) =>
        /// sets the currentSquare meta to the inital square
        (pawn.meta.currentSquare = `${LETTERS[index]}${
          color === white ? "7" : "2" /// if white then on row 7, else on row 2
        }`)
    );
    Board.squares.forEach((square) => {
      if (square.square === color.pawns[i].meta.currentSquare) {
        color.pawns[i].display(square);
      }
    });
  }

  for (let i = 0; i < 2; i++) {
    color.bishops.push(new Bishop(pieceColor));
    color.knights.push(new Knight(pieceColor));
    color.rooks.push(new Rook(pieceColor));
  }

  color.king = new King(pieceColor);
  color.queen = new Queen(pieceColor);

  /// For each item, sets the currentSquare to the corresponding one
  color.bishops[0].meta.currentSquare = `C${color === white ? 8 : 1}`;
  color.bishops[1].meta.currentSquare = `F${color === white ? 8 : 1}`;

  color.rooks[0].meta.currentSquare = `A${color === white ? 8 : 1}`;
  color.rooks[1].meta.currentSquare = `H${color === white ? 8 : 1}`;

  color.knights[0].meta.currentSquare = `B${color === white ? 8 : 1}`;
  color.knights[1].meta.currentSquare = `G${color === white ? 8 : 1}`;

  for (let i = 0; i < 2; i++) {
    Board.squares.forEach((square) => {
      if (square.square === color.bishops[i].meta.currentSquare) {
        color.bishops[i].display(square);
      } else if (square.square === color.rooks[i].meta.currentSquare) {
        color.rooks[i].display(square);
      } else if (square.square === color.knights[i].meta.currentSquare) {
        color.knights[i].display(square);
      }
    });
  }

  color.queen.meta.currentSquare = `D${color === white ? 8 : 1}`;

  color.king.meta.currentSquare = `E${color === white ? 8 : 1}`;

  Board.squares.forEach((square) => {
    if (square.square === color.queen.meta.currentSquare) {
      color.queen.display(square);
    } else if (square.square === color.king.meta.currentSquare) {
      color.king.display(square);
    }
  });
}

initPieces(white);
initPieces(black);
console.log(white);
