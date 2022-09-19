//theme switcher
const theme = document.querySelector(".theme");
const hero = document.querySelector(".hero");
theme.addEventListener("click", () => {
  document.body.classList.toggle("theme-switch");
});

//for first time visitors
if (!localStorage.getItem("todo")) {
  const list = {
    all: [
      "Complete online JavaScript course",
      "Jog around the park 3x",
      "10 minutes meditation",
      "Read for 1 hour",
      "Pick up groceries",
      "Complete Todo App on Frontend Mentor",
    ],
    active: [
      "Jog around the park 3x",
      "10 minutes meditation",
      "Read for 1 hour",
      "Pick up groceries",
      "Complete Todo App on Frontend Mentor",
    ],
    completed: ["Complete online JavaScript course"],
  };
  localStorage.setItem("todo", JSON.stringify(list));
  displayTodoAll();
} else {
  displayTodoAll();
}

//creating todo
const creator = document.forms[0];
creator.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = creator.querySelector("input");
  const filter = document.querySelectorAll(".filter button");
  const list = JSON.parse(localStorage.getItem("todo"));
  if (text.value != "" && !/^\s+/.exec(text.value)) {
    list.all.push(text.value);
    list.active.push(text.value);
    localStorage.setItem("todo", JSON.stringify(list));

    if (filter[0].classList.contains("current")) {
      displayTodoAll();
    } else if (filter[1].classList.contains("current")) {
      displayTodoActive();
    } else {
      displayTodoCompleted();
    }
    text.value = "";
  } else {
    text.value = "";
  }
});

//filter functions
function displayTodoAll() {
  const todo = document.querySelector("[aria-label='Todo list']");
  const drag = document.querySelector(".drag");
  const list = JSON.parse(localStorage.getItem("todo"));

  if (list.all.length === 0) {
    todo.innerHTML = `<div class="flex | toolbar">
          <p>${list.active.length} items left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button class="current">All</button>
            <button onclick="displayTodoActive()">Active</button>
            <button onclick="displayTodoCompleted()">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    drag.style.display = "none";
  } else {
    todo.innerHTML = "";
    for (let i = 0; i < list.all.length; i++) {
      if (list.completed.indexOf(list.all[i]) !== -1) {
        todo.innerHTML += `<div class="item flex complete" draggable="true">
          <p>${list.all[i]}</p>

          <input type="checkbox" checked id="${i}">
          <label for="${i}" tabindex="0" role="checkbox" checked></label>

          <button class="delete" aria-label="delete todo" onclick="delAll(${i})">
            <img src="images/icon-cross.svg">
          </button>
        </div>`;
      } else {
        todo.innerHTML += `<div class="item flex" draggable="true">
          <p>${list.all[i]}</p>

          <input type="checkbox" id="${i}">
          <label for="${i}" tabindex="0" role="checkbox"></label>

          <button class="delete" aria-label="delete todo" onclick="delAll(${i})">
            <img src="images/icon-cross.svg">
          </button>
        </div>`;
      }
    }

    if (list.active.length !== 1) {
      todo.innerHTML += `<div class="flex | toolbar">
          <p>${list.active.length} items left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button class="current">All</button>
            <button onclick="displayTodoActive()">Active</button>
            <button onclick="displayTodoCompleted()">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    } else {
      todo.innerHTML += `<div class="flex | toolbar">
          <p>${list.active.length} item left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button class="current">All</button>
            <button onclick="displayTodoActive()">Active</button>
            <button onclick="displayTodoCompleted()">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    }
    drag.style.display = "block";
  }

  //checkbox for keyboard users
  const checkboxes = document.querySelectorAll("label");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("keydown", (e) => {
      if (e.key == "Enter") e.target.click();
    });
  });

  //todo functionality
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.classList.toggle("complete");

      const list = JSON.parse(localStorage.getItem("todo"));
      const text = parent.querySelector("p").innerText;
      const filter = document.querySelectorAll(".filter button");
      if (parent.classList.contains("complete")) {
        list.completed.push(text);

        const index = list.active.indexOf(text);
        list.active.splice(index, 1);

        localStorage.setItem("todo", JSON.stringify(list));
      } else {
        list.active.push(text);

        const index = list.completed.indexOf(text);
        list.completed.splice(index, 1);

        localStorage.setItem("todo", JSON.stringify(list));
      }

      if (filter[0].classList.contains("current")) {
        displayTodoAll();
      } else if (filter[1].classList.contains("current")) {
        displayTodoActive();
      } else {
        displayTodoCompleted();
      }
    });
  });
}

function delAll(index) {
  const list = JSON.parse(localStorage.getItem("todo"));

  const active = list.active.indexOf(list.all[index]);
  if (active !== -1) {
    list.active.splice(active, 1);
  }

  const completed = list.completed.indexOf(list.all[index]);
  if (completed !== -1) {
    list.completed.splice(completed, 1);
  }

  list.all.splice(index, 1);

  localStorage.setItem("todo", JSON.stringify(list));
  displayTodoAll();
}

function displayTodoActive() {
  const todo = document.querySelector("[aria-label='Todo list']");
  const drag = document.querySelector(".drag");
  const list = JSON.parse(localStorage.getItem("todo"));

  if (list.active.length === 0) {
    todo.innerHTML = `<div class="flex | toolbar">
          <p>${list.active.length} items left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button onclick="displayTodoAll()">All</button>
            <button class="current">Active</button>
            <button onclick="displayTodoCompleted()">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    drag.style.display = "none";
  } else {
    todo.innerHTML = "";
    for (let i = 0; i < list.active.length; i++) {
      todo.innerHTML += `<div class="item flex" draggable="true">
          <p>${list.active[i]}</p>

          <input type="checkbox" id="${i}">
          <label for="${i}" tabindex="0" role="checkbox"></label>

          <button class="delete" aria-label="delete todo" onclick="delActive(${i})">
            <img src="images/icon-cross.svg">
          </button>
        </div>`;
    }

    if (list.active.length !== 1) {
      todo.innerHTML += `<div class="flex | toolbar">
          <p>${list.active.length} items left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button onclick="displayTodoAll()">All</button>
            <button class="current">Active</button>
            <button onclick="displayTodoCompleted()">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    } else {
      todo.innerHTML += `<div class="flex | toolbar">
          <p>${list.active.length} item left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button onclick="displayTodoAll()">All</button>
            <button class="current">Active</button>
            <button onclick="displayTodoCompleted()">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    }
    drag.style.display = "block";
  }

  //checkbox for keyboard users
  const checkboxes = document.querySelectorAll("label");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("keydown", (e) => {
      if (e.key == "Enter") e.target.click();
    });
  });

  //todo functionality
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.classList.toggle("complete");

      const list = JSON.parse(localStorage.getItem("todo"));
      const text = parent.querySelector("p").innerText;
      const filter = document.querySelectorAll(".filter button");
      if (parent.classList.contains("complete")) {
        list.completed.push(text);

        const index = list.active.indexOf(text);
        list.active.splice(index, 1);

        localStorage.setItem("todo", JSON.stringify(list));
      } else {
        list.active.push(text);

        const index = list.completed.indexOf(text);
        list.completed.splice(index, 1);

        localStorage.setItem("todo", JSON.stringify(list));
      }

      if (filter[0].classList.contains("current")) {
        displayTodoAll();
      } else if (filter[1].classList.contains("current")) {
        displayTodoActive();
      } else {
        displayTodoCompleted();
      }
    });
  });
}

function delActive(index) {
  const list = JSON.parse(localStorage.getItem("todo"));

  const all = list.all.indexOf(list.active[index]);
  if (all !== -1) {
    list.all.splice(all, 1);
  }

  list.active.splice(index, 1);

  localStorage.setItem("todo", JSON.stringify(list));
  displayTodoActive();
}

function displayTodoCompleted() {
  const todo = document.querySelector("[aria-label='Todo list']");
  const drag = document.querySelector(".drag");
  const list = JSON.parse(localStorage.getItem("todo"));

  if (list.completed.length === 0) {
    if (list.active.length !== 1) {
      todo.innerHTML = `<div class="flex | toolbar">
          <p>${list.active.length} items left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button onclick="displayTodoAll()">All</button>
            <button onclick="displayTodoActive()">Active</button>
            <button class="current">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    } else {
      todo.innerHTML = `<div class="flex | toolbar">
          <p>${list.active.length} item left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button onclick="displayTodoAll()">All</button>
            <button onclick="displayTodoActive()">Active</button>
            <button class="current">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    }
    drag.style.display = "none";
  } else {
    todo.innerHTML = "";
    for (let i = 0; i < list.completed.length; i++) {
      todo.innerHTML += `<div class="item flex complete" draggable="true">
          <p>${list.completed[i]}</p>

          <input type="checkbox" checked id="${i}">
          <label for="${i}" tabindex="0" role="checkbox" checked></label>

          <button class="delete" aria-label="delete todo" onclick="delCompleted(${i})">
            <img src="images/icon-cross.svg">
          </button>
        </div>`;
    }

    if (list.active.length !== 1) {
      todo.innerHTML += `<div class="flex | toolbar">
          <p>${list.active.length} items left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button onclick="displayTodoAll()">All</button>
            <button onclick="displayTodoActive()">Active</button>
            <button class="current">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    } else {
      todo.innerHTML += `<div class="flex | toolbar">
          <p>${list.active.length} item left</p>

          <div class="flex | filter" aria-label="filter todo">
            <button onclick="displayTodoAll()">All</button>
            <button onclick="displayTodoActive()">Active</button>
            <button class="current">Completed</button>
          </div>

          <button onclick="clearCompleted()">Clear Completed</button>
        </div>`;
    }
    drag.style.display = "block";
  }

  //checkbox for keyboard users
  const checkboxes = document.querySelectorAll("label");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("keydown", (e) => {
      if (e.key == "Enter") e.target.click();
    });
  });

  //todo functionality
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.classList.toggle("complete");

      const list = JSON.parse(localStorage.getItem("todo"));
      const text = parent.querySelector("p").innerText;
      const filter = document.querySelectorAll(".filter button");
      if (parent.classList.contains("complete")) {
        list.completed.push(text);

        const index = list.active.indexOf(text);
        list.active.splice(index, 1);

        localStorage.setItem("todo", JSON.stringify(list));
      } else {
        list.active.push(text);

        const index = list.completed.indexOf(text);
        list.completed.splice(index, 1);

        localStorage.setItem("todo", JSON.stringify(list));
      }

      if (filter[0].classList.contains("current")) {
        displayTodoAll();
      } else if (filter[1].classList.contains("current")) {
        displayTodoActive();
      } else {
        displayTodoCompleted();
      }
    });
  });
}

function delCompleted(index) {
  const list = JSON.parse(localStorage.getItem("todo"));

  const all = list.all.indexOf(list.completed[index]);
  if (all !== -1) {
    list.all.splice(all, 1);
  }

  list.completed.splice(index, 1);

  localStorage.setItem("todo", JSON.stringify(list));
  displayTodoCompleted();
}

//clear completed
function clearCompleted() {
  const list = JSON.parse(localStorage.getItem("todo"));
  list.all = list.all.filter((item) => {
    return list.completed.indexOf(item) !== -1 ? false : true;
  });
  list.completed.length = 0;
  localStorage.setItem("todo", JSON.stringify(list));

  const filter = document.querySelectorAll(".filter button");
  if (filter[0].classList.contains("current")) {
    displayTodoAll();
  } else if (filter[1].classList.contains("current")) {
    displayTodoActive();
  } else {
    displayTodoCompleted();
  }
}

//drag n' drop
const todo = document.querySelector("[aria-label='Todo list']");
new Sortable(todo, {
  handle: ".item p",
  animation: 200,
  onEnd: reorder,
});

//ensure that the new order is saved
function reorder() {
  const list = JSON.parse(localStorage.getItem("todo"));
  const items = document.querySelectorAll(".item p");
  const filter = document.querySelectorAll(".filter button");
  if (filter[0].classList.contains("current")) {
    list.all.length = 0;
    for (let i = 0; i < items.length; i++) {
      list.all.push(items[i].innerText);
    }
  } else if (filter[1].classList.contains("current")) {
    list.active.length = 0;
    for (let i = 0; i < items.length; i++) {
      list.active.push(items[i].innerText);
    }
  } else {
    list.completed.length = 0;
    for (let i = 0; i < items.length; i++) {
      list.completed.push(items[i].innerText);
    }
  }
  localStorage.setItem("todo", JSON.stringify(list));
}
