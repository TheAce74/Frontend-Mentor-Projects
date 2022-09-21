const pops = document.querySelectorAll(".pop");
const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const tips = document.querySelectorAll(".tip button");
const amounts = document.querySelectorAll(".amount");
const reset = document.querySelector(".reset");

for (let i = 0; i < tips.length - 1; i++) {
  tips[i].addEventListener("click", calc);
}

function calc(e, ratio) {
  //validating input
  const obj = {
    0: bill,
    1: people,
  };
  const validity = [];
  for (let prop in obj) {
    if (obj[prop].value === "0") {
      error(pops[+prop], true);
      validity.push(false);
    } else if (obj[prop].value === "") {
      error(pops[+prop]);
      validity.push(false);
    } else {
      validity.push(true);
    }
  }
  const valid = validity.every((elem) => elem === true);
  if (!valid) return;

  //actual calculation
  if (!ratio) {
    const ratio = +e.target.innerText.slice(0, -1) / 100;
    if (!bill.matches(":invalid") && !people.matches(":invalid")) {
      const money = +bill.value;
      const humans = +people.value;
      const tip = money * ratio;
      const total = money + tip;
      amounts[0].innerText = `$${(tip / humans).toFixed(2)}`;
      amounts[1].innerText = `$${(total / humans).toFixed(2)}`;
      reset.removeAttribute("disabled");
      //indicate current tip %
      tips.forEach((tip) => {
        tip.classList.remove("btn-active");
      });
      e.target.classList.add("btn-active");
      tips[tips.length - 1].innerText = "Custom";
    }
  } else {
    if (!bill.matches(":invalid") && !people.matches(":invalid")) {
      const money = +bill.value;
      const humans = +people.value;
      const tip = money * ratio;
      const total = money + tip;
      amounts[0].innerText = `$${(tip / humans).toFixed(2)}`;
      amounts[1].innerText = `$${(total / humans).toFixed(2)}`;
      reset.removeAttribute("disabled");
      //indicate current tip %
      tips.forEach((tip) => {
        tip.classList.remove("btn-active");
      });
      e.classList.add("btn-active");
      tips[tips.length - 1].innerText = Math.round(ratio * 100) + "%";
    }
  }
}

function error(elem, value) {
  if (!elem.querySelector(".zero")) {
    if (value) elem.innerHTML += `<p class="zero">Can't be zero</p>`;
    else elem.innerHTML += `<p class="zero">Can't be blank</p>`;
  }
}

bill.addEventListener("input", undo);
people.addEventListener("input", undo);

function undo(e) {
  const index = Object.is(e.target, bill) ? 0 : 1;
  const warn = pops[index].querySelector(".zero");
  if (warn) warn.remove();
  //no need to indicate tips if user is typing
  tips.forEach((tip) => {
    tip.classList.remove("btn-active");
  });
  tips[tips.length - 1].innerText = "Custom";
}

reset.addEventListener("click", (e) => {
  e.target.disabled = true;
  amounts.forEach((amount) => (amount.innerText = "$0.00"));
  tips.forEach((tip) => tip.classList.remove("btn-active"));
  bill.value = "";
  people.value = "";
  tips[tips.length - 1].innerText = "Custom";
});

tips[tips.length - 1].addEventListener("click", openPopup);

function openPopup() {
  const div = document.createElement("div");
  div.className = "flex flex-col popup";
  div.setAttribute("role", "alert");
  div.setAttribute("aria-live", "polite");
  div.innerHTML = ` <h2>Enter a percentage value</h2>
    <input type="number" min="1" max="100" placeholder="1 to 100">
    <button class="btn" onclick="closePopup(this)">Submit</button>`;
  document.body.appendChild(div);
}

function closePopup(e) {
  const popup = document.querySelector(".popup");
  const input = e.previousElementSibling;
  if (input.matches(":invalid") || +input.value === 0) {
    return;
  } else {
    calc(tips[tips.length - 1], +input.value / 100);
  }
  document.body.removeChild(popup);
}
