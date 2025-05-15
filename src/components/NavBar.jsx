import { Outlet, Link } from "react-router-dom";
import { faMoon as solidMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as regularMoon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function NavBar({toggleTheme, theme}) {
  return (
    <>
      <nav>
        <Link to="/">Where in the world?</Link>
        <button onClick={toggleTheme} className="dark-mode-button">
          <FontAwesomeIcon icon={theme === 'dark' ? solidMoon : regularMoon} />
          <span>Dark mode</span>
        </button>
      </nav>
      <main>
        <Outlet /> {/* Aquí se renderizan las páginas hijas */}
      </main>
    </>
  );
}
