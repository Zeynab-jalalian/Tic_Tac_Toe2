const btns = document.querySelectorAll(".btn");
const msg = document.getElementById("msg");
const msgbox = document.querySelector(".msgbox");
const newGame = document.querySelector(".newGame");
const restart=document.querySelector(".restart");

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

function disable() {
  msgbox.classList.remove("hide");
}
function whoWins(val1) {
  msg.innerText = `${val1} Wins!`;
}
function draw() {
  msg.innerText = `It's a draw!`;
}
function able() {
    btns.forEach((btn) => {
      btn.innerText = "";
      btn.disabled = false;
    });
    msgbox.classList.add("hide");
    count = 0; 
    Xturn = true;
}

newGame.addEventListener("click", able);
restart.addEventListener("click", able);

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
    } else {
      Xturn = true;
      btn.innerText = "O";
      btn.disabled = true;
    }
    count += 1;
    if (count == 9) {
      disable();
      draw();
    }
    winChecker();
  });
});
