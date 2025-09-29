const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

function resizeCanvas() {
  const gameBoard = document.querySelector(".game-board");
  const sidePanel = document.querySelector(".side-panel");

  let maxWidth, maxHeight;

  if (window.innerWidth > 768) {
    const sidePanelWidth = sidePanel ? sidePanel.offsetWidth : 280;
    maxWidth = window.innerWidth - sidePanelWidth;
    maxHeight = window.innerHeight;
  } else {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight * 0.65;
  }

  const blockSizeByWidth = Math.floor(maxWidth / BOARD_WIDTH);
  const blockSizeByHeight = Math.floor(maxHeight / BOARD_HEIGHT);

  BLOCK_SIZE = Math.min(blockSizeByWidth, blockSizeByHeight);
  BLOCK_SIZE = Math.max(BLOCK_SIZE, 15);

  canvas.width = BLOCK_SIZE * BOARD_WIDTH;
  canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

  if (window.innerWidth > 768) {
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "50%";
    canvas.style.transform = "translateY(-50%)";
  } else {
    canvas.style.position = "relative";
    canvas.style.left = "auto";
    canvas.style.top = "auto";
    canvas.style.transform = "none";
    canvas.style.margin = "0 auto";
  }
}

window.addEventListener("resize", () => {
  resizeCanvas();
  drawBoard();
});

resizeCanvas();

const WORD_LIST = [
  "THE",
  "AND",
  "FOR",
  "ARE",
  "BUT",
  "NOT",
  "YOU",
  "ALL",
  "CAN",
  "HER",
  "WAS",
  "ONE",
  "OUR",
  "OUT",
  "DAY",
  "USE",
  "MAN",
  "HAS",
  "HIM",
  "HOW",
  "ITS",
  "MAY",
  "NEW",
  "NOW",
  "OLD",
  "SEE",
  "TWO",
  "WAY",
  "WHO",
  "BOY",
  "DID",
  "GET",
  "SHE",
  "CAR",
  "LET",
  "PUT",
  "SAY",
  "TOO",
  "BAD",
  "BAG",
  "FAR",
  "FUN",
  "GOT",
  "GUN",
  "HAD",
  "HAT",
  "HIS",
  "HIT",
  "JOB",
  "LAW",
  "LAY",
  "LED",
  "LEG",
  "LIE",
  "LOG",
  "LOT",
  "LOW",
  "MAP",
  "MEN",
  "MET",
  "CAT",
  "DOG",
  "RUN",
  "SIT",
  "TOP",
  "WIN",
  "YES",
  "YET",
  "ZIP",
  "ZOO",
  "BIG",
  "BIT",
  "BOX",
  "BUS",
  "CUP",
  "CUT",
  "DAD",
  "DIG",
  "EAR",
  "EAT",
  "END",
  "EYE",
  "FEW",
  "FIT",
  "FLY",
  "GOD",
  "GUN",
  "HAD",
  "HIT",
  "HOT",
  "AGE",
  "AGO",
  "AIR",
  "BAT",
  "BED",
  "BET",
  "BUY",
  "FIX",
  "FOG",
  "GAS",
  "ABLE",
  "ALSO",
  "BACK",
  "BALL",
  "BAND",
  "BANK",
  "BASE",
  "BEAR",
  "BEAT",
  "BEEN",
  "BEST",
  "BILL",
  "BIRD",
  "BLOW",
  "BLUE",
  "BOAT",
  "BODY",
  "BOOK",
  "BORN",
  "BOTH",
  "CALL",
  "CAME",
  "CARD",
  "CARE",
  "CASE",
  "CITY",
  "CLUB",
  "COLD",
  "COME",
  "COST",
  "DARK",
  "DATA",
  "DATE",
  "DEAD",
  "DEAL",
  "DEEP",
  "DOES",
  "DONE",
  "DOOR",
  "DOWN",
  "DRAW",
  "EACH",
  "EAST",
  "EASY",
  "ELSE",
  "EVEN",
  "EVER",
  "FACE",
  "FACT",
  "FAIL",
  "FALL",
  "FARM",
  "FAST",
  "FEAR",
  "FEEL",
  "FEET",
  "FELL",
  "FELT",
  "FILE",
  "FILL",
  "FIND",
  "FINE",
  "FIRE",
  "FIRM",
  "FISH",
  "FIVE",
  "FLAT",
  "FLOW",
  "FOOD",
  "FOOT",
  "FORM",
  "FOUR",
  "FREE",
  "FROM",
  "FULL",
  "FUND",
  "GAME",
  "GAVE",
  "GIRL",
  "GIVE",
  "GLAD",
  "GOAL",
  "GOES",
  "GOLD",
  "GONE",
  "GOOD",
  "GRAY",
  "GREW",
  "GROW",
  "HAIR",
  "HALF",
  "HALL",
  "HAND",
  "HARD",
  "HAVE",
  "HEAD",
  "HEAR",
  "HEAT",
  "HELD",
  "HELL",
  "HELP",
  "HERE",
  "HIGH",
  "HILL",
  "HOLD",
  "HOLE",
  "HOME",
  "HOPE",
  "HOUR",
  "HUGE",
];

const LETTER_WEIGHTS = {
  E: 12.7,
  T: 9.1,
  A: 8.2,
  O: 7.5,
  I: 7.0,
  N: 6.7,
  S: 6.3,
  H: 6.1,
  R: 6.0,
  L: 4.0,
  D: 4.3,
  C: 2.8,
  U: 2.8,
  M: 2.4,
  W: 2.4,
  F: 2.2,
  G: 2.0,
  Y: 2.0,
  P: 1.9,
  B: 1.5,
  V: 1.0,
  K: 0.8,
  J: 0.15,
  X: 0.15,
  Q: 0.1,
  Z: 0.07,
};

const TETROMINOES = [
  { shape: [[1, 1, 1, 1]], color: "#4A90E2" },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#7ED321",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#F5A623",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#BD10E0",
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#50E3C2",
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#F8E71C",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#E94B3C",
  },
];

let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let level = 1;
let gameRunning = false;
let gamePaused = false;
let dropTimer = 0;
let dropSpeed = 48;
let foundWords = [];
let animationId = null;

function getRandomLetter() {
  const totalWeight = Object.values(LETTER_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (const [letter, weight] of Object.entries(LETTER_WEIGHTS)) {
    random -= weight;
    if (random <= 0) {
      return letter;
    }
  }
  return "E";
}

function createPiece() {
  const tetromino = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
  const piece = {
    shape: tetromino.shape,
    color: tetromino.color,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
    y: 0,
    letters: [],
  };

  for (let y = 0; y < piece.shape.length; y++) {
    piece.letters[y] = [];
    for (let x = 0; x < piece.shape[y].length; x++) {
      piece.letters[y][x] = piece.shape[y][x] ? getRandomLetter() : "";
    }
  }

  return piece;
}

function initBoard() {
  board = Array(BOARD_HEIGHT)
    .fill()
    .map(() => Array(BOARD_WIDTH).fill(""));
}

function drawBlock(x, y, color, letter = "") {
  ctx.fillStyle = color;
  ctx.fillRect(
    x * BLOCK_SIZE + 1,
    y * BLOCK_SIZE + 1,
    BLOCK_SIZE - 2,
    BLOCK_SIZE - 2
  );

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.strokeRect(
    x * BLOCK_SIZE + 1,
    y * BLOCK_SIZE + 1,
    BLOCK_SIZE - 2,
    BLOCK_SIZE - 2
  );

  if (letter) {
    ctx.fillStyle = "#ffffff";
    const fontSize = Math.max(12, Math.floor(BLOCK_SIZE * 0.6));
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      letter,
      x * BLOCK_SIZE + BLOCK_SIZE / 2,
      y * BLOCK_SIZE + BLOCK_SIZE / 2
    );
  }
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= BOARD_WIDTH; x++) {
    ctx.beginPath();
    ctx.moveTo(x * BLOCK_SIZE, 0);
    ctx.lineTo(x * BLOCK_SIZE, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= BOARD_HEIGHT; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * BLOCK_SIZE);
    ctx.lineTo(canvas.width, y * BLOCK_SIZE);
    ctx.stroke();
  }

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (board[y][x]) {
        drawBlock(x, y, "#9B9B9B", board[y][x]);
      }
    }
  }

  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          drawBlock(
            currentPiece.x + x,
            currentPiece.y + y,
            currentPiece.color,
            currentPiece.letters[y][x]
          );
        }
      }
    }
  }
}

function drawNextPiece() {
  const container = document.getElementById("nextPiece");
  container.innerHTML = "";

  if (!nextPiece) return;

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const cell = document.createElement("div");
      cell.className = "next-cell";

      if (
        y < nextPiece.shape.length &&
        x < nextPiece.shape[y].length &&
        nextPiece.shape[y][x]
      ) {
        cell.classList.add("filled");
        cell.textContent = nextPiece.letters[y][x];
      }

      container.appendChild(cell);
    }
  }
}

function isValidPosition(piece, offsetX = 0, offsetY = 0) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = piece.x + x + offsetX;
        const newY = piece.y + y + offsetY;

        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }

        if (newY >= 0 && board[newY][newX]) {
          return false;
        }
      }
    }
  }
  return true;
}

function rotatePiece() {
  const rotated = {
    ...currentPiece,
    shape: currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map((row) => row[i]).reverse()
    ),
    letters: currentPiece.letters[0].map((_, i) =>
      currentPiece.letters.map((row) => row[i]).reverse()
    ),
  };

  if (isValidPosition(rotated)) {
    currentPiece.shape = rotated.shape;
    currentPiece.letters = rotated.letters;
  }
}

function placePiece() {
  for (let y = 0; y < currentPiece.shape.length; y++) {
    for (let x = 0; x < currentPiece.shape[y].length; x++) {
      if (currentPiece.shape[y][x]) {
        const boardY = currentPiece.y + y;
        const boardX = currentPiece.x + x;
        if (boardY >= 0) {
          board[boardY][boardX] = currentPiece.letters[y][x];
        }
      }
    }
  }
}

function findWords() {
  const wordsFound = [];

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    let word = "";
    let startX = 0;

    for (let x = 0; x <= BOARD_WIDTH; x++) {
      if (x < BOARD_WIDTH && board[y][x]) {
        word += board[y][x];
      } else if (word.length >= 3) {
        if (WORD_LIST.includes(word)) {
          wordsFound.push({
            word,
            row: y,
            col: startX,
            direction: "horizontal",
            length: word.length,
          });
        }
        word = "";
        startX = x + 1;
      } else {
        word = "";
        startX = x + 1;
      }
    }
  }

  for (let x = 0; x < BOARD_WIDTH; x++) {
    let word = "";
    let startY = 0;

    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      if (y < BOARD_HEIGHT && board[y][x]) {
        word += board[y][x];
      } else if (word.length >= 3) {
        if (WORD_LIST.includes(word)) {
          wordsFound.push({
            word,
            row: startY,
            col: x,
            direction: "vertical",
            length: word.length,
          });
        }
        word = "";
        startY = y + 1;
      } else {
        word = "";
        startY = y + 1;
      }
    }
  }

  return wordsFound;
}

function clearWords(words) {
  for (const wordInfo of words) {
    if (wordInfo.direction === "horizontal") {
      for (let i = 0; i < wordInfo.length; i++) {
        board[wordInfo.row][wordInfo.col + i] = "";
      }
    } else {
      for (let i = 0; i < wordInfo.length; i++) {
        board[wordInfo.row + i][wordInfo.col] = "";
      }
    }
  }

  for (let x = 0; x < BOARD_WIDTH; x++) {
    let writePos = BOARD_HEIGHT - 1;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (board[y][x]) {
        if (y !== writePos) {
          board[writePos][x] = board[y][x];
          board[y][x] = "";
        }
        writePos--;
      }
    }
  }
}

function updateScore(words) {
  for (const wordInfo of words) {
    const points = wordInfo.length * 100 * level;
    score += points;
    foundWords.unshift({ word: wordInfo.word, points });

    if (foundWords.length > 10) {
      foundWords.pop();
    }
  }

  document.getElementById("score").textContent = score.toLocaleString();

  const wordsDiv = document.getElementById("wordsFound");
  wordsDiv.innerHTML = foundWords
    .map(
      (w) => `<div class="word-item">${w.word} <span>+${w.points}</span></div>`
    )
    .join("");

  const newLevel = Math.floor(score / 1000) + 1;
  if (newLevel > level) {
    level = newLevel;
    dropSpeed = Math.max(10, 48 - (level - 1) * 5);
    document.getElementById("level").textContent = level;
  }
}

function checkGameOver() {
  return !isValidPosition(currentPiece);
}

function gameOver() {
  gameRunning = false;
  document.getElementById("finalScore").textContent = score.toLocaleString();
  document.getElementById("gameOver").style.display = "block";
}

function update() {
  if (!gameRunning || gamePaused) {
    if (gameRunning && !gamePaused) {
      animationId = requestAnimationFrame(update);
    }
    return;
  }

  dropTimer++;
  if (dropTimer >= dropSpeed) {
    dropTimer = 0;

    if (isValidPosition(currentPiece, 0, 1)) {
      currentPiece.y++;
    } else {
      placePiece();

      const words = findWords();
      if (words.length > 0) {
        clearWords(words);
        updateScore(words);
      }

      currentPiece = nextPiece;
      nextPiece = createPiece();
      drawNextPiece();

      if (checkGameOver()) {
        gameOver();
        return;
      }
    }
  }

  drawBoard();
  animationId = requestAnimationFrame(update);
}

function handleKeyPress(e) {
  if (!gameRunning || !currentPiece || gamePaused) return;

  switch (e.key) {
    case "ArrowLeft":
      if (isValidPosition(currentPiece, -1, 0)) {
        currentPiece.x--;
      }
      break;
    case "ArrowRight":
      if (isValidPosition(currentPiece, 1, 0)) {
        currentPiece.x++;
      }
      break;
    case "ArrowDown":
      if (isValidPosition(currentPiece, 0, 1)) {
        currentPiece.y++;
        dropTimer = 0;
      }
      break;
    case "ArrowUp":
      rotatePiece();
      break;
    case " ":
      e.preventDefault();
      while (isValidPosition(currentPiece, 0, 1)) {
        currentPiece.y++;
      }
      dropTimer = dropSpeed;
      break;
    case "p":
    case "P":
      togglePause();
      break;
    case "r":
    case "R":
      if (gameRunning) {
        resetGame();
      }
      break;
  }
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("pausedOverlay").style.display = "none";
  resizeCanvas();
  initBoard();
  score = 0;
  level = 1;
  foundWords = [];
  dropSpeed = 48;
  gamePaused = false;
  document.getElementById("score").textContent = "0";
  document.getElementById("level").textContent = "1";
  document.getElementById("wordsFound").innerHTML = "";
  currentPiece = createPiece();
  nextPiece = createPiece();
  drawNextPiece();
  gameRunning = true;
  updateControlButtons();
  update();
}

function pauseGame() {
  if (!gameRunning || !currentPiece) return;
  gamePaused = true;
  document.getElementById("pausedOverlay").style.display = "block";
  updateControlButtons();
}

function resumeGame() {
  if (!gameRunning) return;
  gamePaused = false;
  document.getElementById("pausedOverlay").style.display = "none";
  updateControlButtons();
  update();
}

function togglePause() {
  if (!gameRunning) return;
  if (gamePaused) {
    resumeGame();
  } else {
    pauseGame();
  }
}

function resetGame() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  document.getElementById("gameOver").style.display = "none";
  document.getElementById("pausedOverlay").style.display = "none";

  if (!gameRunning) {
    document.getElementById("startScreen").style.display = "block";
  } else {
    startGame();
  }
}

function updateControlButtons() {
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (!playBtn || !pauseBtn || !resetBtn) return;

  playBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
  resetBtn.classList.remove("active");

  if (!gameRunning) {
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    playBtn.innerHTML = "▶";
    playBtn.title = "Play";
  } else if (gamePaused) {
    playBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
    playBtn.innerHTML = "▶";
    playBtn.title = "Resume";
    pauseBtn.classList.add("active");
  } else {
    playBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    playBtn.innerHTML = "▶";
    playBtn.title = "Play";
    playBtn.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateControlButtons();
});

document.addEventListener("keydown", handleKeyPress);
