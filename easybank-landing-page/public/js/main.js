const nav = document.querySelector(".header__nav");
const menu = document.querySelector(".header__menu");
menu.addEventListener("click", () => {
  menu.classList.toggle("open");
  nav.classList.toggle("open");
  menu.classList.contains("open")
    ? menu.setAttribute("aria-expanded", true)
    : menu.setAttribute("aria-expanded", false);
});
