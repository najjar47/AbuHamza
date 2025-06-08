const boardSize = 4;
let board = [];
let score = 0;

const symbols = {
  2: "🪖",     // جندي
  4: "🎖️",    // رتبة
  8: "🛡️",     // قائد
  16: "🚁",    // دعم جوي
  32: "🔥",    // نصر
  64: "💣",
  128: "🧨",
  256: "🪖🪖",
  512: "🛡️🛡️",
  1024: "🚁🚁",
  2048: "🏆"
};

function startGame() {
  document.getElementById("instructions").style.display = "none";
  init();
}

function restartGame() {
  board = [];
  score = 0;
  document.getElementById("score").innerText = "النقاط: 0";
  init();
}

function init() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = Array(boardSize).fill(0);
  }
  addRandomTile();
  addRandomTile();
  drawBoard();
}

function addRandomTile() {
  const emptyTiles = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0) emptyTiles.push({ i, j });
    }
  }
  if (emptyTiles.length === 0) return;
  const { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[i][j] = Math.random() < 0.9 ? 2 : 4;
}

function drawBoard() {
  const boardDiv = document.getElementById("game-board");
  boardDiv.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const tile = document.createElement("div");
      const value = board[i][j];
      tile.className = "tile tile-" + value;
      tile.textContent = symbols[value] || "";
      boardDiv.appendChild(tile);
    }
  }
}

function move(dir) {
  let moved = false;
  const merged = Array.from({ length: boardSize }, () => Array(boardSize).fill(false));

  function slide(row) {
    const arr = row.filter(val => val !== 0);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score += arr[i];
        arr[i + 1] = 0;
      }
    }
    return arr.filter(val => val !== 0).concat(Array(boardSize).fill(0)).slice(0, boardSize);
  }

  if (dir === "left") {
    for (let i = 0; i < boardSize; i++) {
      const original = [...board[i]];
      board[i] = slide(board[i]);
      if (original.toString() !== board[i].toString()) moved = true;
    }
  }

  if (dir === "right") {
    for (let i = 0; i < boardSize; i++) {
      const original = [...board[i]];
      board[i] = slide(board[i].reverse()).reverse();
      if (original.toString() !== board[i].toString()) moved = true;
    }
  }

  if (dir === "up") {
    for (let j = 0; j < boardSize; j++) {
      const col = board.map(row => row[j]);
      const newCol = slide(col);
      for (let i = 0; i < boardSize; i++) {
        if (board[i][j] !== newCol[i]) moved = true;
        board[i][j] = newCol[i];
      }
    }
  }

  if (dir === "down") {
    for (let j = 0; j < boardSize; j++) {
      const col = board.map(row => row[j]);
      const newCol = slide(col.reverse()).reverse();
      for (let i = 0; i < boardSize; i++) {
        if (board[i][j] !== newCol[i]) moved = true;
        board[i][j] = newCol[i];
      }
    }
  }

  if (moved) {
    addRandomTile();
    drawBoard();
    document.getElementById("score").innerText = "النقاط: " + score;
  }
}

document.addEventListener("keydown", (e) => {
  const dirMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right"
  };
  if (dirMap[e.key]) {
    move(dirMap[e.key]);
  }
});
