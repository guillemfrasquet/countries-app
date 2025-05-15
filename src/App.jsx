import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });

  function toggleTheme() {
    if(theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }

  }

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/countries-app/" element={<NavBar toggleTheme={toggleTheme} theme={theme} />}>
        <Route index element={<CountriesList />} />
        <Route path="/countries-app/country/:id" element={<CountryDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
