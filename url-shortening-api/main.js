//navigation
const menu = document.querySelector('button[aria-label="menu"]');
const open = document.querySelector(".open");
const close = document.querySelector(".close");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");

  menu.classList.contains("active")
    ? menu.setAttribute("aria-expanded", true)
    : menu.setAttribute("aria-expanded", false);

  document.querySelector("header nav ul").classList.toggle("show");
  document.querySelector("header .flex:nth-child(2)").classList.toggle("show");
});

//shortener
const form = document.forms[0];
const input = form.querySelector("input");
const list = form.closest(".shorten");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !input.value.match(
      /\(https?:\/\/(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?:\/\/(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}/
    ) ||
    input.value == ""
  ) {
    input.classList.add("invalid");
    return false;
  } else {
    input.classList.remove("invalid");
    shorten(input.value);
    input.value = "";
  }
});

input.addEventListener("input", (e) => {
  if (
    input.value.match(
      /\(https?:\/\/(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?:\/\/(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}/
    )
  ) {
    input.classList.remove("invalid");
  }
});

function shorten(url) {
  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://api.shrtco.de/v2/shorten?url=${url}`
    )}`
  )
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then((datum) => {
      const data = JSON.parse(datum.contents);
      const link = document.createElement("div");
      link.className = "flex link";
      link.innerHTML = `<p class="long">${data["result"]["original_link"]}</p>
          <div class="flex">
            <p class="short">${data["result"]["full_short_link"]}</p>
            <button class="btn" onclick="copy(this)">Copy</button>
          </div>`;
      list.append(link);

      const details = {
        long: data["result"]["original_link"],
        short: data["result"]["full_short_link"],
      };
      let shortly;
      if (localStorage.getItem("shortly")) {
        shortly = JSON.parse(localStorage.getItem("shortly"));
      } else {
        shortly = [];
      }
      shortly.push(details);
      localStorage.setItem("shortly", JSON.stringify(shortly));
    })
    .catch(() => {
      swal({
        icon: "error",
        title: "Error",
        text: "Can't shorten for some reason🤷",
      });
    });

  swal("Processing ⏲", {
    icon: "info",
    buttons: false,
    timer: 3000,
  });
}

//show saved links on load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("shortly")) {
    const shortly = JSON.parse(localStorage.getItem("shortly"));
    for (const elem of shortly) {
      const link = document.createElement("div");
      link.className = "flex link";
      link.innerHTML = `<p class="long">${elem.long}</p>
          <div class="flex">
            <p class="short">${elem.short}</p>
            <button class="btn" onclick="copy(this)">Copy</button>
          </div>`;
      list.append(link);
    }
  }
});

//copy functionality
function copy(item) {
  const link = item.previousElementSibling.innerText;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link);
  }
  const btns = document.querySelectorAll(".shorten .flex:not(form) button");
  btns.forEach((btn) => {
    btn.classList.remove("btn-dark");
    btn.innerText = "Copy";
  });
  item.classList.add("btn-dark");
  item.innerText = "Copied!";
}
