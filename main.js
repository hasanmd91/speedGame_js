const startButton = document.querySelector("#start");
const endButton = document.querySelector("#end");
const circles = document.querySelectorAll(".circle");
const score = document.querySelector("#score");
const overlay = document.querySelector("#overlay");
const modalscore = document.querySelector("#modalscore");
const closebutton = document.querySelector("#closebutton");

let count = 0;
let activeNum = 0;
let timer;
let pace = 1000;
let rounds = 0;
let gameIsOn = false;

//sounds
const startSound = new Audio("sounds/starter.wav");
const endGameSound = new Audio("sounds/gameover.wav");
const click = new Audio("sounds/click.mp3");

console.log(startSound);

// start game functionality starts here
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const newCircle = (activeNum) => {
  let nextActiveNum = randomNumber(0, 3);
  if (activeNum != nextActiveNum) {
    return nextActiveNum;
  } else {
    return newCircle(activeNum);
  }
};

const startgame = () => {
  startSound.play();
  gameIsOn = true;
  startButton.style.display = "none";
  endButton.style.display = "initial";
  let nextActiveNum = newCircle(activeNum);
  circles[nextActiveNum].classList.toggle("active");
  circles[activeNum].classList.remove("active");
  activeNum = nextActiveNum;
  timer = setTimeout(startgame, pace);
  pace -= 10;
  rounds++;

  if (rounds >= 2) {
    return endGame();
  }
};

// start game functionality ends here

// end game functionality starts here

const endGame = () => {
  endGameSound.play();
  overlay.style.visibility = "visible";
  clearTimeout(timer);
  gameIsOn = false;
  endGameSound.play();
};

// end game functionality ends here

// circles click functionalty starts here

const scoreCount = (i) => {
  if (i != activeNum) {
    endGame();
    startSound.stop();
    endGameSound.play();
  } else {
    count++;
    rounds--;
    score.textContent = count;

    if (count >= 1 && count <= 5) {
      modalscore.textContent = ` You picked only ${count} color`;
    } else if (count >= 6 && count <= 15) {
      modalscore.textContent = ` You picked  ${count} color well done `;
    } else if (count >= 16) {
      modalscore.textContent = ` You picked  ${count} color very good job`;
    }
  }
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => {
    if (circle.click && gameIsOn === true) {
      scoreCount(i);
    }
  });
});

// circles click functionalty ends here

// reset game functionalty starts here

const newGame = () => {
  window.location.reload();
};

// reset game functionalty ends here

startButton.addEventListener("click", startgame);
endButton.addEventListener("click", endGame);
closebutton.addEventListener("click", newGame);
