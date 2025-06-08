// 2048 بطابع جيشي - AbuHamza🔻
const gridElement = document.getElementById("grid");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
let grid = [];
let score = 0;

function getMilitarySymbol(value) {
  switch (value) {
    case 2: return "🪖";
    case 4: return "🔫";
    case 8: return "💣";
    case 16: return "🪂";
    case 32: return "🚁";
    case 64: return "🛡️";
    case 128: return "🪧";
    case 256: return "🚀";
    case 512: return "🧨";
    case 1024: return "🪖";
    case 2048: return "🎖️";
    default: return "";
  }
}

function hideInstructions() {
  document.getElementById("instructionOverlay").style.display = "none";
}

function createGrid() {
  grid = [];
  for (let i = 0; i < 4; i++) grid.push([0, 0, 0, 0]);
}

function drawGrid() {
  gridElement.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (grid[i][j] !== 0) {
        const span = document.createElement("span");
        span.textContent = getMilitarySymbol(grid[i][j]);
        cell.appendChild(span);
      }
      gridElement.appendChild(cell);
    }
  }
  scoreElement.textContent = score;
}

function getEmptyCells() {
  const empty = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (grid[i][j] === 0) empty.push([i, j]);
  return empty;
}

function addRandomTile() {
  const empty = getEmptyCells();
  if (empty.length === 0) return;
  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  grid[i][j] = Math.random() < 0.9 ? 2 : 4;
}

function slide(row) {
  row = row.filter(val => val);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  return row.filter(val => val).concat(new Array(4 - row.filter(val => val).length).fill(0));
}

function rotateGrid() {
  const newGrid = [];
  for (let i = 0; i < 4; i++) {
    newGrid.push([]);
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[4 - j - 1][i];
    }
  }
  grid = newGrid;
}

function move(dir) {
  let oldGrid = JSON.stringify(grid);

  for (let i = 0; i < dir; i++) rotateGrid();
  for (let i = 0; i < 4; i++) grid[i] = slide(grid[i]);
  for (let i = 0; i < (4 - dir) % 4; i++) rotateGrid();

  if (oldGrid !== JSON.stringify(grid)) {
    addRandomTile();
    drawGrid();
    checkGameOver();
  }
}

function checkGameOver() {
  if (getEmptyCells().length > 0) return;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (i < 3 && grid[i][j] === grid[i + 1][j]) return;
      if (j < 3 && grid[i][j] === grid[i][j + 1]) return;
    }
  }
  messageElement.textContent = "🛑 انتهت اللعبة!";
}

function startGame() {
  createGrid();
  score = 0;
  addRandomTile();
  addRandomTile();
  drawGrid();
  messageElement.textContent = "";
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft": move(0); break;
    case "ArrowUp": move(1); break;
    case "ArrowRight": move(2); break;
    case "ArrowDown": move(3); break;
  }
});

startGame();
