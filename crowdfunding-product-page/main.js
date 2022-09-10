//navigation
const menu = document.querySelector('button[aria-label="menu"]');
const open = document.querySelector(".open");
const close = document.querySelector(".close");

menu.addEventListener("click", () => {
  menu.classList.toggle("active");

  menu.classList.contains("active")
    ? menu.setAttribute("aria-expanded", true)
    : menu.setAttribute("aria-expanded", false);
});

//the observer
const header = document.querySelector("header");
const hero = document.querySelector(".hero");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        header.classList.add("background");
      } else {
        header.classList.remove("background");
      }
    });
  },
  {
    rootMargin: "-90px 0px 0px 0px",
  }
);
observer.observe(hero);

//bookmarking
const bookmark = document.getElementById("bookmark");

let data = 0;
bookmark.addEventListener("click", (e) => {
  const text = bookmark.getElementsByTagName("p")[0];
  const image = bookmark.getElementsByTagName("img")[0];
  if (!data) {
    text.innerText = "Bookmarked";
    e.target.classList.add("reversed");
    const src = image.src.slice(0, image.src.lastIndexOf(".")) + "-marked.svg";
    image.src = src;
    data++;
  } else {
    text.innerText = "Bookmark";
    e.target.classList.remove("reversed");
    const src = image.src.slice(0, image.src.lastIndexOf("-")) + ".svg";
    image.src = src;
    data--;
  }
});

//popup functionality
const pop = document.querySelector(".card:first-child button");
const modal = document.querySelector("dialog");
const remainder = document.querySelectorAll(".amount h4");
const remainderTwo = document.querySelectorAll(".amount p:last-of-type");
const chalaChala = document.querySelector("#money");
const chalaChalaTwo = document.querySelector("#sr-m");
const backers = document.querySelector("#backers");
const backersTwo = document.querySelector("#sr-b");
const progress = document.querySelector("progress");

pop.addEventListener("click", () => {
  modal.classList.remove("done");
  modal.innerHTML = `<img src="images/icon-close-modal.svg" alt="close" onclick="closeModal()" tabindex="0">

    <h2>Back this project</h2>

    <p>Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>

    <div class="card flex" tabindex="0">
      <input type="radio" name="item">

      <div>
        <h3>Pledge with no reward</h3>

        <p>
          Choose to support us without a reward if you simply believe in our project. As a backer,
          you will be signed up to receive product updates via email.
        </p>

        <div class="flex pledge">
          <textarea placeholder="Enter your pledge"></textarea>

          <button class="continue">Continue</button>
        </div>
      </div>
    </div>

    <div class="card flex" tabindex="0">
      <input type="radio" name="item">

      <div>
        <div class="flex">
          <div class="flex">
            <h3>Bamboo Stand</h3>
            <h3>Pledge $25 or more</h3>
          </div>

          <div class="flex amount">
            <h4 aria-hidden="true" data-index="0">${remainder[0].innerText}</h4>
            <p aria-hidden="true">left</p>
            <p style="display: none;" aria-hidden="false">${remainder[0].innerText} left</p>
          </div>
        </div>

        <p>
          You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and
          you&apos;ll be added to a special Backer member list.
        </p>

        <div class="flex pledge">
          <textarea placeholder="Enter your pledge"></textarea>

          <div class="flex">
            <button class="choose">$ 25</button>
            <button class="continue">Continue</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card flex" tabindex="0">
      <input type="radio" name="item">

      <div>
        <div class="flex">
          <div class="flex">
            <h3>Black Edition Stand</h3>
            <h3>Pledge $75 or more</h3>
          </div>

          <div class="flex amount">
            <h4 aria-hidden="true" data-index="1">${remainder[1].innerText}</h4>
            <p aria-hidden="true">left</p>
            <p style="display: none;" aria-hidden="false">${remainder[1].innerText} left</p>
          </div>
        </div>

        <p>
          You get a Black Special Edition computer stand and a personal thank you. You&apos;ll be added to our Backer
          member list. Shipping is included.
        </p>

        <div class="flex pledge">
          <textarea placeholder="Enter your pledge"></textarea>
        
          <div class="flex">
            <button class="choose">$ 75</button>
            <button class="continue">Continue</button>
          </div>
        </div>
      </div>
    </div>

    <div class="card flex disabled">
      <input type="radio" name="item">

      <div>
        <div class="flex">
          <div class="flex">
            <h3>Mahogany Special Edition</h3>
            <h3>Pledge $200 or more</h3>
          </div>

          <div class="flex amount">
            <h4 aria-hidden="true">0</h4>
            <p aria-hidden="true">left</p>
            <p style="display: none;" aria-hidden="false">0 left</p>
          </div>
        </div>

        <p>
          You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You&apos;ll be added
          to our Backer member list. Shipping is included.
        </p>
      </div>
    </div>`;

  const shut = modal.querySelector("img");
  shut.addEventListener("keypress", (e) => {
    if (e.key === "Enter") e.target.click();
  });

  const cards = modal.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") e.target.click();
    });

    card.addEventListener("click", () => {
      cards.forEach((card) => {
        card.style.border = "";
        if (card.querySelector(".pledge"))
          card.querySelector(".pledge").style.display = "none";
      });

      card.querySelector("input").checked = true;
      card.querySelector(".pledge").style.display = "flex";
      card.style.border = "1px solid var(--clr-primary-400)";
    });
  });

  const continued = modal.querySelectorAll(".continue");
  const choose = modal.querySelectorAll(".choose");

  continued.forEach((item) => {
    item.addEventListener("click", nextPhase);
  });

  choose.forEach((item) => {
    const card = item.closest(".card");
    const textarea = card.querySelector("textarea");
    item.addEventListener("click", () => {
      textarea.value = item.innerText.slice(2);
    });
    item.addEventListener("click", nextPhase);
  });

  function nextPhase(e) {
    const card = e.target.closest(".card");
    const textarea = card.querySelector("textarea");
    const choose = card.querySelector(".choose");
    const amount = card.querySelector(".amount h4");
    const amountTwo = card.querySelector(".amount p:last-of-type");
    if (
      textarea.value != "" &&
      !/\s+/.test(textarea.value) &&
      !/\D+/.test(textarea.value)
    ) {
      backers.innerText = "5008";
      backersTwo.innerText = "5008 total backers";

      const money = Number(chalaChala.innerText.slice(1).split(",").join(""));
      const made = money + parseInt(textarea.value);
      const full = made.toString().split("");
      const last = full.splice(-3).join("");
      const first = full.join("");
      chalaChala.innerText = made > 100000 ? `$100,000` : `$${first},${last}`;
      chalaChalaTwo.innerText =
        made > 100000
          ? `$100,000 of $100,000 backed`
          : `$${first},${last} of $100,000 backed`;

      const percentage = Math.floor(made / 1000);
      progress.value = percentage <= 100 ? percentage : 100;
      progress.innerText = percentage <= 100 ? `${percentage}%` : "100%";

      if (choose) {
        const settled = Math.floor(
          +textarea.value / Number(choose.innerText.slice(2))
        );
        const leftover = +amount.innerText - settled;
        const index = +amount.dataset.index;
        remainder[index].innerText = leftover >= 0 ? leftover : 0;
        remainderTwo[index].innerText =
          leftover >= 0 ? leftover + " left" : 0 + " left";
      }

      modal.classList.add("done");
      modal.innerHTML = `<img src="images/icon-check.svg" alt="" class="check">

    <h2>Thanks for your support!</h2>

    <p>
      Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get
      an email once our campaign is completed.
    </p>

    <button onclick="closeModal()">Got it!</button>`;
    }
  }

  modal.show();
});

function closeModal() {
  modal.close();
}
