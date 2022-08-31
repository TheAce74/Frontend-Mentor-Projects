const menu = document.querySelector('button[aria-label="menu"]');
const open = document.querySelector(".open");
const close = document.querySelector(".close");
const nav = document.querySelector("#primary-navigation");
const links = document.querySelectorAll("header > .flex + * a");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");
  nav.classList.toggle("active");
  links.forEach((link) => {
    link.classList.toggle("active");
  });

  menu.classList.contains("active")
    ? menu.setAttribute("aria-expanded", true)
    : menu.setAttribute("aria-expanded", false);
});

const dropdown = document.querySelectorAll(".target");
const arrows = document.querySelectorAll(".target > img");

dropdown.forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    const index = e.target.dataset.value;
    hover(index);
  });

  item.addEventListener("mouseout", (e) => {
    const index = e.target.dataset.value;
    out(index);
  });
});

function hover(index) {
  arrows[index].src = "images/icon-arrow-up.svg";
}

function out(index) {
  arrows[index].src = "images/icon-arrow-down.svg";
}
