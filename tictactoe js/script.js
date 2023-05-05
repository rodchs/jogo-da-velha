"use strict";

const grid = [];
const textGameState = document.querySelector("#game-state");
let gameState = 0;
let currentPlayer = "x";
const btnReset = document.querySelector("#restart-game");
const playerX = [];
const playerCircle = [];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = function (player) {
  winningConditions.forEach(function (arr) {
    if (arr.every((el) => player.includes(el))) {
      gameState = 1;
      player === playerX
        ? (textGameState.textContent = "X Wins")
        : (textGameState.textContent = "Circle Wins");
    } else if (checkDraw(grid)) {
      gameState = 2;
      textGameState.textContent = "Draw";
    }
  });
};

const checkDraw = function (grid) {
  return grid.every(
    (el) => el.classList.contains("circle") || el.classList.contains("x")
  );
};

const squareEmpty = function (square) {
  console.log(
    square.classList.contains("x") || square.classList.contains("circle"),
    square
  );

  return square.classList.contains("x") || square.classList.contains("circle");
};

const clearGame = function () {
  grid.forEach((square) => {
    square.classList.remove("circle");
    square.classList.remove("x");
    square.textContent = "";
  });
  gameState = 0;
  playerX.splice(0, playerX.length);
  playerCircle.splice(0, playerCircle.length);
  textGameState.textContent = "Playing";
};

for (let i = 0; i < 3; i++) {
  for (let x = 0; x < 3; x++) {
    grid.push(document.querySelector(`#x${i}y${x}`));
  }
}

textGameState.textContent = "Playing";

for (const square of grid) {
  square.addEventListener("click", function () {
    if (gameState === 0) {
      if (!squareEmpty(square)) {
        if (currentPlayer === "x") {
          square.classList.add("x");
          square.textContent = "X";
          playerX.push(grid.indexOf(square));
          checkWin(playerX);
          document.querySelector("#player1").style.opacity = 1;
          document.querySelector("#player0").style.opacity = 0;
          currentPlayer = "circle";
        } else {
          square.classList.add("circle");
          square.textContent = "O";
          playerCircle.push(grid.indexOf(square));
          checkWin(playerCircle);
          document.querySelector("#player1").style.opacity = 0;
          document.querySelector("#player0").style.opacity = 1;
          currentPlayer = "x";
        }
      }
    }
  });
}

btnReset.addEventListener("click", function () {
  clearGame();
});
