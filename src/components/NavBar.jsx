import { Outlet } from "react-router-dom";

export default function NavBar({toggleTheme}) {
  return (
    <>
      <nav>
        {/* Aquí va tu barra de navegación */}
        <a href="/">Where in the world?</a>
      </nav>
      <main>
        <Outlet /> {/* Aquí se renderizan las páginas hijas */}
      </main>
    </>
  );
}
