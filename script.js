// -------------------- СОСТОЯНИЕ --------------------
let hearts = 5;
let time = 30 * 60; // 30 минут

// -------------------- ЭЛЕМЕНТЫ --------------------
const startScreen = document.getElementById("startScreen");
const insideScreen = document.getElementById("insideScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const winScreen = document.getElementById("winScreen");

const startBtn = document.getElementById("startBtn");
const finalBtn = document.getElementById("finalBtn");

const timerEl = document.getElementById("timer");
const heartsEl = document.getElementById("hearts");
const countdownEl = document.getElementById("insideCountdown");

// -------------------- ЗВУКИ --------------------
const bgMusic = document.getElementById("bgMusic");
const errorSound = document.getElementById("errorSound");
const successSound = document.getElementById("successSound");
const winSound = document.getElementById("winSound");
const boomSound = document.getElementById("boomSound");

// -------------------- КОДЫ --------------------
const codes = {
  lvl1: "1368",
  lvl2: "4621",
  lvl3: "2600",
  lvl4: "2312"
};

// -------------------- КРУГИ --------------------
const circles = {
  lvl1: document.getElementById("c1"),
  lvl2: document.getElementById("c2"),
  lvl3: document.getElementById("c3"),
  lvl4: document.getElementById("c4")
};

// -------------------- INPUT --------------------
const inputs = {
  lvl1: document.getElementById("lvl1"),
  lvl2: document.getElementById("lvl2"),
  lvl3: document.getElementById("lvl3"),
  lvl4: document.getElementById("lvl4")
};

// -------------------- СТАТУС --------------------
const solved = {
  lvl1: false,
  lvl2: false,
  lvl3: false,
  lvl4: false
};

// -------------------- ФУНКЦИИ --------------------
function showScreen(screen) {
  startScreen.classList.remove("active");
  insideScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");
  winScreen.classList.remove("active");

  screen.classList.add("active");
}

function updateHearts() {
  heartsEl.innerText = "❤️".repeat(hearts);
}

function updateTimer() {
  let min = Math.floor(time / 60);
  let sec = time % 60;

  timerEl.innerText =
    String(min).padStart(2, "0") + ":" +
    String(sec).padStart(2, "0");
}

// -------------------- ТАЙМЕР --------------------
function startTimer() {
  const interval = setInterval(() => {
    time--;
    updateTimer();

    if (time <= 0) {
      clearInterval(interval);
      boomSound.play();
      bgMusic.pause();
      showScreen(gameOverScreen);
    }
  }, 1000);
}

// -------------------- СТАРТ --------------------
startBtn.onclick = () => {
  showScreen(insideScreen);

  bgMusic.volume = 0.4;
  bgMusic.play();

  let count = 10;
  countdownEl.innerText = count;

  const insideTimer = setInterval(() => {
    count--;
    countdownEl.innerText = count;

    if (count <= 0) {
      clearInterval(insideTimer);
      showScreen(gameScreen);
      startTimer();
    }
  }, 1000);
};

// -------------------- ПРОВЕРКА КОДОВ --------------------
Object.keys(codes).forEach(lvl => {

  inputs[lvl].addEventListener("input", (e) => {
    let value = e.target.value;

    // только цифры
    value = value.replace(/[^0-9]/g, "");
    e.target.value = value;

    if (value.length !== 4) return;

    if (value === codes[lvl]) {

      circles[lvl].classList.remove("red");
      circles[lvl].classList.add("green");

      solved[lvl] = true;
      inputs[lvl].disabled = true;

      successSound.play();
      checkWin();

    } else {

      circles[lvl].classList.remove("green");
      circles[lvl].classList.add("red");

      errorSound.play();

      hearts--;
      updateHearts();

      e.target.value = "";

      if (hearts <= 0) {
        boomSound.play();
        bgMusic.pause();
        showScreen(gameOverScreen);
      }
    }
  });
});

// -------------------- ФИНАЛ --------------------
function checkWin() {
  if (Object.values(solved).every(v => v)) {
    finalBtn.disabled = false;
  }
}

finalBtn.onclick = () => {
  if (!Object.values(solved).every(v => v)) return;

  bgMusic.pause();
  winSound.play();

  showScreen(winScreen);
};

// -------------------- ИНИЦИАЛИЗАЦИЯ --------------------
updateHearts();
updateTimer();