const toggle = document.querySelector("label");
const checkbox = document.querySelector("[type='checkbox']");
const range = document.querySelector(".range");
const views = document.querySelector(".views");
const price = document.querySelector(".price");

toggle.addEventListener("keypress", (e) => {
  if (e.key === "Enter") e.target.click();
});

toggle.addEventListener("click", () => {
  setTimeout(bill, 0);
});

range.addEventListener("input", bill);

const prices = [8, 12, 16, 24, 36];

function bill() {
  if (!checkbox.checked) {
    switch (parseInt(range.value)) {
      case 0:
        views.textContent = "10k";
        price.textContent = `$${prices[0]}.00`;
        break;

      case 25:
        views.textContent = "50k";
        price.textContent = `$${prices[1]}.00`;
        break;

      case 50:
        views.textContent = "100k";
        price.textContent = `$${prices[2]}.00`;
        break;

      case 75:
        views.textContent = "500k";
        price.textContent = `$${prices[3]}.00`;
        break;

      case 100:
        views.textContent = "1m";
        price.textContent = `$${prices[4]}.00`;
        break;
    }
  } else {
    switch (parseInt(range.value)) {
      case 0:
        views.textContent = "10k";
        price.textContent = `$${0.75 * prices[0]}.00`;
        break;

      case 25:
        views.textContent = "50k";
        price.textContent = `$${0.75 * prices[1]}.00`;
        break;

      case 50:
        views.textContent = "100k";
        price.textContent = `$${0.75 * prices[2]}.00`;
        break;

      case 75:
        views.textContent = "500k";
        price.textContent = `$${0.75 * prices[3]}.00`;
        break;

      case 100:
        views.textContent = "1m";
        price.textContent = `$${0.75 * prices[4]}.00`;
        break;
    }
  }
}
