import { useState } from "react";

function Navbar({
  fontOptions,
  currentFont,
  onFontChange,
  darkMode,
  setDarkMode
}) {
  // Navbar toggle logic
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  const handleSelectChange = (event) => {
    const selectedFont = event.target.value;
    onFontChange(selectedFont);
  };

  // Dark Mode toggle logic
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    const body = document.querySelector("body");
    body.setAttribute("data-theme", darkMode ? "light" : "dark");
  };

  let DarkModeButton;

  if (!darkMode) {
    DarkModeButton = (
      <button className="fcc" onClick={toggleDarkMode}>
        <p>Light Mode</p>
        <i className="fa-solid fa-sun"></i>
      </button>
    );
  } else {
    DarkModeButton = (
      <button className="fcc" onClick={toggleDarkMode}>
        <p>Dark Mode</p>
        <i className="fa-solid fa-moon"></i>
      </button>
    );
  }

  return (
    <>
      <div className="nav-container">
        <div className="nav-btn-container" onClick={toggleNav}>
          <i className="fa-solid fa-bars"></i>
        </div>
        {navVisible && (
          <nav>
            <div className="navdropdown-container fcc">
              <ul>
                <li>{DarkModeButton}</li>
                <li>
                  <select value={currentFont} onChange={handleSelectChange}>
                    {fontOptions.map((font, index) => (
                      <option
                        key={index}
                        value={font.value}
                        style={{ fontFamily: font.value }}
                      >
                        {font.name}
                      </option>
                    ))}
                  </select>
                  <span className="fontstyle-icon">F</span>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}

export default Navbar;
