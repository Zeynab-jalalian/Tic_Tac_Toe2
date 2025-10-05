const btns = document.querySelectorAll(".btn");
const msg = document.getElementById("msg");
const msgbox = document.querySelector(".msgbox");
const newGame = document.querySelector(".newGame");
const restart = document.querySelector(".restart");
const friend = document.getElementById("friend");
const wrapper = document.querySelector(".wrapper");
const container = document.querySelector(".container");
const single = document.getElementById("single");

let Xturn = true;
let count = 0;
let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let singlePlayer = false;

single.addEventListener("click", () => {
  wrapper.classList.remove("hide");
  container.classList.add("hide");
  singlePlayer = true;
});

function computerMove() {
  const emptyBtns = Array.from(btns).filter((btn) => btn.innerText === "");
  if (emptyBtns.length === 0) return;
  const randomBtn = emptyBtns[Math.floor(Math.random() * emptyBtns.length)];
  randomBtn.innerText = "O";
  randomBtn.disabled = true;
  randomBtn.style.color = "blue";
  count += 1;
  winChecker();
  if (count === 9) {
    disable();
    draw();
  }
}

function disable() {
  msgbox.classList.remove("hide");
}
function whoWins(val1) {
  if (singlePlayer) {
    if (val1 === "X") {
      msg.innerText = "You Win!";
    } else {
      msg.innerText = "Computer Wins!";
    }
  } else {
    msg.innerText = `${val1} Wins!`;
  }
  disable();
}
function draw() {
    msg.innerText = "It's a draw!";
    disable();
}
function able() {
  btns.forEach((btn) => {
    btn.innerText = "";
    btn.disabled = false;
  });
  msgbox.classList.add("hide");
  wrapper.classList.add("hide");
  container.classList.remove("hide");
  count = 0;
  Xturn = true;
}

newGame.addEventListener("click", able);
restart.addEventListener("click", able);

friend.addEventListener("click", () => {
  wrapper.classList.remove("hide");
  container.classList.add("hide");
});

function winChecker() {
  for (let i of winningPattern) {
    let [i1, i2, i3] = i;

    let val1 = btns[i1].innerText;
    let val2 = btns[i2].innerText;
    let val3 = btns[i3].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 == val2 && val2 == val3) {
        whoWins(val1);
        disable();
      }
    }
  }
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (Xturn) {
      Xturn = false;
      btn.innerText = "X";
      btn.disabled = true;
      btn.style.color = "red";
    } else {
      Xturn = true;
      btn.innerText = "O";
      btn.disabled = true;
      btn.style.color = "blue";
    }
    count += 1;
    if (count == 9) {
      draw();
    }
    if (singlePlayer) {
      setTimeout(() => {
        computerMove();
        Xturn = true;
      }, 300);
    }
    winChecker();
  });
});
