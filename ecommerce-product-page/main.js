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

//hover functionality
const icons = document.querySelectorAll("[data-icon]");

const hover = (icons) => {
  const original = icons.src;
  const index = original.lastIndexOf(".");
  const replacement = original.slice(0, index) + "-hover.svg";
  icons.src = replacement;
};

const out = (icons) => {
  const original = icons.src;
  const index = original.lastIndexOf("-");
  const replacement = original.slice(0, index) + ".svg";
  icons.src = replacement;
};

icons.forEach((icon) => {
  icon.addEventListener("mouseover", (e) => {
    e.target.classList.add("hovered");
    hover(icon);
  });

  icon.addEventListener("focus", (e) => {
    if (!e.target.classList.contains("hovered")) {
      hover(icon);
      e.target.classList.add("focused");
    }
  });

  icon.addEventListener("mouseout", (e) => {
    e.target.classList.remove("hovered");
    out(icon);
  });

  icon.addEventListener("blur", (e) => {
    if (e.target.classList.contains("focused")) {
      out(icon);
      e.target.classList.remove("focused");
    }
  });
});

// ensuring that click events are accounted for on keydown (enter key)
const clickables = document.querySelectorAll("[tabindex='0']");
clickables.forEach((clickable) => {
  clickable.addEventListener("keydown", (e) => {
    e.key === "Enter" ? e.target.click() : console.error("impossible");
  });
});

//gallery
const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];
const thumbnails = document.querySelectorAll(
  ".desktop > img:not(.close-popup)"
);
const splash = document.querySelectorAll(".gallery > img");
const next = document.querySelectorAll(".next");
const prev = document.querySelectorAll(".prev");
const dialog = document.querySelector(".dialog");
const closeModal = document.querySelector(".close-popup");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const index = parseInt(thumbnail.dataset.index);
    changeImage(index);
  });
});

next.forEach((button) => {
  button.addEventListener("click", nextImage);
});

prev.forEach((button) => {
  button.addEventListener("click", prevImage);
});

function changeImage(index) {
  splash.forEach((image) => {
    image.src = images[index];
  });

  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("current");
  });

  thumbnails[index].classList.add("current");
  thumbnails[index + 4].classList.add("current");
}

function nextImage() {
  const path = splash[0].src.slice(splash[0].src.indexOf("images"));
  const current = images.indexOf(path);
  const index = current === 3 ? 0 : current + 1;
  changeImage(index);
}

function prevImage() {
  const path = splash[0].src.slice(splash[0].src.indexOf("images"));
  const current = images.indexOf(path);
  const index = current === 0 ? 3 : current - 1;
  changeImage(index);
}

splash[0].addEventListener("click", () => {
  dialog.style.display = "flex";
  document.body.style.overflow = "hidden";
});

closeModal.addEventListener("click", () => {
  dialog.style.display = "none";
  document.body.style.overflow = "auto";
});

//placing orders
const orderControls = document.querySelectorAll(".order img");
const orderAmount = document.querySelector("#order-amount");
const order = document.querySelector(".add");
const cart = document.querySelector(".cart-icon");
const cartInfo = document.querySelector(".cart");

orderControls[0].addEventListener("click", () => {
  const number = +orderAmount.innerText;
  orderAmount.innerText = number > 0 ? number - 1 : 0;
});

orderControls[1].addEventListener("click", () => {
  const number = +orderAmount.innerText;
  orderAmount.innerText = number + 1;
});

order.addEventListener("click", () => {
  const number = +orderAmount.innerText;
  if (!localStorage.getItem("order") && number > 0) {
    const order = [number];
    localStorage.setItem("order", JSON.stringify(order));
    cartNumber();
  } else if (localStorage.getItem("order") && number > 0) {
    const order = JSON.parse(localStorage.getItem("order"));
    order.push(number);
    localStorage.setItem("order", JSON.stringify(order));
    cartNumber();
  }
});

cart.addEventListener("click", updateCart);

function updateCart() {
  if (
    !localStorage.getItem("order") ||
    JSON.parse(localStorage.getItem("order")).length == 0
  ) {
    cartInfo.innerHTML = `
                          <h3>Cart</h3>
                          <p class="empty">Your cart is empty.</p>
        `;
    cartInfo.style.minHeight = "";
  } else {
    const order = JSON.parse(localStorage.getItem("order"));
    cartInfo.innerHTML = "<h3>Cart</h3>";
    for (let i = 0; i < order.length; i++) {
      cartInfo.innerHTML += `
                  <div style="display: flex; justify-content: space-between; align-items: center; gap: 2em;" data-target="${i}">
                    <img src="images/image-product-1.jpg" alt="">
                    <div>
                      <h4>Fall Limited Edition Sneakers</h4>
                      <p>
                        $125.00 x <span class="amount">${order[i]}</span>
                        = <span class="cost">$${order[i] * 125}.00</span>
                      </p>
                    </div>
                    <img src="images/icon-delete.svg" alt="" tabindex="0" data-icon onclick="removeItem(this)">
                  </div>
                          `;
    }
    cartInfo.innerHTML += "<button>Checkout</button>";
    cartInfo.style.minHeight = "fit-content";

    //hover functionality
    const icons = cartInfo.querySelectorAll("[data-icon]");

    const hover = (icons) => {
      const original = icons.src;
      const index = original.lastIndexOf(".");
      const replacement = original.slice(0, index) + "-hover.svg";
      icons.src = replacement;
    };

    const out = (icons) => {
      const original = icons.src;
      const index = original.lastIndexOf("-");
      const replacement = original.slice(0, index) + ".svg";
      icons.src = replacement;
    };

    icons.forEach((icon) => {
      icon.addEventListener("mouseover", (e) => {
        e.target.classList.add("hovered");
        hover(icon);
      });

      icon.addEventListener("focus", (e) => {
        if (!e.target.classList.contains("hovered")) {
          hover(icon);
          e.target.classList.add("focused");
        }
      });

      icon.addEventListener("mouseout", (e) => {
        e.target.classList.remove("hovered");
        out(icon);
      });

      icon.addEventListener("blur", (e) => {
        if (e.target.classList.contains("focused")) {
          out(icon);
          e.target.classList.remove("focused");
        }
      });
    });

    // ensuring that click events are accounted for on keydown (enter key)
    const clickables = cartInfo.querySelectorAll("[tabindex='0']");
    clickables.forEach((clickable) => {
      clickable.addEventListener("keydown", (e) => {
        e.key === "Enter" ? e.target.click() : console.error("impossible");
      });
    });
  }
}

cart.addEventListener("click", () => {
  cartInfo.classList.toggle("hidden");
});

function cartNumber() {
  const order = JSON.parse(localStorage.getItem("order"));
  const items = order.length;
  items >= 1
    ? cart.setAttribute("data-items", items)
    : cart.setAttribute("data-items", "");
  updateCart();
}

document.addEventListener("DOMContentLoaded", cartNumber);

function removeItem(item) {
  const product = item.closest("div");
  const index = +product.dataset.target;

  const order = JSON.parse(localStorage.getItem("order"));
  order.splice(index, 1);
  localStorage.setItem("order", JSON.stringify(order));

  product.remove();
  cartNumber();
}
