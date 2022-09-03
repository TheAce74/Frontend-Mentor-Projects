const position = document.getElementsByTagName("span");
const text = document.getElementsByTagName("p");
const generate = document.getElementsByTagName("button");

const advise = () => {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then((data) => {
      const target = data.slip;
      position[0].textContent = target.id;
      text[0].textContent = target.advice;
    })
    .catch(() => {
      alert("No advice for the wicked 😈");
    });
};

document.addEventListener("DOMContentLoaded", advise);
generate[0].addEventListener("click", advise);
