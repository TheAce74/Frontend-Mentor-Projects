const controls = document.querySelectorAll("button");
const current = document.getElementsByClassName("current");
const previous = document.getElementsByClassName("previous");
const period = document.getElementsByClassName("period");

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    const text = e.target.innerText.toLowerCase();

    fetch("./data.json")
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        for (let i = 0; i < current.length; i++) {
          current[i].innerText = data[i]["timeframes"][text]["current"];
          previous[i].innerText = data[i]["timeframes"][text]["previous"];
          period[i].innerText = data[i]["timeframes"][text]["period"];
        }
      })
      .catch(() => {
        alert("Something went wrong, try reloading the page");
      });

    controls.forEach((control) => {
      control.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});
