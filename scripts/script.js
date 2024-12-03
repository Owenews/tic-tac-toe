"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".square");
  const resetGameBtn = document.getElementById("reset-game");
  const resetScoresBtn = document.getElementById("reset-scores");
  const squaresArray = Array.from(squares);
  const year = new Date().getFullYear();
  const yearElt = document.getElementById("year");
  const player1ScoreElt = document.getElementById("player1-score");
  const player2ScoreElt = document.getElementById("player2-score");
  const popoverElt = document.getElementById("popover");
  const popoverPElt = document.querySelector("#popover p");

  let player = 1;
  let scorep1 = 0;
  let scorep2 = 0;
  let gameover = false;

  yearElt.textContent = year;

  function draw() {
    gameover = true;
    return "Égalité !";
  }

  function crossthrough(square) {
    //if(!!square.textContent.length) return;
    //if(square.textContent.length > 0) return; //if not empty return
    const img = square.querySelector("img");

    if (gameover) return;
    if (!!img.getAttribute("src").length) return;

    img.classList.add("square-img-show");

    if (player % 2 === 0) {
      img.src = "./styles/images/player1.png";
    } else {
      img.src = "./styles/images/player2.png";
    }

    player += 1;
  }

  function resetGame() {
    player = 1;
    gameover = false;

    squares.forEach((square) => {
      square.querySelector("img").src = "";
      square.querySelector("img").classList.add("square-img-hide");
      square
        .querySelector("img")
        .classList.remove("square-img-show", "winners-rotate");
    });
  }

  function resetScores() {
    scorep1 = 0;
    scorep2 = 0;
    player1ScoreElt.textContent = 0;
    player2ScoreElt.textContent = 0;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function winGame() {
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        squaresArray[a].querySelector("img").getAttribute("src") &&
        squaresArray[a].querySelector("img").getAttribute("src") ===
          squaresArray[b].querySelector("img").getAttribute("src") &&
        squaresArray[a].querySelector("img").getAttribute("src") ===
          squaresArray[c].querySelector("img").getAttribute("src")
      ) {
        if (player % 2 === 0) {
          scorep1 += 1;
        } else if (player % 2 === 1) {
          scorep2 += 1;
        }
        gameover = true;
        squaresArray[a].querySelector("img").classList.add("winners-rotate");
        squaresArray[b].querySelector("img").classList.add("winners-rotate");
        squaresArray[c].querySelector("img").classList.add("winners-rotate");

        player1ScoreElt.textContent = scorep1;
        player2ScoreElt.textContent = scorep2;

        popoverElt.classList.add("confettis");
        popoverPElt.textContent = `Joueur ${
          player % 2 === 0 ? "1" : "2"
        } a gagné ! `;
        popoverElt.showPopover();
      } else if (
        player === 10 &&
        squaresArray[a].querySelector("img").getAttribute("src") &&
        squaresArray[a].querySelector("img").getAttribute("src") !==
          squaresArray[b].querySelector("img").getAttribute("src") &&
        squaresArray[a].querySelector("img").getAttribute("src") !==
          squaresArray[c].querySelector("img").getAttribute("src")
      ) {
        popoverElt.classList.remove("confettis");
        popoverPElt.textContent = draw();
        popoverElt.showPopover();
      }
    }
  }

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (gameover) return;
      crossthrough(square);
      sleep(1).then(() => winGame());
    });
  });

  resetGameBtn.addEventListener("click", resetGame);
  resetScoresBtn.addEventListener("click", resetScores);
});
