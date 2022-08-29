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

//destination page
const destination = document.querySelectorAll(".main--destination__nav ul li");
const destinationImage = document.querySelector(
  ".main--destination section picture"
);
const destinationTitle = document.querySelector(".article--main-content h2");
const destinationText = document.querySelector(".article--main-content p");
const destinationDistance = document.querySelector("#first");
const destinationTime = document.querySelector("#second");

const travel = (index) => {
  fetch("./data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Can't fetch planetary data 😢");
      return response.json();
    })
    .then((data) => {
      const target = data.destinations.at(index);
      destinationTitle.textContent = target.name;
      destinationText.textContent = target.description;
      destinationDistance.textContent = target.distance;
      destinationTime.textContent = target.travel;
      let next;
      if (target.name !== "Moon") {
        next = `
          <source srcset="${target.images.webp}">
          <img src="${target.images.png}" alt="${target.name}">
        `;
      } else {
        next = `
          <source srcset="${target.images.webp}">
          <img src="${target.images.png}" alt="the ${target.name}">
        `;
      }
      destinationImage.innerHTML = next;
    })
    .catch((error) => {
      console.error(error);
    });

  destination.forEach((item) => {
    item.classList.remove("current");
  });
  destination[index].classList.add("current");
};

destination.forEach((item) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter") e.target.click();
  });

  item.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    travel(index);
  });
});

//crew page
const crew = document.querySelectorAll(".main--crew__nav button");
const crewImage = document.querySelector(".main--crew picture");
const crewTitle = document.querySelector(".article__content h2");
const crewName = document.querySelector(".article__content h2:nth-of-type(2)");
const crewText = document.querySelector(".article__content p");

const role = (index) => {
  fetch("./data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Can't fetch crew data 😢");
      return response.json();
    })
    .then((data) => {
      const target = data.crew.at(index);
      crewTitle.textContent = target.role;
      crewText.textContent = target.bio;
      crewName.textContent = target.name;
      const next = `
          <source srcset="${target.images.webp}">
          <img src="${target.images.png}" alt="${target.name}">
        `;
      crewImage.innerHTML = next;
    })
    .catch((error) => {
      console.error(error);
    });

  crew.forEach((item) => {
    item.classList.remove("current");
  });
  crew[index].classList.add("current");
};

crew.forEach((item) => {
  item.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    role(index);
  });
});

//technology page
const technology = document.querySelectorAll(".main--technology__nav button");
const parent = document.querySelector(".main--technology section");
const technologyImage = document.querySelector(".main--technology img");
const technologyTitle = document.querySelector(
  ".article__content h2:nth-child(2)"
);
const technologyText = document.querySelector(".article__content p");

const launch = (index) => {
  fetch("./data.json")
    .then((response) => {
      if (!response.ok) throw new Error("Can't fetch launch info 😢");
      return response.json();
    })
    .then((data) => {
      const target = data.technology.at(index);
      technologyTitle.textContent = target.name;
      technologyText.textContent = target.description;
      technologyImage.srcset = `
                    ${target.images.landscape} 768w,
                    ${target.images.portrait} 515w
                    `;
      technologyImage.sizes = "(max-width: 50rem) 768px, 515px";
      technologyImage.src = `${target.images.portrait}`;
    })
    .catch((error) => {
      console.error(error);
    });

  technology.forEach((item) => {
    item.classList.remove("current");
  });
  technology[index].classList.add("current");
};

technology.forEach((item) => {
  item.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    launch(index);
  });
});
