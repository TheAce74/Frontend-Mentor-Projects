const link = document.querySelector("a");
const select = document.querySelector("select");

select.addEventListener("change", () => {
  const value = select.value.toLowerCase().split(" ").join("-");
  link.href = `${value}/index.html`;
});
