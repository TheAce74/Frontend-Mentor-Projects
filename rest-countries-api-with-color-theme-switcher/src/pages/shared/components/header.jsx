import { useState } from "react";

function Header() {
  return (
    <header className="header">
      <h1 className="header__heading">Where in the world?</h1>
      <Button />
    </header>
  );
}

function Button() {
  const [theme, setTheme] = useState("dark");

  const handleClick = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <button
      className="header__theme-switcher"
      data-type={theme}
      onClick={handleClick}
    >
      {theme === "dark" ? (
        <>
          <i className="fa-solid fa-moon"></i>
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <i className="fa-solid fa-sun"></i>
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
}

export default Header;
