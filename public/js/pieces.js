import { createLayer } from "./main.js";
import { BOARD_SIZE, scale, board } from "./board.js";

const images = document.getElementById("images");

const { canvas: piecesCanvas, ctx: ctxPieces } = createLayer(
  BOARD_SIZE,
  "pieces",
  3
);

export class Piece {
  constructor(color, piece) {
    this.meta = {
      color,
      piece,
      isDead: false,
      currentSquare: "",
      coordinates: { x: 0, y: 0 },
    };
    this.piece = document.createElement("img");
    this.piece.src = `./public/assets/pieces/${this.meta.color}/${this.meta.piece}_${this.meta.color}.png`;
    this.piece.className = `piece ${piece} ${color}`;
    images.appendChild(this.piece);
    // this.piece.onload = () => ctxPieces.drawImage(this.piece, 0, 0);
    piecesCanvas.onclick = (e) => {
      const mouseX = e.clientX - board.left;
      const mouseY = e.clientY - board.top;
      console.log(mouseX, mouseY);
      console.log(this.meta);
      //   console.log(this.piece);
    };
  }

  display(square) {
    this.piece.onload = () =>
      ctxPieces.drawImage(
        this.piece,
        square.x + scale / 2 - this.piece.width / 2,
        square.y + scale / 2 - this.piece.height / 2
      );
    this.meta.coordinates = {
      x: square.x + scale / 2 - this.piece.width / 2,
      y: square.y + scale / 2 - this.piece.height / 2,
    };
  }
}

export class Pawn extends Piece {
  constructor(color, piece = "pawn") {
    super(color, piece);
  }
}

export class Knight extends Piece {
  constructor(color, piece = "knight") {
    super(color, piece);
  }
}

/// Bishop object inherits from Piece
export class Bishop extends Piece {
  constructor(color, piece = "bishop") {
    super(color, piece);
  }
}

/// Rook object inherits from Piece
export class Rook extends Piece {
  constructor(color, piece = "rook") {
    super(color, piece);
  }
}

/// Queen object inherits from Piece
export class Queen extends Piece {
  constructor(color, piece = "queen") {
    super(color, piece);
  }
}

/// King object inherits from Piece
export class King extends Piece {
  constructor(color, piece = "king") {
    super(color, piece);
  }
}
