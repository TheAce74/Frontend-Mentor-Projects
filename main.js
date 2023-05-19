window.addEventListener("load", () => {
  document.querySelector(".wrapper").classList.add("fade");
});

const link = document.querySelector("a");
const select = document.querySelector("select");

select.addEventListener("change", () => {
  const value = select.value.toLowerCase().split(" ").join("-");
  const option = Array.from(select.options).filter(option => {
    return option.value === select.value;
  });
  link.href = option[0].getAttribute("data-new")
    ? Number(option[0].getAttribute("data-new")) === 1
      ? `${value}/public/index.html`
      : `${value}/dist/index.html`
    : `${value}/index.html`;
});
