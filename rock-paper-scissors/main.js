const label = document.querySelector("label");
const checkbox = document.querySelector("#toggle");
const score = document.querySelector(".score p");
const frame = document.querySelector(".frame");
const lobby = document.querySelector(".lobby");
const stat = document.querySelector(".stats");
const choice = document.querySelectorAll(".frame .play");
const modal = document.querySelector("dialog");
const rules = document.querySelector(".rules");
const close = document.querySelector(".close");
const modalImage = document.querySelector("dialog > img");

label.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") evt.target.click();
});

checkbox.addEventListener("input", (evt) => {
  if (evt.target.checked) {
    document.querySelectorAll("[data-seen]").forEach((item) => {
      item.dataset.seen = "shown";
    });
    modalImage.src = "images/image-rules-bonus.svg";
  } else {
    document.querySelectorAll("[data-seen]").forEach((item) => {
      item.dataset.seen = "hidden";
    });
    modalImage.src = "images/image-rules.svg";
  }

  score.textContent = "0";
});

choice.forEach((item) => {
  item.addEventListener("click", play);
});

const moves = ["paper", "scissors", "rock", "lizard", "spock"];

const wins = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

function play(evt) {
  const computer = !checkbox.checked
    ? Math.floor(Math.random() * 3)
    : Math.floor(Math.random() * moves.length);
  const player = moves.findIndex((item) => evt.target.id === item);

  frame.classList.toggle("hidden");
  lobby.classList.toggle("hidden");

  const icon = lobby.querySelectorAll(".play");
  const pic = lobby.querySelector(".play img");

  icon[0].id = moves[player];
  pic.src = `images/icon-${moves[player]}.svg`;

  setTimeout(() => {
    icon[1].id = moves[computer];
    const image = document.createElement("img");
    image.src = `images/icon-${moves[computer]}.svg`;
    icon[1].appendChild(image);
  }, 500);

  const status = check(player, computer);

  setTimeout(() => {
    if (status.endsWith("e")) {
      icon[1].classList.add("won");
      score.textContent =
        Number(score.textContent) === 0 ? 0 : Number(score.textContent) - 1;
      stat.innerHTML = `<h3>${status}</h3>
        <button class="btn | reset btn-lost" onclick="reset()">Play Again</button>`;
    } else {
      if (status.endsWith("n")) {
        icon[0].classList.add("won");
        score.textContent = Number(score.textContent) + 1;
      }
      stat.innerHTML = `<h3>${status}</h3>
        <button class="btn | reset" onclick="reset()">Play Again</button>`;
    }
  }, 1000);
}

function check(player, computer) {
  if (moves[player] === moves[computer]) return "Draw";
  else {
    const index = wins[moves[player]].indexOf(moves[computer]);
    return index !== -1 ? "You Win" : "You Lose";
  }
}

function reset() {
  frame.classList.toggle("hidden");
  lobby.classList.toggle("hidden");
  const icon = lobby.querySelectorAll(".play");
  icon[1].querySelector("img").remove();
  stat.innerHTML = "";
  icon.forEach((elem) => {
    elem.classList.remove("won");
  });
}

rules.addEventListener("click", () => {
  modal.showModal();
});

close.addEventListener("click", () => {
  modal.close();
});
