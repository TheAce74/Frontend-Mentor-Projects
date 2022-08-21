const menu = document.querySelector(".toggle");
const closeBtn = document.querySelector(".close");
const openBtn = document.querySelector(".open");
const nav = document.querySelector(".header-nav");
const header = document.querySelector("header");
const form = document.querySelector("form");
const input = document.querySelector(".final input");
const text = document.querySelector(".final form p");
 
let a = 0;
menu.addEventListener("click", () => {
  if (a == 0) {
    menu.setAttribute("aria-expanded", true);
    closeBtn.style.display = "block";
    openBtn.style.display = "none";
    nav.style.display = "block";
    header.classList.add("nav-open");
    document.body.style.overflow = "hidden";
    a++;
  } else {
    menu.setAttribute("aria-expanded", false);
    closeBtn.style.display = "none";
    openBtn.style.display = "block";
    nav.style.display = "none";
    header.classList.remove("nav-open");
    document.body.style.overflow = "auto";
    a--;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "") {
    text.style.visibility = "visible";
    input.style.outline = "none";
    input.style.borderStyle = "solid";
    input.style["border-color"] = "hsl(0, 88%, 59%)";
    return false;
  } else {
    e.target.submit();
    input.value = "";
  }
});

input.addEventListener("input", () => {
  text.style.visibility = "hidden";
  input.style.outline = "";
  input.style.border = "";
});

const slider = new A11YSlider(document.querySelector(".slider"), {
  adaptiveHeight: false,
  dots: true,
  arrows: false,
  responsive: {
    801: {
      dots: false,
    },
  },
  customPaging: function (index) {
    if (index == 0) {
      return '<input type="radio" name="slide" checked class="mycustombtn">';
    }
    return '<input type="radio" name="slide" class="mycustombtn">';
  },
});
